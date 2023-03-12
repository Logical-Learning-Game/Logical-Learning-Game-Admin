import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const PlayerInfo = () => {
    const { id } = useParams();

    return (
        <Box m="20px">
            <Header title="PLAYERS INFO" subtitle="Player information" />

            {/* SESSION HISTORIES */}

            {/* SIGNIN HISTORIES */}
        </Box>
    )
}

export default PlayerInfo;