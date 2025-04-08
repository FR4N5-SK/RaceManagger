import React, { useContext, useEffect, useState } from "react";
import { allAthletesInCompetitions, allResultInCompetitions, editStatusCompetition } from "../../js/fecths";
import { Context } from "../../context/Context";
import Modal from "../Modal";
import NewAthlete from "../Forms/NewAthlete";
import NewRegisterAthlete from "../Forms/NewRegisterAthlete";
import CardCompetition from "./CardCompetition";
import { TERipple } from "tw-elements-react";
import NewTime from "../Forms/NewTime";

export default function CardCompeFull({ competition }) {
  const { token, competitions, setCompetitions } = useContext(Context);

  const [body, setBody] = useState(1);
  const [allAthletes, setAllAthletes] = useState([]);
  const [allTimes, setAllTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setTimeout(async () => {
        await allAthletesInCompetitions(
          competition.id_competition,
          token,
          setAllAthletes,
          setLoading
        );
      }, 500);
    };
    if (body === 2 && allAthletes.length === 0) {
      load();
    }
    if (body === 3 && allAthletes.length === 0) {
      load();
    }
  }, [body]);

  useEffect(() => {
    const load2 = async () => {
      setLoading(true);
      setTimeout(async () => {
        await allResultInCompetitions(
          competition.id_competition,
          token,
          allAthletes,
          setAllTimes,
          setLoading
        );
      }, 500);
    };
    if (body === 3 || body === 2) {
      load2();
    }
  }, [allAthletes])

  const titles = ["Nombre y Apellido", "Nacionalidad", "Tiempo Realizado", "Opciones"]

  return (
    <div className="w-full h-full rounded-lg bg-white border border-naranja-brillante text-start text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
      <div className="border-b-2 border-neutral-300 px-3 pt-3 dark:border-white/10">
        <ul className="-mb-0.5 flex list-none flex-row flex-wrap border-b-0 ps-0">
          <li role="presentation">
            <a
              onClick={(e) => setBody(1)}
              className={`block hover:cursor-pointer border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent ${
                body === 1
                  ? "border-b-naranja-brillante text-naranja-brillante"
                  : ""
              }`}
            >
              Detalles
            </a>
          </li>
          <li role="presentation">
            <a
              onClick={(e) => setBody(2)}
              className={`block hover:cursor-pointer border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent ${
                body === 2
                  ? "border-b-naranja-brillante text-naranja-brillante"
                  : ""
              }`}
            >
              Participantes
            </a>
          </li>
          <li role="presentation">
            <a
              onClick={(e) => setBody(3)}
              className={`block hover:cursor-pointer border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent ${
                body === 3
                  ? "border-b-naranja-brillante text-naranja-brillante"
                  : ""
              }`}
            >
              Resultados
            </a>
          </li>
        </ul>
      </div>

      {body === 1 ? (
        <CardCompetition competition={competition} />
      ) : body === 2 ? (
        <div className="p-6">
          <Modal
            button={"Inscibir Atleta"}
            buttonStyle={`inline-block mb-4 rounded bg-naranja-brillante px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]`}
            size={"auto"}
            title={"Agregar Nuevo Atleta"}
            component={
              <NewRegisterAthlete
                data={allAthletes}
                setData={setAllAthletes}
                id={competition.id_competition}
              ></NewRegisterAthlete>
            }
          />
          <h5 className="mb-2 text-lg lg:text-xl font-medium font-Oswald leading-tight text-start">
            Participantes:
          </h5>
          <ol className="font-Open-Sans text-black text-sm font-medium list-decimal ml-6">
            {loading ? (
              <div
                className="flex justify-start h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : allAthletes.length === 0 ? (
              <p className="mb-2 text-sm lg:text-base font-medium font-Open-Sans leading-tight text-start">
                No hay atletas inscritos a la competición...
              </p>
            ) : (
              allAthletes.map((item) => (
                <li
                  key={item.id_enrolled}
                  className="text-start mb-2 justify-start list-item"
                >
                  <div className="flex gap-2">
                    <h6>
                      {item.name_athlete} {item.lastname_athlete}
                    </h6>
                    <p className="text-naranja-brillante">
                      {item.nation_athlete}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ol>
        </div>
      ) : (
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium font-Oswald leading-tight text-start">
            Resultados
          </h5>
          <h5
            className={`mb-2 text-lg font-medium font-Oswald ${
              competition.status_competition === "En juego"
                ? "text-success-700"
                : competition.status_competition === "Finalizado"
                ? "text-danger-700"
                : "text-primary-700"
            } leading-tight text-start`}
          >
            {competition.status_competition}
          </h5>
          <div className="flex gap-4 mb-4">
            {competition.status_competition === "Finalizado" ? (
              <></>
            ) : competition.status_competition === "Sin empezar" ? (
              <TERipple>
                <button
                  type="button"
                  onClick={(e) => {
                    editStatusCompetition(
                      competition.id_competition,
                      {
                        status: "En juego",
                      },
                      token,
                      competitions,
                      setCompetitions
                    );
                  }}
                  className="flex items-center gap-1 rounded border-2 border-primary px-2 pb-[2px] pt-1 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                >
                  Iniciar {competition.type_competition}
                </button>
              </TERipple>
            ) : (
              <TERipple>
                <button
                  onClick={(e) => {
                    editStatusCompetition(
                      competition.id_competition,
                      {
                        status: "Finalizado",
                      },
                      token,
                      competitions,
                      setCompetitions
                    );
                  }}
                  type="button"
                  className="flex items-center gap-1 rounded border-2 border-success px-2 pb-[2px] pt-1 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                >
                  Finalizar {competition.type_competition}
                </button>
              </TERipple>
            )}
          </div>
          {allAthletes.length === 0 ? (
            <h6 className="font-Open-Sans text-sm">
              Deben haber atletas inscritos
            </h6>
          ) : (
            <table className="w-full overflow-x-visible text-center text-xs rounded-md font-light border border-gray-900">
              <thead className="border-b bg-naranja-brillante rounded-t-md bg-opacity-75 text-gray-900 font-medium">
                <tr className="border-b border-gray-900">
                  {titles.map((item, key) => (
                    <th key={key} scope="col" className=" px-2 py-2">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allTimes.map((item, key) => (
                  <tr
                    key={item.id_result}
                    className="border-b border-gray-900 text-xs"
                  >
                    <td className="whitespace-nowrap  px-2 py-2 font-medium">
                      {item.name_athlete} {item.lastname_athlete}
                    </td>
                    <td className="whitespace-nowrap  px-2 py-2 font-medium">
                      {item.nation_athlete}
                    </td>
                    <td className="whitespace-nowrap  px-2 py-2 font-medium">
                      {item.time_result}
                    </td>
                    <td>
                      {
                        competition.status_competition === "En juego" ? (
                          item.time_result === "Sin tiempo todavia" ? (
                            <Modal
                              button={"Agregar Tiempo"}
                              buttonStyle={
                                "inline-block hover:cursor-pointer whitespace-nowrap rounded-[0.27rem] bg-info-200 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-xs font-bold leading-none text-info-700"
                              }
                              size={"auto"}
                              title={"Registrar tiempo del Atleta"}
                              component={
                                <NewTime
                                  data={allTimes}
                                  setData={setAllTimes}
                                  result={item}
                                ></NewTime>
                              }
                            />
                          ) : (
                            <span className="inline-block hover:cursor-pointer whitespace-nowrap rounded-[0.27rem] bg-info-200 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-xs font-bold leading-none text-info-700">
                              Listo
                            </span>
                          )
                        ) : (
                          <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-200 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-xs font-bold leading-none text-danger-700">
                              Ninguna
                            </span>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
