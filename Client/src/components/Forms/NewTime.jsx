import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import formValidation from "../../validations/formValidation";
import { alertInfo } from "../../alerts/alerts";
import { TEInput, TERipple, TESelect } from "tw-elements-react";
import { addAthletesInCompetitions, addTimeAthlete } from "../../js/fecths";

export default function NewTime({setData, result, data}) {

    const { token } = useContext(Context);
  
    const [values, setValues] = useState({
      time_h: "",
      time_m: "",
      time_s: "",
      id_competition: "",
      id_athlete: ""
    });

    useEffect(() => {
      const load = (e) => {
        setValues({
          ...values,
          ["id_competition"]: result.id_competition,
          ["id_athlete"]: result.id_athlete,
        });
      };

      load();
    }, [result]);

    const validation = () => {
      for (let key in values) {
        let error = formValidation.validateText(values[key].toString());
        if (!error) return "Completa todos los datos";
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const validate = validation();
      if (validate) return alertInfo(validate);

      let time =
        (Number(values.time_h) < 10 ? "0" + values.time_h : values.time_h) +
        ":" +
        (Number(values.time_m) < 10 ? "0" + values.time_m : values.time_m) +
        ":" +
        (Number(values.time_s) < 10 ? "0" + values.time_s : values.time_s);

      const response = addTimeAthlete(
        values.id_competition,
        values.id_athlete,
        {
            time_result: time
        },
        token,
        setData,
        data
      );
      return;
    };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-1 text-sm">
          <TEInput
            type="number"
            name="time_h"
            min={0}
            max={59}
            value={values.time_h}
            onChange={(e) =>
              setValues({
                ...values,
                ["time_h"]: e.target.value ,
              })
            }
            label="Horas"
          ></TEInput>
          <TEInput
            type="number"
            name="time_m"
            min={0}
            max={59}
            value={values.time_m}
            onChange={(e) =>
              setValues({
                ...values,
                ["time_m"]: e.target.value,
              })
            }
            label="Minutos"
          ></TEInput>
          <TEInput
            type="number"
            name="time_s"
            min={0}
            max={59}
            value={values.time_s}
            onChange={(e) =>
              setValues({
                ...values,
                ["time_s"]: e.target.value,
              })
            }
            label="Segundos"
          ></TEInput>
        </div>

        <div className="flex w-full justify-start">
          <TERipple rippleColor="white">
            <button
              type="submit"
              className="inline-block mb-4 rounded bg-naranja-brillante px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              Registar Tiempo
            </button>
          </TERipple>
        </div>
      </form>
    </>
  );
}
