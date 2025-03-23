import { createContext, useEffect, useState } from "react";
import peticiones from '../validations/peticiones'
import { alertConfirm, alertError } from "../alerts/alerts";
import Swal from "sweetalert2";

export const Context = createContext();

export function ContextoProvider(props) {
  const [token, setToken] = useState("Invalid");
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [athletes, setAthletes] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [users, setUsers] = useState([]);

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

  // Peticion a la api para traer todos los atletas
  function peticionAllAthletes(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.allAthletes, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setLoading(false);
            alertConfirm(response.message);
            setAthletes(response.data);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para traer todos las competencias
  function peticionAllCompetitions(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.allCompetitions, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setLoading(false);
            alertConfirm(response.message);
            setCompetitions(response.data);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para traer todos las competencias
  function peticionAllUsers(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.allUsers, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setLoading(false);
            alertConfirm(response.message);
            setUsers(response.data);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para agregar atleta
  function peticionAddAthlete(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.AddAthletes, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            setAthletes([...athletes, response.data]);
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

  // Peticion a la api para editar atleta
  function peticionEditAthlete(data, id) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.EditAthletes + id, {
        mode: "cors",
        method: "PUT", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            const newStorage = [];
            athletes.map((item) => {
              if (item.id_athlete === response.data.id_athlete) {
                newStorage.push(response.data);
              } else {
                newStorage.push(item);
              }
            });
            setAthletes(newStorage);
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

  // Peticion a la api para eliminar Atleta
  function peticionDeleteAthlete(id) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "question",
        title: "Eliminar",
        text: "¿Estas seguro que quieres eliminar el Atleta?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Cancelado", "Ten mas cuidado la proxima vez", "info");
        } else if (result.isDenied) {
          fetch(peticiones.DeleteAthletes + id, {
            mode: "cors",
            method: "DELETE", // or 'PUT'
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.status < 210 && response.status >= 200) {
                const newState = athletes.filter(
                  (item) => item.id_athlete !== id
                );
                setAthletes(newState);
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
        }
      });
    });
  }

  // Peticion a la api para agregar competiticón
  function peticionAddCompetition(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.AddCompetition, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            setCompetitions([...competitions, response.data]);
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

  // Peticion a la api para editar atleta
  function peticionEditCompetition(data, id) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.EditCompetition + id, {
        mode: "cors",
        method: "PUT", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            const newStorage = [];
            competitions.map((item) => {
              if (item.id_competition === response.data.id_competition) {
                newStorage.push(response.data);
              } else {
                newStorage.push(item);
              }
            });
            setCompetitions(newStorage);
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

  // Peticion a la api para eliminar Atleta
  function peticionDeleteCompetition(id) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "question",
        title: "Eliminar",
        text: "¿Estas seguro que quieres eliminar la Competición?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Cancelado", "Ten mas cuidado la próxima vez", "info");
        } else if (result.isDenied) {
          fetch(peticiones.DeleteCompetition + id, {
            mode: "cors",
            method: "DELETE", // or 'PUT'
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.status < 210 && response.status >= 200) {
                const newState = competitions.filter(
                  (item) => item.id_competition !== id
                );
                setCompetitions(newState);
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
        }
      });
    });
  }

  // Peticion a la api para eliminar Usuario
  function peticionDeleteUser(id) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "question",
        title: "Eliminar",
        text: "¿Estas seguro que quieres eliminar el Usuario?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Cancelado", "Ten mas cuidado la próxima vez", "info");
        } else if (result.isDenied) {
          fetch(peticiones.DeleteUser + id, {
            mode: "cors",
            method: "DELETE", // or 'PUT'
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.status < 210 && response.status >= 200) {
                const newState = users.filter(
                  (item) => item.id_user !== id
                );
                setUsers(newState);
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
        loading,
        setLoading,
        athletes,
        setAthletes,
        competitions,
        setCompetitions,
        users,
        setUsers,
        peticionLogin,
        peticionRecovery,
        peticionRegister,
        peticionAllAthletes,
        peticionAllCompetitions,
        peticionAllUsers,
        peticionAddAthlete,
        peticionEditAthlete,
        peticionDeleteAthlete,
        peticionAddCompetition,
        peticionDeleteCompetition,
        peticionEditCompetition,
        peticionDeleteUser
      }}
    >
      {props.children}
    </Context.Provider>
  );
}