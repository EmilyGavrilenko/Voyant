import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CountryCard from './CountryCard';
import NewCountryButton from './NewCountryButton';

const DEFAULT_COUNTRIES = [
    { value: 'USA', label: 'United States', flag: '🇺🇸' },
    { value: 'CAN', label: 'Canada', flag: '🇨🇦' },
    { value: 'GBR', label: 'United Kingdom', flag: '🇬🇧' },
    { value: 'FRA', label: 'France', flag: '🇫🇷' },
    { value: 'UAE', label: 'United Arab Emirates', flag: '🇦🇪' },
];

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

const CountryList = () => {
    const [countryData, setCountryData] = useState(DEFAULT_COUNTRIES);

    return (
        <Box sx={{ width: '50vw' }}>
            <Box sx={{ padding: 5, justifyContent: 'flex-start' }}>
                <CountryStats />
                <Typography variant='h5' sx={{ marginBottom: 1, marginTop: 2 }}>
                    Where you&apos;ve been
                </Typography>
                <NewCountryButton />
                <Grid container spacing={3} sx={{ marginTop: 0 }}>
                    {countryData.map((country) => (
                        <CountryCard key={country.value} name={country.label} flag={country.flag} />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default CountryList;
