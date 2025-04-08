import { useState } from "react";
import { TEInput, TERipple, TESelect } from "tw-elements-react";
import formValidation from "../../validations/formValidation";
import { FaFilter, FaSearch } from "react-icons/fa";
import { alertConfirm, alertInfo } from "../../alerts/alerts";
import { filterData } from "../../validations/middlewares";

export default function Filter({ dataSelect, oldData, setData, title, keyFiltro }) {
  const [filter, setFilter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = formValidation.validateText(filter.toString());
    if (!error) return alertInfo("Completa todos los datos");;

    const response = filterData(oldData, setData, keyFiltro, filter);
    if (response) {
      alertConfirm("Filtrado con éxito")
    }

    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <h4 className="font-Oswald mb-2 text-xl text-start">{title}</h4>
        <div className="flex gap-2 w-full">
          <div className="h-full w-full">
            <div>
              <TESelect
              className="bg-white"
                data={dataSelect}
                name="filter"
                preventFirstSelection
                label="Filtro"
                onValueChange={(e) => {
                  setFilter(e.value);
                }}
              />
            </div>
          </div>

          <TERipple rippleColor="white" className="w-auto">
            <button
              type="submit"
              className="inline-block h-full rounded bg-naranja-brillante px-4 pb-[5px] pt-[6px] text-base font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              <FaFilter />
            </button>
          </TERipple>
        </div>
      </form>
    </>
  );
}