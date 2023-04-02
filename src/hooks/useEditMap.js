import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

const editMap = ({mapId, data}) => {
    return apiClient.put(`/v1/admin/maps/${mapId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const useEditMap = () => {
    const queryClient = useQueryClient();

    return useMutation(editMap, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["worldWithMap"]});
        }
    });
};