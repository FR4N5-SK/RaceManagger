import { TEInput, TERipple } from "tw-elements-react";
import logo from "../../public/RaceManager.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import formValidation from "../validations/formValidation";
import { alertInfo } from "../alerts/alerts";
import { Context } from "../context/Context";

export default function Login() {
    const navigate = useNavigate();
    const { peticionLogin } = useContext(Context);

    const [values, setValues] = useState({
      username: "",
      password: "",
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

      const respuesta = await peticionLogin(values);
      if (respuesta) {
        navigate("/inicio");
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
                  <img
                    src={logo}
                    className="w-full"
                    alt="Sample image"
                  />
                </div>

                {/* <!-- Right column container --> */}
                <div className="w-full mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-Oswald font-bold mb-12 text-center">INICIO DE SESIÓN</h2>
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

                    {/* <!--Password input--> */}
                    <TEInput
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleInputChange}
                      label="Contraseña"
                      className="mb-6"
                      size="lg"
                    ></TEInput>

                    <div className="mb-6 flex md:items-center gap-2 md:gap-0 flex-col md:flex-row md:justify-between">
                      {/* <!-- Remember me checkbox --> */}
                      <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                          className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-azul-cielo checked:bg-azul-cielo checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="checkbox"
                          value=""
                          id="exampleCheck2"
                        />
                        <label
                          className="inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="exampleCheck2"
                        >
                          Acuérdate de mí
                        </label>
                      </div>

                      {/* <!--Forgot password link--> */}
                      <Link to={"/recuperacion"} className="hover:text-naranja-brillante transition-all duration-200">¿Olvidaste tu contraseña?</Link>
                    </div>

                    {/* <!-- Login button --> */}
                    <div className="flex flex-col lg:text-left w-full">
                      <TERipple rippleColor="light" className="flex justify-center">
                        <button
                          type="submit"
                          className="inline-block rounded bg-naranja-brillante px-7 pb-2.5 pt-3 text-sm uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition-all font-bold duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                          Iniciar Sesión
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