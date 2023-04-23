import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

const setMapOfPlayerActive = ({playerId, mapId, data}) => {
    return apiClient.patch(`/v1/admin/players/${playerId}/map/${mapId}/active`, data);
};

export const useSetMapOfPlayerActive = () => {
    const queryClient = useQueryClient();

    return useMutation(setMapOfPlayerActive, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["playerMapInfo"]});
        }
    });
};