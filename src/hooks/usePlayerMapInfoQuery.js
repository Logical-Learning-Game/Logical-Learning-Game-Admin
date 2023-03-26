import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

export const playerMapInfoQueryOption = (playerId) => ({
    queryKey: ["playerMapInfo", playerId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerId}/map/info`);
        return res.data;
    }
});

export const usePlayerMapInfoQuery = (playerId) => {
    return useQuery(playerMapInfoQueryOption(playerId));
};