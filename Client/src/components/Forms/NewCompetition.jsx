import { TEInput, TERipple, TESelect, TETextarea } from "tw-elements-react";
import { nations, sex } from "../../validations/export";
import { useContext, useState } from "react";
import formValidation from "../../validations/formValidation";
import { alertInfo } from "../../alerts/alerts";
import { Context } from "../../context/Context";
import { useEffect } from "react";

export default function NewCompetition({setModal}) {
  const { peticionAddCompetition, categories } = useContext(Context);

  const [values, setValues] = useState({
    name: "",
    categorie: "",
    type: "",
    discipline: "",
    dateStart: "",
    dateEnd: "",
    location: "",
    description: "",
    participants: "",
    status: "Sin empezar"
  });
  const [catOpt, setCatOpt] = useState([])

  useEffect(() => {
    const load = (e) => {
      let newCats = []
      categories.forEach(cat => {
        newCats.push({
          text: cat.name_categorie,
          value: cat.name_categorie
        })
      });
      setCatOpt(newCats)
    };
    
    load()
  }, [categories])

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

    const response = peticionAddCompetition(values)
    if (response) {
        setValues({
          name: "",
          categorie: "",
          type: "",
          discipline: "",
          dateStart: "",
          dateEnd: "",
          location: "",
          description: "",
          participants: "",
          status: "Sin empezar"
        });
        return
    }
    
    return;
  };

  const types = [
    { text: "Competición", value: "Competición" },
    { text: "Torneo", value: "Torneo" },
  ];

  const disciplines = [
    { text: "Atletismo", value: "Atletismo" },
    { text: "Natación", value: "Natación" },
    { text: "Acuatlón", value: "Acuatlón" },
    { text: "Triatlón", value: "Triatlón" },
    { text: "Aguas Abiertas", value: "Aguas Abiertas" },
  ];

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
          <TESelect
            data={types}
            name="type"
            clearBtn
            preventFirstSelection
            onValueChange={(e) => {
              setValues({
                ...values,
                ["type"]: e.value,
              });
            }}
            label="Tipo"
          />
        </div>
        <div>
          <TESelect
            data={catOpt}
            name="categories"
            clearBtn
            preventFirstSelection
            onValueChange={(e) => {
              setValues({
                ...values,
                ["categorie"]: e.value,
              });
            }}
            label="Categorías"
          />
        </div>
        <div>
          <TESelect
            data={disciplines}
            name="discipline"
            clearBtn
            preventFirstSelection
            onValueChange={(e) => {
              setValues({
                ...values,
                ["discipline"]: e.value,
              });
            }}
            label="Disciplina"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <TEInput
              type="datetime-local"
              name="dateStart"
              value={values.dateStart}
              onChange={handleInputChange}
            ></TEInput>
            <span className="text-[9px] w-full text-start text-neutral-400">
              * Fecha de Inicio de la competencia
            </span>
          </div>
          <div>
            <TEInput
              type="datetime-local"
              name="dateEnd"
              value={values.dateEnd}
              onChange={handleInputChange}
            ></TEInput>
            <span className="text-[9px] w-full text-start text-neutral-400">
              * Fecha de Fin de la competencia
            </span>
          </div>
        </div>
        <div>
          <TETextarea
            name="description"
            value={values.description}
            onChange={handleInputChange}
            label="Descripción"
            rows={4}
          ></TETextarea>
        </div>
        <div>
          <TEInput
            min={0}
            type="number"
            name="participants"
            value={values.participants}
            onChange={handleInputChange}
            label="Participantes"
          ></TEInput>
        </div>
        <div>
          <TEInput
            type="text"
            name="location"
            value={values.location}
            onChange={handleInputChange}
            label="Ubicación"
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
