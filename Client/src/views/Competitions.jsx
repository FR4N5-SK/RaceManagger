import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Compe from "../../public/compes.jpg"
import { Context } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import Filter from "../components/Forms/Filter";
import Search from "../components/Forms/Search";
import { TERipple } from "tw-elements-react";
import { IoMdRefresh } from "react-icons/io";
import CardCompeFull from "../components/cards/CardCompeFull";
import { Pagination } from "../components/Pagination";

export default function Competitions() {
  const { loading, setLoading, peticionAllAthletes, peticionAllCompetitions, competitions } =
    useContext(Context);

  const [data, setData] = useState([]);

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(12);

  const maximo = Math.ceil(data.length / porPagina);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setTimeout(() => {
        peticionAllCompetitions();
        peticionAllAthletes();
      }, 500);
    };
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      setTimeout(() => {
        setData(competitions);
      }, 500);
    };
    load();
  }, [competitions]);

  
  const refresh = (e) => {
    e.preventDefault();
    setLoading(true)
    peticionAllCompetitions();
  }

  return (
    <>
      <Navigation />

      {loading ? (
        <Loader />
      ) : (
        <main className="w-full">
          <div className="h-[8vh]"></div>

          <figure className="w-full">
            <img
              className="w-full"
              src={Compe}
              alt="Competiciones de RaceManagger"
            />
          </figure>

          <section className="px-8 py-12 md:py-20 lg:py-24 lg:px-16 xl:py-30 text-black">
            <h3 className="font-Oswald mb-2 text-xl text-center">
              Competiciones de RaceManagger
            </h3>
            <p className="text-xs xl:text-sm text-center md:px-12 lg:px-20 xl:px-28">
              En esta sección podrás ver las competiciones en sus diferentes
              modalidades y categorías que le ofrecemos a los atletlas para
              mejorar sus capacidades y crecer como atletas, así mismo registrar
              los atletas a cada competición y por otro lado se te permitira
              agregar los tiempos realizados por cada atleta en las
              competiciones y sus rondas.
            </p>
          </section>

          <section className="px-8 py-12 md:py-16 lg:py-20 lg:px-16 xl:py-24 text-black">
            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              <li className="w-full px-4">
                <h4 className="font-Oswald mb-2 text-xl text-start">
                  Herramientas
                </h4>
                <div className="flex gap-2">
                  <TERipple>
                    <button
                      onClick={refresh}
                      type="button"
                      className="flex items-center gap-1 rounded border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    >
                      Refrescar <IoMdRefresh className="text-lg" />
                    </button>
                  </TERipple>
                </div>
              </li>
              <li className="w-full px-4">
                <Search
                  label={"Nombre Competición"}
                  title={"Buscador"}
                  oldData={competitions}
                  setData={setData}
                  keySearch={"name_competition"}
                />
              </li>
              <li className="w-full px-4">
                <Filter
                  title={"Filtro por Disciplina"}
                  oldData={competitions}
                  keyFiltro={"discipline_competition"}
                  setData={setData}
                  dataSelect={[
                    { text: "Todos", value: "*" },
                    { text: "Aguas Abiertas", value: "Aguas Abiertas" },
                    { text: "Natación", value: "Natación" },
                    { text: "Atletismo", value: "Atletismo" },
                    { text: "Acuatlón", value: "Acuatlón" },
                    { text: "Triatlón", value: "Triatlón" },
                  ]}
                />
              </li>
            </ul>
          </section>

          <section className="px-8 py-6 md:py-8 lg:py-10 lg:px-16 xl:py-12 text-black">
            <ul className="grid grid-cols-1 xl:grid-cols-2 self-center gap-4">
              {data.length === 0 ? (
                <h5 className="font-Oswald mb-2 text-xl lg:text-2xl text-center">
                  No hay Competiciones registradas
                </h5>
              ) : (
                data
                  .slice(
                    (pagina - 1) * porPagina,
                    (pagina - 1) * porPagina + porPagina
                  )
                  .map((item) => (
                    <li className="h-full">
                      <CardCompeFull competition={item} />
                    </li>
                  ))
              )}
            </ul>

            {data.length === 0 ? (
              <></>
            ) : (
              <div className="mt-4">
                <Pagination
                  pagina={pagina}
                  setPagina={setPagina}
                  maximo={maximo}
                />
              </div>
            )}
          </section>
        </main>
      )}

      <Footer />
    </>
  );
}