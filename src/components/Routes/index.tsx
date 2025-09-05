import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../../Pages/Home";
import Profile from "../../Pages/Profile";
import PerfilNaoEncontrado from "../../templates/PerfilDesconhecido";

export default function MainRoute() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
            errorElement: <PerfilNaoEncontrado />
        },
        {
            path: "/profile/:usuario",
            element: <Profile />,
            errorElement: "Not found"
        }
    ])

    return <RouterProvider router={routes} />
}