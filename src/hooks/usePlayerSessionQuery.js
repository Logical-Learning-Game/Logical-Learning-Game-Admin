import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

export const playerSessionQueryOption = (token, playerId) => ({
    queryKey: ["playerSessions", playerId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerId}/sessions`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    }
});

export const usePlayerSessionQuery = (playerId) => {
    const { token } = useAuth();

    return useQuery(playerSessionQueryOption(token, playerId));
};