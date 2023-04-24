import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

const createWorld = ({ data }) => {
    return apiClient.post("/v1/admin/worlds", data);
};

export const useCreateWorld = () => {
    const queryClient = useQueryClient();

    return useMutation(createWorld, {
        onSuccess: () => {
            queryClient.invalidateQueries("world");
        }
    });
};