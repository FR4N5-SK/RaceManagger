import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { Context } from "../../context/Context";
import { Pagination } from "../../components/Pagination";
import NewCompetition from "../../components/Forms/NewCompetition";
import Modal from "../../components/Modal";
import { TERipple } from "tw-elements-react";
import EditCompetition from "../../components/Forms/EditCompetition";
import CardCompetition from "../../components/cards/CardCompetition";

export default function AdminCompetitions() {
  const { loading, setLoading, peticionAllCompetitions, competitions, peticionDeleteCompetition, peticionAllCategories } =
    useContext(Context);

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = Math.ceil(competitions.length / porPagina);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setTimeout(() => {
        peticionAllCompetitions();
        peticionAllCategories();
      }, 1000);
    };
    load();
  }, []);

  const titles = ["ID", "Nombre", "Disciplina", "Opciones"];

  return (
    <>
      <Navigation />

      {loading ? (
        <main>
          <div className="h-[8vh]"></div>
          <div className="h-[92vh] flex justify-center items-center">
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </main>
      ) : (
        <main className="w-full">
          <div className="h-[8vh]"></div>

          <section className="h-[92vh] p-4 py-12 lg:p-12 lg:py-20">
            <h3 className="font-Oswald font-bold text-lg lg:text-xl mb-1.5">
              Listado de Competencias Registradas en el Sistema
            </h3>
            <Modal
              button={"Agregar Competitición"}
              buttonStyle={`inline-block mb-4 rounded bg-naranja-brillante px-4 pb-[5px] pt-[6px] text-[11px] font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]`}
              size={"auto"}
              title={"Agregar Nueva Competición"}
              component={<NewCompetition />}
            />
            <div className="flex flex-col mb-4">
              <div className="overflow-x-auto">
                <div className="w-full py-2">
                  <div>
                    <table className="w-full overflow-x-visible text-center text-sm font-light border border-gray-300">
                      <thead className="border-b bg-azul-cielo bg-opacity-75 text-white font-medium">
                        <tr className="border-b border-gray-300">
                          {titles.map((item, key) => (
                            <th key={key} scope="col" className=" px-6 py-4">
                              {item}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {competitions
                          .slice(
                            (pagina - 1) * porPagina,
                            (pagina - 1) * porPagina + porPagina
                          )
                          .map((item, key) => (
                            <tr
                              key={key}
                              className="border-b border-gray-300 text-xs lg:text-sm"
                            >
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {item.id_competition}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {item.name_competition}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {item.discipline_competition}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                <Modal
                                  button={"Ver"}
                                  buttonStyle={
                                    "inline-block mr-2 rounded bg-primary px-4 pb-[5px] pt-[6px] text-[10px] font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                  }
                                  size={"auto"}
                                  title={"Competición Seleccionada"}
                                  component={<CardCompetition competition={item} />}
                                />
                                <Modal
                                  button={"Editar"}
                                  buttonStyle={
                                    "inline-block mr-2 rounded bg-primary px-4 pb-[5px] pt-[6px] text-[10px] font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-naranja-brillante hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                  }
                                  size={"auto"}
                                  title={"Editar la Competición"}
                                  component={<EditCompetition competition={item} />}
                                />
                                <TERipple rippleColor="white">
                                  <button
                                    type="button"
                                    onClick={(e) =>
                                      peticionDeleteCompetition(
                                        item.id_competition
                                      )
                                    }
                                    className="inline-block mr-2 rounded bg-primary px-4 pb-[5px] pt-[6px] text-[10px] font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-rojo-intenso hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                  >
                                    Eliminar
                                  </button>
                                </TERipple>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
          </section>
        </main>
      )}

      <Footer />
    </>
  );
}
