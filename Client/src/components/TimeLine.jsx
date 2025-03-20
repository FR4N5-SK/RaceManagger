export default function TimeLine({data}) {
  return (
    <ol className="border-l border-azul-cielo">
      {/* <!--First item--> */}
      <li>
        <div className="flex-start flex items-center pt-3">
          <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-azul-cielo"></div>
          <p className="text-sm text-neutral-500">Funciones</p>
        </div>
        <div className="mb-6 ml-4 mt-2">
          <h4 className="mb-1.5 text-xl font-semibold text-azul-cielo font-Oswald">
            Competencias
          </h4>
          <p className="mb-3 text-black text-sm">
            Se permite crear, editar y eliminar competencias para atletas
            profesionales como amaeteurs, ademas registrar los tiempos de cada
            atleta en la competencia por lo cual se obtendrán los resultados de
            forma inmediata, agil y eficientemente.
          </p>
        </div>
      </li>
      {/* <!--First item--> */}
      <li>
        <div className="flex-start flex items-center pt-3">
          <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-azul-cielo"></div>
          <p className="text-sm text-neutral-500">Funciones</p>
        </div>
        <div className="mb-6 ml-4 mt-2">
          <h4 className="mb-1.5 text-xl font-semibold text-azul-cielo font-Oswald">
            Torneos
          </h4>
          <p className="mb-3 text-black text-sm">
            Se permite crear, editar y eliminar torneos para atletas
            profesionales como amaeteurs, ademas de registrar los tiempos de
            cada atleta en la competencia por lo cual se obtendrán los
            resultados de forma inmediata, agil y eficientemente, durante cada
            ronda o fase del torneo.
          </p>
        </div>
      </li>
      {/* <!--First item--> */}
      <li>
        <div className="flex-start flex items-center pt-3">
          <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-azul-cielo"></div>
          <p className="text-sm text-neutral-500">Funciones</p>
        </div>
        <div className="mb-6 ml-4 mt-2">
          <h4 className="mb-1.5 text-xl font-semibold text-azul-cielo font-Oswald">
            Atletas
          </h4>
          <p className="mb-3 text-black text-sm">
            Se permite crear, editar y eliminar atletas a la aplicación,
            registrando datos del atleta, y con esta información poder
            registrarlos a cada competición o torneo que desea participar el
            atleta.
          </p>
        </div>
      </li>
    </ol>
  );
}