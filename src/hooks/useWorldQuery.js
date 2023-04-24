import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

export const worldQueryOption = (token) => ({
    queryKey: ["world"],
    queryFn: async () => {
        const res = await apiClient.get("/v1/admin/worlds", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    }
});

export const useWorldQuery = () => {
    const { token } = useAuth();

    return useQuery(worldQueryOption(token));
};