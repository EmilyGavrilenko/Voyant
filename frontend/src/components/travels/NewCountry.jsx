import { useState, useMemo } from 'react';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CountrySelector from './CountrySelector';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SuccessPopup from 'components/core/SuccessPopup';

// backend methods
import { useQuery } from '@tanstack/react-query';
import { fetchUserCountries, addUserCountries } from 'api/passport';
import { fetchCountries } from 'api/country';

const NewCountry = () => {
    const params = useParams();
    const navigate = useNavigate();

    const firstCountry = params.firstCountry;
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [success, setSuccess] = useState(false);

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
                        <GetStartedButton
                            firstCountry={firstCountry}
                            selectedCountries={selectedCountries}
                            setSuccess={setSuccess}
                        />
                    </div>
                </div>
                <SuccessPopup
                    handleClose={() => navigate('/passport')}
                    successMsg={'Successfully added country(s)'}
                    success={success}
                />
            </Container>
        </div>
    );
};

// Generate a get started button
const GetStartedButton = ({ firstCountry, selectedCountries, setSuccess }) => {
    const [saving, setSaving] = useState(false);
    const buttonText = firstCountry ? 'Visualize' : 'Add Countries';

    const handleNext = async () => {
        const countries = selectedCountries.map((country) => ({
            country_id: country['iso3'],
        }));
        setSaving(true);
        let added = await addUserCountries(countries);
        setSaving(false);
        setSuccess();
        if (added) {
            setSuccess(true);
        } else {
            alert('Error adding countries');
        }
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 40 }}>
            <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                endIcon={saving ? null : <NavigateNextIcon />}
            >
                {saving ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        Saving
                        <CircularProgress sx={{ color: 'white', ml: 1 }} size={18} />
                    </div>
                ) : (
                    buttonText
                )}
            </Button>
        </div>
    );
};

export default NewCountry;
