import { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import CountrySelector from './CountrySelector';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCountries } from 'api/country';

const NewCountry = () => {
    const params = useParams();
    const firstCountry = params.firstCountry;
    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            let _countries = await fetchCountries();
            _countries = _countries.map((country) => {
                country.value = country.name;
                country.label = country.name;
                return country;
            });
            console.log(_countries);
            setCountryOptions(_countries);
        };
        getCountries();
    }, []);

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
                            countryOptions={countryOptions}
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
