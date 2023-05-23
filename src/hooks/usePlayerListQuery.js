import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

export const playerListQueryOption = (token) => ({
    queryKey: ["playerList"],
    queryFn: async () => {
        const res = await apiClient.get("/v1/admin/players", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    }
});

export const usePlayerListQuery = () => {
    const { token } = useAuth();

    return useQuery(playerListQueryOption(token));
};