import apiClient from "./httpCommon";

export const fetchPlayerData = async () => {
    const res = await apiClient.get("/v1/admin/players");
    return res.data;
};