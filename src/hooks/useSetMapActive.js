import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

const setMapActive = ({mapId, data}) => {
    return apiClient.patch(`/v1/admin/maps/${mapId}/active`, data);
};

export const useSetMapActive = () => {
    const queryClient = useQueryClient();

    return useMutation(setMapActive, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["worldWithMap"]});
        }
    });
};