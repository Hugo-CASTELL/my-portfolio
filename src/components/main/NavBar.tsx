import {Link} from "react-router-dom";
import type {RouteWrapper} from "../../App.tsx";

interface NavBarProps {
  routes: RouteWrapper[];
}

export default function NavBar(props: Readonly<NavBarProps>) {
  return (
    <nav className={"relative w-full flex items-center justify-center"}>
      {/* Navigation Links */}
      <ul className="py-4 flex space-x-4">
        {props.routes.map((route) =>
          <li key={route.path}>
            <Link
              to={route.path}
              className={"text-(length:--subtitle-size) font-bold"}
            >
              {route.title}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}