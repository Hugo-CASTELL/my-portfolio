import {useLocation, useNavigate} from "react-router-dom";
import type {RouteWrapper} from "../../../App.tsx";
import {revealDuration, triggerReveal} from "../../animations/reveal.ts";
import {gradients} from "../../gradients/gradients.ts";

interface ArrowProps {
  action: () => void;
  rotation: number;
}

function Arrow(props: Readonly<ArrowProps>) {
  return (
    <button
      onClick={props.action}
      className="relative">
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24"
           fill="currentColor"
           className={`size-4 -mt-0.5 cursor-pointer`}
      >
        <path d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003Z" transform={`rotate(${props.rotation}, 12, 12)`} />
      </svg>
    </button>
  )
}

interface NavBarProps {
  routes: RouteWrapper[];
}

export default function NavBar(props: Readonly<NavBarProps>) {
  const location = useLocation();
  const navigate = useNavigate();

  const fakeNavigation = (path: string) => {
   triggerReveal();
   setTimeout(() => navigate(path), revealDuration / 2 * 1000);
  }

  const nextPath = (left: boolean) => {
    const currentIndex = props.routes.findIndex(route => route.path === location.pathname);
    const move = left ? -1 : 1;
    return props.routes[(currentIndex + move + props.routes.length) % props.routes.length].path;
  }

  return (
    <nav className={"relative w-full flex items-center justify-center gap-8"}>
      {/* Left arrow */}
      <Arrow action={() => fakeNavigation(nextPath(true))} rotation={-90} />

      {/* Navigation Links */}
      <ul className="flex">
        {props.routes.map((route, i) =>
          <li key={route.path} className={"relative flex items-center justify-center group"}>
            <button
              onClick={() => fakeNavigation(route.path)}
              className="absolute inset-0 z-20 cursor-pointer" />
              <p className={"relative z-10 m-4 text-(length:--subtitle-size) font-bold"}>{route.title}</p>
              <div className={`absolute bottom-1/5 left-1/10 z-0 ${gradients[i % gradients.length]} bg-blend-color-dodge h-1 ` +
                              (location.pathname === route.path ? "w-8/10" :
                                                                  "w-0 transition-all duration-450 ease-in-out group-hover:w-8/10")} />
          </li>
        )}
      </ul>

      {/* Right arrow */}
      <Arrow action={() => fakeNavigation(nextPath(false))} rotation={90} />
    </nav>
  )
}