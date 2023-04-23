import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

export const signInHistoriesQueryOption = (playerId) => ({
    queryKey: ["signInHistories", playerId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerId}/sign_in_histories`);
        return res.data;
    },
    select: (data) => data.map((d, idx) => ({
        id: idx,
        signInDatetime: d
    }))
});

export const useSignInHistoriesQuery = (playerId) => {
    return useQuery(signInHistoriesQueryOption(playerId));
};