import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

export const worldWithMapQueryOption = () => ({
    queryKey: ["worldWithMap"],
    queryFn: async () => {
        const res = await apiClient.get("/v1/admin/worlds/maps");
        return res.data;
    }
});

export const useWorldWithMapQuery = () => {
    return useQuery(worldWithMapQueryOption());
};