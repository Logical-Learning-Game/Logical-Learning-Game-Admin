import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

export const mapQueryOption = (token, mapId) => ({
    queryKey: ["map", mapId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/maps/${mapId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    }
});

export const useMapQuery = (mapId) => {
    const { token } = useAuth();

    return useQuery(mapQueryOption(token, mapId));
};