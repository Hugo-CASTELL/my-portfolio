import gsap from "../../plugins/gsap.ts"
import {gradients} from "../gradients/gradients.ts";

export const revealerID = "revealer";
export const subRevealerID = (n: number) => `sub-revealer${n}`;
export const subRevealCount = gradients.length;
export const revealDuration = 1.0;

export const triggerReveal = (skipFirstPart?: boolean) => {

  const timeline = gsap.timeline()

  timeline
    .add("start")

  timeline.to(
    `#${revealerID}`,
    {
      display: "flex",
    },
    "start"
  )

  if(!skipFirstPart) {
    timeline
      .add("middle", `start+=${revealDuration / 2 + revealDuration / 2 * 0.2}`)

    for (let i = 0; i < subRevealCount; i++) {
      timeline.fromTo(
        `#${subRevealerID(i)}`,
        {
          y: window.outerHeight,
        },
        {
          y: 0,
          duration: revealDuration / 2 * 0.8,
          ease: "ease.in",
        },
        `start+=${0.1 * i}`
      )
    }
  }

  for (let i = 0; i < subRevealCount; i++) {
    timeline.fromTo(
      `#${subRevealerID(i)}`,
      {
        height: window.outerHeight,
      },
      {
        height: 0,
        duration: revealDuration / 2 * 0.8,
        ease: "ease.in",
      },
      `${skipFirstPart ? 'start' : 'middle'}+=${0.1 * i}`
    )
  }

  timeline.eventCallback("onComplete", () => {
    gsap.to(
      `#${revealerID}`,
      {
        display: "none",
        duration: 0.001,
      }
    )
  })

}
