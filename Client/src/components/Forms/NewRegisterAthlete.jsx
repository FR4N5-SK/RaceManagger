import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import formValidation from "../../validations/formValidation";
import { alertInfo } from "../../alerts/alerts";
import { TEInput, TERipple, TESelect } from "tw-elements-react";
import { addAthletesInCompetitions } from "../../js/fecths";

export default function NewRegisterAthlete({setData, id, data}) {
  const { athletes, token, setCompetitions, competitions } = useContext(Context);

  const [values, setValues] = useState({
    id_athlete: "",
    id_competition: "",
  });
  const [optAth, setOptAth] = useState([])
  const [dataFilter, setDataFilter] = useState([])

  useEffect(() => {
    const load = (e) => {
      setValues({
        ...values,
        ["id_competition"]: id,
      })
    };

    load();
  }, [id]);

  useEffect(() => {
    const load = (e) => {
        console.log(data)
        console.log(athletes)
      let newAth = [];
      for (let i = 0; i < athletes.length; i++) {
        let change = true
        for (let e = 0; e < data.length; e++) {
            if (athletes[i].id_athlete === data[e].id_athlete) {
                change = false 
            }
        }
        if (change) {
            newAth.push({
              text:
                athletes[i].name_athlete + " " + athletes[i].lastname_athlete,
              value: athletes[i].id_athlete,
            }); 
        }
      }
      setOptAth(newAth);
    };

    load();
  }, [data]);

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

    const response = addAthletesInCompetitions(values.id_competition, values.id_athlete, values, token, setData, setCompetitions, competitions);
    if (response) {
      setValues({
        ...values,
        ["id_athlete"]: "",
      });
      return;
    }

    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <TESelect
            data={optAth}
            name="Atletas"
            search
            preventFirstSelection
            onValueChange={(e) => {
              setValues({
                ...values,
                ["id_athlete"]: e.value,
              });
            }}
            label="Atletas Disponibles"
          />
        </div>

        <TERipple rippleColor="white">
          <button
            type="submit"
            className="inline-block mb-4 rounded bg-naranja-brillante px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          >
            Agregar
          </button>
        </TERipple>
      </form>
    </>
  );
}
