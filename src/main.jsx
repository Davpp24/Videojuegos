import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import "./index.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import Games from "./pages/videogames/Games"
import GamesDetails, { loader as gameDetailsLoader } from "./pages/GamesDetails/GamesDetails"
import Publishers from "./pages/GamesDetails/publisher/Publisher"
import PublisherDetails from "./pages/GamesDetails/publisher/PublisherDetails"
import GenerPage from "./pages/GamesDetails/genero/genero"
import ErrorPage from "./pages/ErrorPage/ErrorPage"

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "gamesDetails/:id",
        element: <GamesDetails />,
        loader: gameDetailsLoader,
      },
      {
        path: "publisher",
        element: <Publishers />,
      },
      {
        path: "publisherDetails/:id",
        element: <PublisherDetails />,
      },
      {
        path: "genres/:genreId",
        element: <GenerPage />,
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

