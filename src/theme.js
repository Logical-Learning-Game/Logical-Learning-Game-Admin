import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#7289da",
        },
        secondary: {
            main: "#f50057",
        },
        background: {
            default: "#303030",
            paper: "#424242"
        }
    },
    // typography: {
    //     fontSize: 12,
    //     h1: {
    //         fontSize: 40
    //     },
    //     h2: {
    //         fontSize: 32
    //     },
    //     h3: {
    //         fontSize: 24
    //     },
    //     h4: {
    //         fontSize: 20
    //     },
    //     h5: {
    //         fontSize: 16
    //     },
    //     h6: {
    //         fontSize: 14
    //     },
    // }
});