import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

const editWorld = ({worldId, data}) => {
    return apiClient.put(`/v1/admin/worlds/${worldId}`, data)
};

export const useEditWorld = () => {
    const queryClient = useQueryClient();

    return useMutation(editWorld, {
        onSuccess: () => {
            queryClient.invalidateQueries("world");
        }
    });
};