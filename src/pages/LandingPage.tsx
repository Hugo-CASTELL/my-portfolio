import {type RefObject, useEffect, useRef, useState} from "react";
import gsap from "../plugins/gsap.ts"
import {gradients} from "../utils/gradients/gradients.ts";

export default function LandingPage() {

  const pinnedContent: string[] = new Array(5).fill("");
  pinnedContent.forEach((_, i) => pinnedContent[i] = gradients[i % gradients.length]);

  //#region State

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  //#endregion State

  //#region Animations

  const pinnedElements: RefObject<HTMLDivElement[]> = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const animate = () => {
      pinnedElements.current.forEach((el, i) => {
        if (!el) return;

        let factor = 1;
        const isHovered = hoveredIndex !== null && i === hoveredIndex;
        const isLeftFromHovered = hoveredIndex !== null && i < hoveredIndex;
        const factorOfSide = (isLeftFromHovered ? -1 : 1)

        if (hoveredIndex !== null) {
            factor = isHovered ? 2 :
                                 1 - Math.abs(i - hoveredIndex) / pinnedElements.current.length;
        }

        gsap.to(el, {
          scale: Math.max(1.0, (factor) * 0.8),
          y: -55 * factor,
          skewX: isHovered ? 0 : factorOfSide * (-12 * factor + 12),
          skewY: isHovered ? 0 : factorOfSide * (-2 * factor + 2),
          duration: 0.3,
          ease: "ease.inOut",
        })
      })
    }

    animate(); // Run once on change
  }, [hoveredIndex]);
  //#endregion Animations

  return (
    <div className="relative flex flex-col h-full">

      <div className={"grow flex flex-col items-center justify-center w-full uppercase text-center font-extrabold tracking-tighter"}>
        <h1 className="text-(length:--title-size) tracking-normal inline-flex items-center gap-8">
          Hello I am
          <div className={"rounded-lg bg-primary text-background p-3"}>Hugo Castell</div>
          this is my
        </h1>
        <div className={"flex justify-between w-full"}>
          <p className={"text-7xl scale-x-115 [writing-mode:vertical-lr]"}>
            Contact
          </p>
          <div className={"relative px-8"}>
            {[0, 1].map((index1) =>
              [0, 1].map((index2) => (
                <div
                  key={`corner-${index1}-${index2}`}
                  className={`absolute w-4 h-4 ${index1 === 0 ? "border-l-2 left-0" : "border-r-2 right-0"} ${index2 === 0 ? "border-t-2 top-0" : "border-b-2 bottom-0"} border-primary`}
                />
              ))
            )}
            <div className={"scale-y-180 origin-center translate-y-3.5"}>
              <h1 className={"text-(length:--very-big-title-size)"}>Portfolio</h1>
            </div>
          </div>
          <p className={"text-7xl scale-x-115 [writing-mode:sideways-lr]"}>
            Github
          </p>
        </div>
      </div>

      <div className={"h-1/3 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] items-center justify-items-center"}>
        {pinnedContent.map((bg, i) => (
          <div key={i+1} className="relative w-full h-full flex items-center justify-center">
            <button
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="absolute inset-0 z-10" />
            <div
              ref={(el) => {
                if (el) pinnedElements.current[i] = el;
              }}
              className={`w-48 aspect-square ${bg} z-0`}
            />
          </div>
        ))}
      </div>

    </div>
  )
}