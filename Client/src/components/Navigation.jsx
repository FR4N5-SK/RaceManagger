import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/RaceManager.png";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import Swal from "sweetalert2";
import { FaBars } from "react-icons/fa";

export default function Navigation() {
  const navigate = useNavigate();
  const { admin, setToken, setUser, setAdmin } = useContext(Context);

  const [sidebar, setSidebar] = useState(false)

  const handleLogut = async (e) => {
    Swal.fire({
      title: "¿Estás seguro de cerrar sesión?",
      text: "Ten cuidado de no estar realizando cambios importantes cuando cierres la sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Has cerrado sesión exitosamente!",
          text: "Gracias por usar RaceManagger.",
          icon: "success",
        });
        setAdmin(false);
        setUser(null);
        setToken("Invalid");
      }
    });
  };

  return (
    <>
      <header
        className="h-[8vh] fixed w-full bg-white border-b-2 border-azul-cielo flex justify-between px-4 z-10"
        style={{
          boxShadow: "1px 1px 20px 1px #00A3E0",
        }}
      >
        <img src={logo} alt="Logo RaceManagger" />

        <button
          type="button"
          className="inline-flex items-center h-full p-2 w-10 justify-center text-sm text-black rounded-lg lg:hidden"
        >
          <span onClick={(e) => setSidebar(!sidebar)}>
            <FaBars className="w-6 h-6 text-AzulA" />
          </span>
        </button>
        <div
          className={` ${
            sidebar
              ? "top-[8vh] lg:top-0"
              : "-top-[500%] lg:top-0"
          } -z-10 right-0 p-2 py-8 lg:p-0 lg:py-0 absolute lg:relative transition-all duration-1000 w-full lg:block lg:w-auto bg-white`}
          id="navbar-solid-bg"
        >
          <ul className="flex-col h-full flex lg:flex-row items-center justify-center gap-4 font-semibold text-sm text-black">
            <li>
              <Link to={"/inicio"} className="hover:text-naranja-brillante duration-300 transition-all">
                Inicio
              </Link>
            </li>
            <li>
              <Link className="hover:text-naranja-brillante duration-300 transition-all">
                Competiciones
              </Link>
            </li>
            <li>
              <Link to={"/atletas"} className="hover:text-naranja-brillante duration-300 transition-all">
                Atletas
              </Link>
            </li>
            {admin ? (
              <li>
                <Link to={"/admin"} className="hover:text-naranja-brillante duration-300 transition-all">
                  Administrador
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li>
              <Link
                onClick={handleLogut}
                className="hover:text-rojo-intenso duration-300 transition-all"
              >
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
