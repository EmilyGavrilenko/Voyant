import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ label }) => (
    <Box
        sx={{
            width: '100%',
            height: 'calc(100vh - 60px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        {label && (
            <Typography variant='h5' sx={{ mb: 3 }}>
                {label}
            </Typography>
        )}
        <CircularProgress />
    </Box>
);

export default LoadingSpinner;
