import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

export const worldQueryOption = () => ({
    queryKey: ["world"],
    queryFn: async () => {
        const res = await apiClient.get("/v1/admin/worlds");
        return res.data;
    }
});

export const useWorldQuery = () => {
    return useQuery(worldQueryOption())
};