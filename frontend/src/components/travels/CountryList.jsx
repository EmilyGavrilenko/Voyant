import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import pluralize from 'pluralize';
import CountryCard from './CountryCard';
import NewCountryButton from './NewCountryButton';
import NewImageButton from './NewImageButton';

const CountryStats = ({ numCountries, numContinents }) => {
    return (
        <Box>
            <Typography variant='h5' sx={{ marginBottom: 1 }}>
                My Stats
            </Typography>
            <Typography>
                {numCountries} {pluralize('Country', numCountries)} , {numContinents}{' '}
                {pluralize('Continents', numContinents)}
            </Typography>
        </Box>
    );
};

const CountryList = ({ countries }) => {
    const navigate = useNavigate();
    const numCountries = countries?.length;
    const numContinents = new Set(countries?.map((country) => country.country.continent)).size;

    const navigateToCountry = (country) => {
        navigate(`/country/${country['iso3']}`, { state: { countryData: country } });
    };

    return (
        <Box sx={{ width: '50vw' }}>
            <Box sx={{ padding: 5, justifyContent: 'flex-start' }}>
                <CountryStats numCountries={numCountries} numContinents={numContinents} />
                <Typography variant='h5' sx={{ marginBottom: 1, marginTop: 2 }}>
                    Where you&apos;ve been
                </Typography>
                <NewCountryButton />
                <NewImageButton sx={{ ml: 1 }} shouldNavigate />
                <Grid container spacing={3} sx={{ marginTop: 0 }}>
                    {countries?.map((data) => (
                        <CountryCard
                            key={data.country.iso3}
                            country={{ ...data, ...data.country }}
                            navigateToCountry={navigateToCountry}
                        />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default CountryList;
