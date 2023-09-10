import { Container, Typography, Button } from '@mui/material';
import CountrySelector from './CountrySelector';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useParams, useNavigate } from 'react-router-dom';

const NewCountry = () => {
    const params = useParams();
    const firstCountry = params.firstCountry;

    return (
        <div>
            <div style={{ height: '60px', backgroundColor: '#081c2c' }} />
            <Container maxWidth={false} style={{ marginTop: 100, justifyContent: 'center' }}>
                <Typography variant='h2' style={{ margin: 'auto', fontWeight: 'bold', textAlign: 'center' }}>
                    Where have you been?
                </Typography>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', zoom: 1.2, marginTop: 40 }}>
                    <div style={{ width: '600px' }}>
                        <CountrySelector />
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
