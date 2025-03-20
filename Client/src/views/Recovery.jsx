import { TEInput, TERipple } from "tw-elements-react";
import logo from "../../public/RaceManager.png"
import { Link, useNavigate } from "react-router-dom";
import formValidation from "../validations/formValidation";
import { useContext, useState } from "react";
import { alertInfo } from "../alerts/alerts";
import { Context } from "../context/Context";

export default function Recovery() {
  const navigate = useNavigate();
  const { peticionRecovery } = useContext(Context);

  const [values, setValues] = useState({
    username: "",
    codeAdmin: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validation = () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) return alertInfo(validate);

    //Confirmar que las contraseñas coincidan
    const passwordsValidate = formValidation.validatePasswords(
      values.password,
      values.passwordConfirm
    );
    if (passwordsValidate) return alertInfo(passwordsValidate);

    const respuesta = await peticionRecovery(values);
    if (respuesta) {
      navigate("/");
    }
  };

  return (
    <>
      <main className="md:h-screen w-full bg-gris-claro p-4 md:p-12 lg:px-16 xl:px-32 lg:py-12">
        <section className="h-full">
          <div className="h-full">
            {/* <!-- Left column container with background--> */}
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <img src={logo} className="w-full" alt="Sample image" />
              </div>

              {/* <!-- Right column container --> */}
              <div className="w-full mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-3xl font-Oswald font-bold mb-12 text-center">
                    RECUPERAR CONTRASEÑA
                  </h2>
                  {/* <!-- Username input --> */}
                  <TEInput
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleInputChange}
                    label="Usuario"
                    size="lg"
                    className="mb-6"
                  ></TEInput>

                  {/* <!--AdminCode input--> */}
                  <TEInput
                    type="text"
                    name="codeAdmin"
                    value={values.codeAdmin}
                    onChange={handleInputChange}
                    label="Código Administrador"
                    className="mb-6"
                    size="lg"
                  ></TEInput>

                  <div className="border w-full border-black border-opacity-25 mb-6"></div>

                  {/* <!--Password input--> */}
                  <TEInput
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    label="Nueva Contraseña"
                    size="lg"
                    className="mb-6"
                  ></TEInput>

                  {/* <!--Password Confirm input--> */}
                  <TEInput
                    type="password"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onChange={handleInputChange}
                    label="Confirmar Contraseña"
                    className="mb-6"
                    size="lg"
                  ></TEInput>

                  {/* <!-- Login button --> */}
                  <div className="flex flex-col lg:text-left w-full">
                    <TERipple
                      rippleColor="light"
                      className="flex justify-center"
                    >
                      <button
                        type="submit"
                        className="inline-block rounded bg-naranja-brillante px-7 pb-2.5 pt-3 text-sm uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition-all font-bold duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        Recuperar Contraseña
                      </button>
                    </TERipple>

                    {/* <!-- Register link --> */}
                    <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-center">
                      ¿No estás registrado?{" "}
                      <Link
                        to={"/registro"}
                        className="text-azul-cielo transition duration-150 ease-in-out hover:text-naranja-brillante focus:naranja-brillante active:naranja-brillante"
                      >
                        Regístrate
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}