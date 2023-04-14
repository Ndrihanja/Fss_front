import { Route, useRoutes } from "react-router-dom"
import PrivateRoutes from './utils/PrivateRoutes'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Dossier from "./features/dossier/Dossier"
import NewDossier from './features/dossier/new-dossier/NewDossier'
import SteppedDossier from "./features/dossier/stepped-dossier/SteppedDossier"
import Client from './features/client/Client'
import NewClient from "./features/client/new-client/NewClient"
import Agent from './features/agent/Agent'
import NewAgent from './features/agent/new-agent/NewAgent'

function Routes() {
    let element = useRoutes([
        {
            element: <PrivateRoutes />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/dossier", element: <Dossier /> },
                { path: "/dossier/nouveau", element: <NewDossier /> },
                { path: "/dossier/:slug", element: <SteppedDossier /> },

                { path: "/client", element: <Client /> },
                { path: "/client/nouveau", element: <NewClient /> },

                { path: "/agent", element: <Agent /> },
                { path: "/agent/nouveau", element: <NewAgent /> },
            ]
        },
        { path: "/login", element: <Login /> }
    ])

    return element
}

export default Routes