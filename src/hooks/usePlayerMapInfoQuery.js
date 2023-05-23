import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

export const playerMapInfoQueryOption = (token, playerId) => ({
    queryKey: ["playerMapInfo", playerId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerId}/map/info`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    }
});

export const usePlayerMapInfoQuery = (playerId) => {
    const { token } = useAuth();

    return useQuery(playerMapInfoQueryOption(token, playerId));
};