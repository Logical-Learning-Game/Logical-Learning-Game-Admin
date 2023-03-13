import apiClient from "./httpCommon";

export const fetchPlayerData = () => {
    return async () => {
        const res = await apiClient.get("/v1/admin/players");
        return res.data;
    }
};

export const fetchPlayerSessionData = (playerID) => {
    return async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerID}/sessions`)
        return res.data;
    }
};