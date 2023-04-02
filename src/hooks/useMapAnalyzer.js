import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const mapAnalyze = ({data}) => {
    console.log(data);
    return axios.post("http://localhost:5182/api/MapAnalyze", data).then((res) => {
        if (res.status === 200) {
            return res.data;
        }

        console.log(res.status);
        throw new Error("Solution not found");
    });
};

export const useMapAnalyze = () => {
    return useMutation(mapAnalyze);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
};