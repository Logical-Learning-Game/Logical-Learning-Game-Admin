import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

export const playerListQueryOption = () => ({
    queryKey: ["playerList"],
    queryFn: async () => {
        const res = await apiClient.get("/v1/admin/players");
        return res.data;
    }
});

export const usePlayerListQuery = () => {
    return useQuery(playerListQueryOption());
};