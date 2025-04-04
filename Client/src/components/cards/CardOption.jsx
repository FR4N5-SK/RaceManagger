import React from "react";
import { TERipple } from "tw-elements-react";

export default function CardOption({buttonFunction, content, title, img, button}) {
  return (
    <div className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <TERipple>
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img
            className="rounded-t-lg"
            src={img}
            alt=""
          />
          <a href="#!">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>
      </TERipple>
      <div className="p-6">
        <h5 className="mb-2 text-lg xl:text-xl font-semibold font-Oswald leading-tight text-azul-cielo">
          {title}
        </h5>
        <p className="mb-4 text-xs xl:text-sm text-black">
          {content}
        </p>
        <TERipple>
          <button
            type="button"
            onClick={buttonFunction}
            className="inline-block rounded bg-naranja-brillante px-6 pb-2 pt-2.5 text-[10px] xl:text-xs font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-azul-cielo hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-azul-cielo focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-opacity-85 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          >
            {button}
          </button>
        </TERipple>
      </div>
    </div>
  );
}
