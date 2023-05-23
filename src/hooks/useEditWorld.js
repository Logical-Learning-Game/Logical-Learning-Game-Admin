import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

const editWorld = (token) => ({ worldId, data }) => {
    return apiClient.put(`/v1/admin/worlds/${worldId}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
};

export const useEditWorld = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();

    return useMutation(editWorld(token), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["world", "worldWithMap"] });
        }
    });
};