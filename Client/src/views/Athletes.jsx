import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Atletas from "../../public/Atletas.jpg"
import Search from "../components/Forms/Search";
import Filter from "../components/Forms/Filter";
import { TERipple } from "tw-elements-react";
import { IoIosAddCircleOutline, IoMdRefresh } from "react-icons/io";
import { Context } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import CardAthlete from "../components/cards/CardAthlete";
import Modal from "../components/Modal";
import NewAthlete from "../components/Forms/NewAthlete";

export default function Athletes() {
  const { loading, setLoading, peticionAllAthletes, athletes } =
    useContext(Context);

  const [data, setData] = useState([]);

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(12);

  const maximo = Math.ceil(data.length / porPagina);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setTimeout(() => {
        peticionAllAthletes();
      }, 500);
    };
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      setTimeout(() => {
        setData(athletes);
      }, 500);
    };
    load();
  }, [athletes]);

  
  const refresh = (e) => {
    e.preventDefault();
    setLoading(true)
    peticionAllAthletes();
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
              src={Atletas}
              alt="Atletas de RaceManagger"
            />
          </figure>

          <section className="px-8 py-12 md:py-20 lg:py-24 lg:px-16 xl:py-30 text-black">
            <h3 className="font-Oswald mb-2 text-xl text-center">
              Atletas para Competir
            </h3>
            <p className="text-xs xl:text-sm text-center md:px-12 lg:px-20 xl:px-28">
              En esta sección podrás ver y agregar a los atletas que seran
              integrados a participar dentro de las competiciones de
              RaceManagger en sus diferentes categorías, junto a la posibilidad
              de ver sus datos y foto para familiarizarte con ellos e incluso
              ver sus mejores tiempos, participaciones y competencias ganadas.
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
                  <Modal
                    button={`Agregar`}
                    buttonStyle={`flex items-center gap-1 rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`}
                    size={"auto"}
                    title={"Agregar Nuevo Atleta"}
                    component={<NewAthlete />}
                  />
                </div>
              </li>
              <li className="w-full px-4">
                <Search title={"Buscador"} oldData={athletes} setData={setData} keySearch={"name_athlete"} />
              </li>
              <li className="w-full px-4">
                <Filter
                  title={"Filtro"}
                  oldData={athletes}
                  keyFiltro={"sex_athlete"}
                  setData={setData}
                  dataSelect={[
                    { text: "Masculino", value: "masculino" },
                    { text: "Femenino", value: "femenino" },
                    { text: "Ambos", value: "*" },
                  ]}
                />
              </li>
            </ul>
          </section>

          <section className="px-8 py-6 md:py-8 lg:py-10 lg:px-16 xl:py-12 text-black">
            <h4 className="font-Oswald mb-4 text-xl text-center">
              Resultados de la Búsqueda
            </h4>
            <ul className="flex flex-wrap justify-center gap-4">
              {data.length === 0 ? (
                <h5 className="font-Oswald mb-2 text-xl lg:text-2xl text-center">
                  No hay atletas registrados
                </h5>
              ) : (
                data
                  .slice(
                    (pagina - 1) * porPagina,
                    (pagina - 1) * porPagina + porPagina
                  )
                  .map((item) => (
                    <li className="w-[325px] ">
                      <CardAthlete athlete={item} key={item.id_athlete} />
                    </li>
                  ))
              )}
            </ul>
          </section>
        </main>
      )}

      <Footer />
    </>
  );
}