import React from "react";

export default function CardAthlete({athlete}) {
  return (
    <div className="rounded-lg flex flex-col bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <h5 className="mb-4 text-lg lg:text-xl font-medium font-Oswald leading-tight text-azul-cielo ">
        {athlete.name_athlete} {athlete.lastname_athlete}
      </h5>
      <div className="grid grid-cols-2">
        <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
          <b>Edad: </b> {athlete.age_athlete} Años
        </p>
        <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
          <b>Peso: </b> {athlete.weight_athlete} Kg
        </p>
      </div>
      <div className="grid grid-cols-2">
        <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
          <b>Teléfono: </b> {athlete.phone_athlete}
        </p>
        <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
          <b>Sexo: </b> {athlete.sex_athlete}
        </p>
      </div>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Correo: </b> {athlete.email_athlete}
      </p>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Nacionalidad: </b> {athlete.nation_athlete}
      </p>
    </div>
  );
}
