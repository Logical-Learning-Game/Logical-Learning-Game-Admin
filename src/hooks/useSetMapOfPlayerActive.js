import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

const setMapOfPlayerActive = (token) => ({ playerId, mapId, data }) => {
    return apiClient.patch(`/v1/admin/players/${playerId}/map/${mapId}/active`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export const useSetMapOfPlayerActive = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();

    return useMutation(setMapOfPlayerActive(token), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playerMapInfo"] });
        }
    });
};