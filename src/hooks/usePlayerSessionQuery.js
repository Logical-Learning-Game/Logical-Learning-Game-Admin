import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

export const playerSessionQueryOption = (playerId) => ({
    queryKey: ["playerSessions", playerId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerId}/sessions`);
        return res.data;
    }
});

export const usePlayerSessionQuery = (playerId) => {
    return useQuery(playerSessionQueryOption(playerId));
};