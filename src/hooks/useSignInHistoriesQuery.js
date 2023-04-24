import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

export const signInHistoriesQueryOption = (token, playerId) => ({
    queryKey: ["signInHistories", playerId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerId}/sign_in_histories`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    },
    select: (data) => data.map((d, idx) => ({
        id: idx,
        signInDatetime: d
    }))
});

export const useSignInHistoriesQuery = (playerId) => {
    const {token} = useAuth();
    
    return useQuery(signInHistoriesQueryOption(token, playerId));
};