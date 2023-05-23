import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

const createMap = (token) => ({ data }) => {
    return apiClient.post("/v1/admin/maps", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    });
};

export const useCreateMap = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();

    return useMutation(createMap(token), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["worldWithMap"] });
        }
    });
};