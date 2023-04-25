import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

const createWorld = (token) => ({ data }) => {
    return apiClient.post("/v1/admin/worlds", data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export const useCreateWorld = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();

    return useMutation(createWorld(token), {
        onSuccess: () => {
            queryClient.invalidateQueries("world");
        }
    });
};