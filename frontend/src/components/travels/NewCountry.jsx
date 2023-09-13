import { useState, useMemo } from 'react';
import { Container, Typography, Button } from '@mui/material';
import CountrySelector from './CountrySelector';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useParams, useNavigate } from 'react-router-dom';

// backend methods
import { useQuery } from '@tanstack/react-query';
import { fetchUserCountries } from 'api/passport';
import { fetchCountries } from 'api/country';

const NewCountry = () => {
    const params = useParams();
    const firstCountry = params.firstCountry;
    const [selectedCountries, setSelectedCountries] = useState([]);

    // Fetch all the user's countries
    const { data: countries, isLoading: isLoading } = useQuery({
        queryKey: ['1', 'countries'],
        queryFn: () => fetchUserCountries(),
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Fetch all the countries in the DB
    const { data: countryOptionsRaw, isLoading: isLoading2 } = useQuery({
        queryKey: ['all countries'],
        queryFn: () => fetchCountries(),
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    });

    const alreadySelected = useMemo(() => countries?.map((country) => country.country.name), [countries]);

    const countryOptions = useMemo(
        () =>
            countryOptionsRaw
                ?.filter((country) => {
                    return country.name !== null && alreadySelected.indexOf(country.name) === -1;
                })
                .map((country) => ({
                    ...country,
                    value: country.name,
                    label: country.name,
                })),
        [countryOptionsRaw]
    );

    return (
        <div>
            <div style={{ height: '60px', backgroundColor: '#081c2c' }} />
            <Container maxWidth={false} style={{ marginTop: 100, justifyContent: 'center' }}>
                <Typography variant='h2' style={{ margin: 'auto', fontWeight: 'bold', textAlign: 'center' }}>
                    Where have you been?
                </Typography>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', zoom: 1.2, marginTop: 40 }}>
                    <div style={{ width: '600px' }}>
                        <CountrySelector
                            countryOptions={countryOptions ?? []}
                            selectedCountries={selectedCountries}
                            setSelectedCountries={setSelectedCountries}
                        />
                        <GetStartedButton firstCountry={firstCountry} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

// Generate a get started button
const GetStartedButton = ({ firstCountry }) => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/passport');
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 40 }}>
            <Button variant='contained' color='primary' onClick={handleNext} endIcon={<NavigateNextIcon />}>
                {firstCountry ? 'Visualize' : 'Add Countries'}
            </Button>
        </div>
    );
};

export default NewCountry;
