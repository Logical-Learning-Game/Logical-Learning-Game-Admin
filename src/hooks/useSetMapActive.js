import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

const setMapActive = (token) => ({ mapId, data }) => {
    return apiClient.patch(`/v1/admin/maps/${mapId}/active`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export const useSetMapActive = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();

    return useMutation(setMapActive(token), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["worldWithMap"] });
        }
    });
};