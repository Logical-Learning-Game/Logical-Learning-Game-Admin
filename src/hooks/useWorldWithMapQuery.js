import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

export const worldWithMapQueryOption = (token) => ({
    queryKey: ["worldWithMap"],
    queryFn: async () => {
        const res = await apiClient.get("/v1/admin/worlds/maps", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    }
});

export const useWorldWithMapQuery = () => {
    const {token} = useAuth();

    return useQuery(worldWithMapQueryOption(token));
};