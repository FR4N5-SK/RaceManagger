import CardOption from "../components/cards/CardOption";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Atleta from "../../public/Atleta.jpg";
import Users from "../../public/usuarios.png";
import Competencias from "../../public/Torneo.jpg";
import Categoria from "../../public/Categorias.png";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();


  return (
    <>
      <Navigation />

      <main className="w-full">
        <div className="h-[8vh]"></div>
        <div className="min-h-[92vh] px-4 md:px-6 lg:px-10 xl:px-16 py-12">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li>
              <CardOption
                buttonFunction={(e) => {
                  navigate("/admin/athletes")
                }}
                title={"Administrador de Atletas"}
                content={
                  "Administra los atletas que están registrados en la app, donde puedes ver, editar agregar o eliminar cada atleta según lo necesitado."
                }
                img={Atleta}
                button={"Administrar"}
              />
            </li>
            <li>
              <CardOption
                buttonFunction={(e) => {
                    navigate("/admin/competitions");
                }}
                title={"Administrador de Competiciones"}
                content={
                  "Administra las competiciones que están registradas en la app, donde puedes ver, editar agregar o eliminar cada competencia según lo necesitado."
                }
                img={Competencias}
                button={"Administrar"}
              />
            </li>
            <li>
              <CardOption
                buttonFunction={(e) => {
                    navigate("/admin/users");
                }}
                title={"Administrador de Usuarios"}
                content={
                  "Administra los usuarios que están registrados en la app, donde puedes ver o eliminar cada usuario según lo necesitado."
                }
                img={Users}
                button={"Administrar"}
              />
            </li>
            <li>
              <CardOption
                buttonFunction={(e) => {
                  navigate("/admin/categories")
                }}
                title={"Administrador de Categorías"}
                content={
                  "Administra las categorías que están registradas en la app, donde puedes ver, editar agregar o eliminar cada atleta según lo necesitado."
                }
                img={Categoria}
                button={"Administrar"}
              />
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}
