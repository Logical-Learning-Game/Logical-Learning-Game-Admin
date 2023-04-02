import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

const createMap = ({data}) => {
    return apiClient.post("/v1/admin/maps", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const useCreateMap = () => {
    const queryClient = useQueryClient();

    return useMutation(createMap, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["worldWithMap"]});
        }
    });
};