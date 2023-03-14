import { createBrowserRouter } from "react-router-dom";
import { queryClient } from "./queryClient";
import PlayerList, { loader as playerListLoader } from "./pages/players";
import PlayerInfo, { loader as playerInfoLoader } from "./pages/players/PlayerInfo";
import SessionInfo, {loader as sessionInfoLoader} from "./pages/players/SessionInfo";
import App from "./App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
                element: <SessionInfo/>,
                loader: sessionInfoLoader(queryClient)
            }
        ]
    }
]);