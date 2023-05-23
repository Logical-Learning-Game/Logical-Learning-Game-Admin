import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

const editMap = (token) => ({ mapId, data }) => {
    return apiClient.put(`/v1/admin/maps/${mapId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    });
};

export const useEditMap = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();

    return useMutation(editMap(token), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["worldWithMap"] });
        }
    });
};