import { TEInput, TERipple, TESelect } from "tw-elements-react";
import { nations, sex } from "../../validations/export";
import { useContext, useState } from "react";
import formValidation from "../../validations/formValidation";
import { alertInfo } from "../../alerts/alerts";
import { Context } from "../../context/Context";

export default function NewAthlete({setModal}) {
  const { peticionAddAthlete } = useContext(Context);

  const [values, setValues] = useState({
    name: "",
    lastname: "",
    age: "",
    weight: "",
    phone: "",
    sex: "",
    email: "",
    nation: "",
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

    const response = peticionAddAthlete(values)
    if (response) {
        setValues({
          name: "",
          lastname: "",
          age: "",
          weight: "",
          phone: "",
          sex: "",
          email: "",
          nation: "",
        });
        return
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
            label="Nombres"
          ></TEInput>
        </div>
        <div>
          <TEInput
            type="text"
            name="lastname"
            value={values.lastname}
            onChange={handleInputChange}
            label="Apellidos"
          ></TEInput>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <TEInput
              min={1}
              max={99}
              type="number"
              name="age"
              value={values.age}
              onChange={handleInputChange}
              label="Edad"
            ></TEInput>
          </div>
          <div>
            <TEInput
              min={1}
              type="number"
              name="weight"
              value={values.weight}
              onChange={handleInputChange}
              label="Peso"
            ></TEInput>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <TEInput
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleInputChange}
              label="Teléfono"
            ></TEInput>
          </div>
          <div>
            <TESelect
              data={sex}
              name="sex"
              preventFirstSelection
              label="Sexo"
              onValueChange={(e) => {
                setValues({
                  ...values,
                  ["sex"]: e.value,
                });
              }}
            />
          </div>
        </div>
        <div>
          <TEInput
            type="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            label="Correo Electrónico"
          ></TEInput>
        </div>
        <div>
          <TESelect
            data={nations}
            name="nation"
            search
            preventFirstSelection
            label="Nacionalidad"
            onValueChange={(e) => {
              setValues({
                ...values,
                ["nation"]: e.value,
              });
            }}
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
