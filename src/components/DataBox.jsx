import { Box, Typography } from "@mui/material";

const DataBox = ({ title, contentComponent, sx, disableContentPadding }) => {
    return (
        <Box
            height="auto"
            boxShadow="0px 2px 4px 0 rgba(0, 0, 0, 0.2)"
            backgroundColor="background.paper"
            sx={sx}
        >
            <Box
                px={3}
                py={2}
                backgroundColor="primary.dark"
            >
                <Typography variant="h5" fontWeight="bold">
                    {title}
                </Typography>
            </Box>

            <Box p={!disableContentPadding ? 3 : undefined}>
                {contentComponent}
            </Box>
        </Box>
    );
};

export default DataBox;