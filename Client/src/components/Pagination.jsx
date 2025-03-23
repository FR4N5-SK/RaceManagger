import React, {useState} from 'react';
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io';

export const Pagination = ({pagina, setPagina, maximo}) => {
  const [input, setInput] = useState (1);

  const nextPage = () => {
    setInput (parseInt(input) + 1);
    setPagina (parseInt(pagina) + 1);
  };

  const previousPage = () => {
    setInput (parseInt(input) - 1);
    setPagina (parseInt(pagina) - 1);
  };

  const onKeyDown = e => {
    if (e.keyCode == 13) {
      setPagina (parseInt (e.target.value));
      if (
        parseInt (e.target.value < 1) ||
        parseInt (e.target.value) > Math.ceil (maximo) ||
        isNaN (parseInt (e.target.value))
      ) {
        setPagina (1);
        setInput (1);
      } else {
        setPagina (parseInt (e.target.value));
      }
    }
  };

  const onChange = e => {
    setInput (e.target.value);
  };

  return (
    <div className="flex gap-2 justify-center">
      <button
        className="bg-white border border-azul-cielo rounded-md px-2 flex justify-center items-center hover:bg-azul-brillante transition-all duration-500"
        disabled={pagina === 1 || pagina < 1}
        onClick={previousPage}
      >
        <IoMdArrowDropleftCircle className="text-xl text-black" />
      </button>
      <input
        className="w-12 text-center bg-white border border-azul-cielo rounded-md px-2 text-sm py-1"
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p className="w-auto bg-white border border-azul-cielo rounded-md px-2 text-sm py-1">
        {" "}
        de {maximo}{" "}
      </p>
      <button
        className="bg-white border border-azul-cielo rounded-md px-2 flex justify-center items-center hover:bg-azul-brillante transition-all duration-500"
        disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
        onClick={nextPage}
      >
        <IoMdArrowDroprightCircle className="text-xl text-black" />
      </button>
    </div>
  );
};