import {useNavigate} from "react-router-dom";
import type {RouteWrapper} from "../../../App.tsx";
import {revealDuration, triggerReveal} from "../../animations/reveal.ts";

interface NavBarProps {
  routes: RouteWrapper[];
}

export default function NavBar(props: Readonly<NavBarProps>) {
  const navigate = useNavigate();

  const fakeNavigation = (path: string) => {
   triggerReveal();
   setTimeout(() => navigate(path), revealDuration / 2 * 1000);
  }


  return (
    <nav className={"relative w-full flex items-center justify-center"}>
      {/* Navigation Links */}
      <ul className="py-4 flex space-x-4">
        {props.routes.map((route) =>
          <li key={route.path}>
            <button
              onClick={() => fakeNavigation(route.path)}
              className={"text-(length:--subtitle-size) font-bold"}
            >
              {route.title}
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}