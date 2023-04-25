import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";
import { useAuth } from "./useAuth";

const addMapToAllPlayers = (token) => ({mapId}) => {
    return apiClient.post(`/v1/admin/maps/${mapId}/add_to_all_players`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export const useAddMapToAllPlayer = () => {
    const { token } = useAuth();

    return useMutation(addMapToAllPlayers(token));
};