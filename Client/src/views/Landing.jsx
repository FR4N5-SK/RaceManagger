import Carrousel from "../components/galery/Carrousel";
import Navigation from "../components/Navigation";
import Aquatlon from "../../public/Aquatlón.png";
import Triatlon from "../../public/Triatlón.png";
import Atletismo from "../../public/Atletismo.png";
import Natacion from "../../public/Natación.png";
import AguasAbiertas from "../../public/Aguas-Abiertas.png";
import Gallery from "../components/galery/Gallery";
import TimeLine from "../components/TimeLine";
import Ejercicio from "../../public/Ejercicio.jpg"
import Table from "../components/Table";
import Footer from "../components/Footer";


export default function Landing() {
    const carrousel = [{
        title: "AQUATLÓN",
        content: "Las mejores competencias y torneos de la élite en atletismo de agua",
        image: Aquatlon
    },
    {
        title: "TRIATLÓN",
        content: "Las mejores competencias y torneos de la élite en atletismo de agua2",
        image: Triatlon
    },
    {
        title: "NATACIÓN",
        content: "Las mejores competencias y torneos de la élite en atletismo de agua3",
        image: Natacion
    },
    {
        title: "ATLETISMO",
        content: "Las mejores competencias y torneos de la élite en atletismo de agua4",
        image: Atletismo
    },
    {
        title: "AGUAS ABIERTAS",
        content: "Las mejores competencias y torneos de la élite en atletismo de agua5",
        image: AguasAbiertas
    }]
    const comidas = [
        {
            consumptionTime: "07:00 AM",
            mealName: "Avena con Frutas",
            price: 5.99
        },
        {
            consumptionTime: "10:00 AM",
            mealName: "Batido de Proteínas",
            price: 3.50
        },
        {
            consumptionTime: "12:30 PM",
            mealName: "Ensalada de Pollo a la Parrilla",
            price: 8.25
        },
        {
            consumptionTime: "03:00 PM",
            mealName: "Arroz con Frijoles",
            price: 4.75
        },
        {
            consumptionTime: "06:00 PM",
            mealName: "Salmón con Quinoa",
            price: 12.00
        },
        {
            consumptionTime: "07:00 AM",
            mealName: "Tostadas Integrales con Aguacate",
            price: 6.50
        },
        {
            consumptionTime: "10:00 AM",
            mealName: "Yogur con Granola",
            price: 4.00
        },
        {
            consumptionTime: "12:30 PM",
            mealName: "Pasta Integral con Verduras",
            price: 9.00
        },
        {
            consumptionTime: "03:00 PM",
            mealName: "Sopa de Lentejas",
            price: 5.25
        },
        {
            consumptionTime: "06:00 PM",
            mealName: "Filete de Ternera con Puré de Papas",
            price: 15.00
        }
    ]
    const titles = ["Hora", "Nombre de la Comida", "Precio"]

  return (
    <>
      <Navigation />

      <main className="w-full">
        <div className="h-[8vh]"></div>

        <Carrousel data={carrousel} />

        <section className="px-8 py-16 md:py-24 lg:py-28 lg:px-16 xl:py-36 text-black">
          <h3 className="font-Oswald mb-2 text-xl text-center">
            ¿Qué puedes hacer?
          </h3>
          <p className="text-xs xl:text-sm text-center md:px-12 lg:px-20 xl:px-28">
            Dentro de nuestra aplicación podras administrar torneos y
            competencias en deportes como aguas abiertas, natación, acuatlón,
            triatlón y atletismo, en los que nos permitirán registrar los
            atletas en conjuntos de los tiempos realizados por rondas
            permitiendo obtener los resultadas de cada fase y al final del
            torneo o competencia disputada.
          </p>
        </section>

        <section className="px-8 pb-16 md:pb-24 lg:pb-28 xl:pb-36">
          <div className="flex flex-col gap-8 lg:flex-row justify-center items-center">
            <div className="w-full lg:w-3/5">
              <Gallery />
            </div>
            <div className="w-full lg:w-2/5">
              <TimeLine />
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 gap-8 justify-center items-center">
            <div
              style={{ backgroundAttachment: "fixed" }}
              className="h-[500px] lg:h-[700px] w-full bg-[url('../../public/Ejercicio.jpg')] bg-cover bg-center bg-no-repeat"
            ></div>
            <div className="p-8 lg:px-[100px]">
              <h3 className="font-Oswald text-xl mb-4">
                Comidas recomendadas para Atletas
              </h3>
              <Table titles={titles} data={comidas} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
