import { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import formValidation from "../../validations/formValidation";
import { FaSearch } from "react-icons/fa";
import { searchData } from "../../validations/middlewares";
import { alertConfirm } from "../../alerts/alerts";

export default function Search({ oldData, setData, title, keySearch, label }) {
  const [search, setSearch] = useState("");

  
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = formValidation.validateText(search.toString());
    if (!error) return alertInfo("Completa todos los datos");;

    const response = searchData(oldData, search, keySearch, setData);
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
            <TEInput
              className="h-full w-full bg-white"
              type="text"
              name="search"
              value={search}
              onChange={handleInputChange}
              label={label}
            ></TEInput>
          </div>

          <TERipple rippleColor="white" className="w-auto">
            <button
              type="submit"
              className="inline-block h-full rounded bg-naranja-brillante px-4 pb-[5px] pt-[6px] text-base font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              <FaSearch />
            </button>
          </TERipple>
        </div>
      </form>
    </>
  );
}