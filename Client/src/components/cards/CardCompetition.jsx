import React from "react";

export default function CardCompetition({competition}) {
  const dateStart = competition.dateStart_competition.substr(0, 16).split("T", 2)
  const dateEnd = competition.dateEnd_competition.substr(0, 16).split("T", 2)
  return (
    <div className="rounded-lg flex flex-col bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <h5 className="mb-4 text-lg lg:text-xl font-medium font-Oswald leading-tight text-azul-cielo ">
        {competition.name_competition}
      </h5>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Ubicación: </b> {competition.location_competition}
      </p>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Descripción: </b> {competition.description_competition}
      </p>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Modalidad: </b> {competition.mode_competition}
      </p>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Categoría: </b> {competition.categorie_competition}
      </p>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Fecha de Inicio: </b> {dateStart[0]} {dateStart[1]}
      </p>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Fecha de Finalización: </b> {dateEnd[0]} {dateEnd[1]}
      </p>
      <div className="grid grid-cols-2">
        <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
          <b>Participantes: </b> {competition.participants_competition}
        </p>
        <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
          <b>Rondas: </b> {competition.rounds_competition}
        </p>
      </div>
      <div className="grid grid-cols-2">
        <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
          <b>Tipo: </b> {competition.type_competition}
        </p>
        <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
          <b>Disciplina: </b> {competition.discipline_competition}
        </p>
      </div>
      {competition.mode_competition === "Eliminación Directa" ? (
        <div className="grid grid-cols-2">
          <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
            <b>Elimados por Ronda: </b> {competition.eliminated_competition}
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
