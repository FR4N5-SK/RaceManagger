import GalleryA from "../../../public/GalleryA.jpg"
import GalleryB from "../../../public/GalleryB.jpg"
import GalleryC from "../../../public/GalleryC.jpg"
import GalleryD from "../../../public/GalleryD.jpg"
import GalleryE from "../../../public/GalleryE.png"
import GalleryF from "../../../public/GalleryF.jpg"

export default function Gallery() {
  return (
    <>
      <div class=" mx-auto px-5 py-2">
        <div class="-m-1 flex flex-wrap md:-m-2">
          <div class="flex w-1/2 flex-wrap">
            <div class="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src={GalleryA}
              />
            </div>
            <div class="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src={GalleryB}
              />
            </div>
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src={GalleryC}
              />
            </div>
          </div>
          <div class="flex w-1/2 flex-wrap">
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src={GalleryD}
              />
            </div>
            <div class="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src={GalleryE}
              />
            </div>
            <div class="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src={GalleryF}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
