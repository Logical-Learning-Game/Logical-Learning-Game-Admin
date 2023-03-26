import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/httpCommon";

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
        return data;
    }
});

export const useWorldWithMapQuery = () => {
    return useQuery(worldWithMapQueryOption());
};