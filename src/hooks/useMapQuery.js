import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

export const mapQueryOption = (mapId) => ({
    queryKey: ["map", mapId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/maps/${mapId}`);
        return res.data;
    }
});

export const useMapQuery = (mapId) => {
    return useQuery(mapQueryOption(mapId));
};