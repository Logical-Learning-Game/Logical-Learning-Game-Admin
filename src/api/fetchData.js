import apiClient from "./httpCommon";

export const playerListQueryOption = () => ({
    queryKey: ["playerList"],
    queryFn: async () => {
        const res = await apiClient.get("/v1/admin/players");
        return res.data;
    }
});

export const playerSessionQueryOption = (playerId) => ({
    queryKey: ["playerSessions", playerId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerId}/sessions`);
        return res.data;
    }
});

export const playerMapInfoQueryOption = (playerId) => ({
    queryKey: ["playerMapInfo", playerId],
    queryFn: async () => {
        const res = await apiClient.get(`/v1/admin/players/${playerId}/map/info`);
        return res.data;
    }
});

export const worldQueryOption = () => ({
    queryKey: ["world"],
    queryFn: async () => {
        const res = await apiClient.get("/v1/admin/worlds");
        return res.data;
    }
});

export const worldWithMapQueryOption = () => ({
    queryKey: ["worldWithMap"],
    queryFn: async () => {
        const res = await apiClient.get("/v1/admin/worlds/maps");
        return res.data;
    },
    select: (worlds) => {
        const data = [];

        for (const w of worlds) {
            for (const m of w.maps) {
                let transformedData = {
                    world_id: w.world_id,
                    world_name: w.world_name,
                    ...m
                };

                data.push(transformedData);
            }
        }

        console.log(data);
        return data;
    }
});