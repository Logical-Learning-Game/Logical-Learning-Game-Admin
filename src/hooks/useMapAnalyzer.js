import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const mapAnalyze = async ({data}) => {
    console.log(data);
    const res = await axios.post(`${process.env.REACT_APP_MAP_ANALYZER_API_URL}/api/MapAnalyze`, data);

    if (res.status === 200) {
        return {...res.data, found: true};
    } else if (res.status === 204) {
        const error = new Error("Solution not found");
        error.code = res.status;
        throw error;
    } else if (res.status === 504) {
        const error = new Error("Timeout");
        error.code = res.status;
        throw error;
    }
};

export const useMapAnalyze = () => {
    return useMutation(mapAnalyze);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
};