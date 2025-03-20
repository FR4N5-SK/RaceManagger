import { TECarousel, TECarouselItem } from "tw-elements-react";

export default function Carrousel({data}) {
  return (
    <>
      <TECarousel showControls showIndicators ride="carousel">
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {data.map((item, key) => (
            <TECarouselItem
              key={key}
              itemID={key + 1}
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <img src={item.image} className="block h-auto w-full" alt="..." />
              <div className="absolute inset-x-[15%] bottom-5 hidden my-5 text-center text-white md:block bg-black bg-opacity-50 rounded-md">
                <h5 className="text-2xl font-Oswald pt-2 px-2">{item.title}</h5>
                <p className="pb-2 px-2">{item.content}</p>
              </div>
            </TECarouselItem>
          ))}
        </div>
      </TECarousel>
    </>
  );
}
