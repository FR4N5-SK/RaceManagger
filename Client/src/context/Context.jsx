import { createContext, useEffect, useState } from "react";
import peticiones from '../validations/peticiones'
import { alertConfirm, alertError } from "../alerts/alerts";

export const Context = createContext();

export function ContextoProvider(props) {
  const [token, setToken] = useState("Invalid");
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  // Peticion a la api para iniciar sesion
  function peticionLogin(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.loginUser, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setToken(response.token);
            setUser(response.result);
            if (response.result.role === "admin") {
              setAdmin(true);
            }
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para Recuperar Contraseña
  function peticionRecovery(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.recoveryPassword, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para Registrase
  function peticionRegister(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.registerUser, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        admin,
        setAdmin,
        peticionLogin,
        peticionRecovery,
        peticionRegister
      }}
    >
      {props.children}
    </Context.Provider>
  );
}