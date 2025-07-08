import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage.tsx"
import ProjectsPage from "./pages/ProjectsPage.tsx"
import type { ReactElement } from "react"
import NavBar from "./utils/components/main/NavBar.tsx"
import Revealer from "./utils/components/main/Revealer.tsx"

export interface RouteWrapper {
  title: string
  path: string
  element: ReactElement
}

export default function App() {
  const routes: RouteWrapper[] = [
    {
      title: "Career development",
      path: "/career-development",
      element: <ProjectsPage />,
    },
    { title: "Blog", path: "/blog", element: <ProjectsPage /> },
    { title: "About me", path: "/about-me", element: <ProjectsPage /> },
    { title: "Home", path: "/", element: <LandingPage /> },
    { title: "Projects", path: "/projects", element: <ProjectsPage /> },
    {
      title: "Mobility",
      path: "/international-mobility",
      element: <ProjectsPage />,
    },
    {
      title: "Civic engagement",
      path: "/civic-engagement",
      element: <ProjectsPage />,
    },
  ]

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-font-primary">
      {/* Revealer */}
      <Revealer />

      {/* Navigation */}
      <div className={"h-[5%] w-full"}>
        <NavBar routes={routes} />
      </div>

      {/* Content */}
      <div className={"h-[95%] w-full"}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  )
}
