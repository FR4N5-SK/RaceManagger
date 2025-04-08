import React from "react";

export default function CardCompetition({competition}) {
  const dateStart = competition.dateStart_competition.substr(0, 16).split("T", 2)
  const dateEnd = competition.dateEnd_competition.substr(0, 16).split("T", 2)
  return (
    <div className="p-6">
      <h4 className="mb-4 text-lg lg:text-xl font-medium font-Oswald text-azul-cielo leading-tight text-start">
        {competition.type_competition}
      </h4>
      <h5 className="mb-1 text-base lg:text-lg font-medium font-Oswald leading-tight text-start">
        {competition.name_competition}
      </h5>
      <p className="mb-6 text-sm text-start">
        {competition.description_competition}
      </p>

      <div className="flex flex-col gap-1 text-sm font-Open-Sans text-black">
        <h6 className="text-start">
          <span className="font-semibold">Ubicación: </span>
          {competition.location_competition}
        </h6>
        <div className="flex gap-4">
          <h6 className="text-start">
            <span className="font-semibold">Disciplina: </span>
            {competition.discipline_competition}
          </h6>
          <h6 className="text-start">
            <span className="font-semibold">Categoría: </span>
            {competition.categorie_competition}
          </h6>
        </div>
        <div className="flex gap-4">
          <h6 className="text-start">
            <span className="font-semibold">Fecha de Inicio: </span>
            {dateStart[0]} {dateStart[1]}
          </h6>
          <h6 className="text-start">
            <span className="font-semibold">Fecha de Finalización: </span>
            {dateEnd[0]} {dateEnd[1]}
          </h6>
        </div>
        <div className="flex gap-4">
          <h6 className="text-start">
            <span className="font-semibold">Estatus: </span>
            <span className={`inline-block whitespace-nowrap rounded-[0.27rem] ${competition.status_competition === "Sin empezar" ? ("bg-primary-200 text-primary-700") : (competition.status_competition === "En juego" ? ("bg-success-200 text-success-700") : ("bg-danger-200 text-danger-700"))} px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-sm font-bold leading-none`}>
              {competition.status_competition}
            </span>
          </h6>
          <h6 className="text-start">
            <span className="font-semibold">Participantes: </span>
            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-200 text-primary-700 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-sm font-bold leading-none">
              {competition.participants_competition}
            </span>
          </h6>
          <h6 className="text-start">
            <span className="font-semibold">Inscritos: </span>
            <span className={`inline-block whitespace-nowrap rounded-[0.27rem] ${competition.enrolled_competition == 0 ? ("bg-red-200 text-red-700") : (competition.enrolled_competition === competition.participants_competition ? ("bg-success-200 text-success-700") : ("bg-orange-200 text-orange-700"))} px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-sm font-bold leading-none`}>
              {competition.enrolled_competition}
            </span>
          </h6>
        </div>
      </div>
    </div>
  );
}
