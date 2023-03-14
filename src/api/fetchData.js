import apiClient from "./httpCommon";

export const fetchPlayerData = () => {
    return async () => {
        const res = await apiClient.get("/v1/admin/players");
        return res.data;
    };
};

export const fetchPlayerSessionData = (playerId) => {
    return async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerId}/sessions`);
        return res.data;
    };
};

export const fetchSubmitHistoryData = (sessionId) => {
    return async () => {
        const res = await apiClient.get(`/v1/admin/sessions/${sessionId}/submit_histories`);
        return res.data;
    };
};