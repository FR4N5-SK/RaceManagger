import React from "react";
import Admin from "../../../public/admin.jpg"
import User from "../../../public/user.png"

export default function CardUser({user}) {
  return (
    <div className="rounded-lg flex flex-col bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div className=" mb-2 flex w-full justify-center items-center">
        <img
          src={user.role_user === "admin" ? Admin : User}
          className="w-32 rounded-full"
          alt="Avatar"
        />
      </div>
      <h5 className="mb-4 text-lg lg:text-xl font-medium font-Oswald leading-tight text-azul-cielo ">
        {user.username_user}
      </h5>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Nombres: </b> {user.name_user}
      </p>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Apellidos: </b> {user.lastname_user}
      </p>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Correo: </b> {user.email_user}
      </p>
      <p className="mb-1 text-sm text-start text-neutral-900 text-wrap">
        <b>Rol: </b> {user.role_user}
      </p>
    </div>
  );
}
