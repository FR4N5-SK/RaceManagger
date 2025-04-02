import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import formValidation from "../../validations/formValidation";
import { alertInfo } from "../../alerts/alerts";
import { TEInput, TERipple } from "tw-elements-react";

export default function NewCategorie({setModal}) {
  const { peticionAddAthlete, peticionAddCategorie } = useContext(Context);

  const [values, setValues] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

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

    const response = peticionAddCategorie(values);
    if (response) {
      setValues({
        name: ""
      });
      return;
    }

    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <TEInput
            type="text"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            label="Nombre"
          ></TEInput>
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
