import { Box, Typography, Grid } from '@mui/material';
import CountryCard from './CountryCard';
import NewCountryButton from './NewCountryButton';

const CountryStats = () => {
    return (
        <Box>
            <Typography variant='h5' sx={{ marginBottom: 1 }}>
                My Stats
            </Typography>
            <Typography>5 Countries, 2 Continents</Typography>
        </Box>
    );
};

const CountryList = ({ countries }) => {
    return (
        <Box sx={{ width: '50vw' }}>
            <Box sx={{ padding: 5, justifyContent: 'flex-start' }}>
                <CountryStats />
                <Typography variant='h5' sx={{ marginBottom: 1, marginTop: 2 }}>
                    Where you&apos;ve been
                </Typography>
                <NewCountryButton />
                <Grid container spacing={3} sx={{ marginTop: 0 }}>
                    {countries?.map((data) => (
                        <CountryCard key={data.country.iso3} name={data.country.name} flag={data.country.flag} />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default CountryList;
