import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {

    return (
        <Box mb={3}>
            <Typography
                variant="h4" 
                fontWeight="bold" 
                sx={{ mb: 1 }}
            >
                {title}
            </Typography>
            <Typography variant="subtitle1" color="secondary.light">{subtitle}</Typography>
        </Box>
    );
};

export default Header;