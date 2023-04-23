import { createBrowserRouter, redirect } from "react-router-dom";
import { queryClient } from "./queryClient";
import PlayerList, { loader as playerListLoader } from "./pages/players";
import PlayerInfo, { loader as playerInfoLoader } from "./pages/players/PlayerInfo";
import SessionInfo from "./pages/players/SessionInfo";
import MapList, { loader as mapListLoader } from "./pages/maps";
import App from "./App";
import TopSubmitInfo from "./pages/players/TopSubmitInfo";
import MapBuilder from "./pages/maps/MapBuilder";
import MapEditor, { loader as mapEditLoader } from "./pages/maps/MapEditor";
import SignIn from "./pages/SignIn";
import Content from "./pages/Content";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/signin",
                element: <SignIn/>,
            },
            {
                path: "/home",
                element: <Content />,
                children: [
                    {
                        path: "players",
                        element: <PlayerList />,
                        loader: playerListLoader(queryClient)
                    },
                    {
                        path: "players/:playerId",
                        element: <PlayerInfo />,
                        loader: playerInfoLoader(queryClient)
                    },
                    {
                        path: "players/:playerId/sessions/:sessionId",
                        element: <SessionInfo />
                    },
                    {
                        path: "players/:playerId/map/:mapForPlayerId/top_submit",
                        element: <TopSubmitInfo />
                    },
                    {
                        path: "maps",
                        element: <MapList />,
                        loader: mapListLoader(queryClient)
                    },
                    {
                        path: "maps/:mapId/edit",
                        element: <MapEditor />,
                        loader: mapEditLoader(queryClient)
                    },
                    {
                        path: "maps/build",
                        element: <MapBuilder />
                    },
                ]
            }
        ]
    }
]);