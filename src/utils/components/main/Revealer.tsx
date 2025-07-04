import {revealerID, subRevealerID, triggerReveal} from "../../animations/reveal.ts";
import {gradients} from "../../gradients/gradients.ts";
import {useEffect} from "react";

export default function Revealer() {

  useEffect(() => {
    triggerReveal(true);
  }, [])

  return (
    <div id={revealerID} className={`absolute inset-0 z-10 flex`}>
      {gradients.map((gradient, i) =>
        <div key={gradient} id={subRevealerID(i)} className={`${gradient} bg-blend-color-dodge h-full w-full`} />
      )}
    </div>
  );
}