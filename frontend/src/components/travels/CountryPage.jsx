import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from 'components/core/LoadingSpinner';
import ImageIcon from '@mui/icons-material/Image';
import SuccessPopup from 'components/core/SuccessPopup';

// backend methods
import { fetchCountryData, deleteCountry } from 'api/passport';

function Country() {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [country, setCountry] = useState(location?.state?.countryData);
    const [success, setSuccess] = useState(false);

    let country_id = params.country_id;

    useEffect(() => {
        async function getCountryData() {
            let data = await fetchCountryData(country_id);
            data = { ...data, ...data.country };
            delete data['country'];
            setCountry(data);
        }
        if (!country) {
            getCountryData();
        }
    }, []);

    const onDelete = async () => {
        let success = await deleteCountry(country_id);
        if (success) {
            setSuccess(true);
        } else {
            alert('Error deleting country');
        }
    };

    const onEdit = () => {
        console.log('editing');
    };

    return country ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box width={800} sx={{ mt: '60px', padding: 5, display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h1' component='div'>
                            {country.flag}
                        </Typography>
                        <Box sx={{ ml: 3 }}>
                            <Typography variant='h3' component='div'>
                                {country.name}
                            </Typography>
                            <Typography variant='h7' color='textSecondary'>
                                {country.continent}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant='h7' display='inline' sx={{ fontWeight: 'bold' }}>
                            Visited:{' '}
                        </Typography>
                        <Typography variant='body1' display='inline' color='textSecondary'>
                            {country.date_visited ?? 'No date added'}
                        </Typography>
                    </Box>
                    <Typography variant='h6' component='p' sx={{ mt: 2 }}>
                        About:
                    </Typography>
                    <Typography variant='body1' color='textSecondary' component='p'>
                        {country.about ?? 'No trip details'}
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Button size='large' color='primary' startIcon={<Edit />} onClick={() => onEdit(country)}>
                        Edit
                    </Button>
                    <Button size='large' color='error' startIcon={<Delete />} onClick={onDelete}>
                        Delete
                    </Button>
                </Box>
            </Box>
            <Box sx={{ width: 800 }}>
                <Typography variant='h6' component='p' sx={{ mt: 2, mb: 1 }}>
                    Photos:
                </Typography>
                <ImagePlaceholderGrid />
            </Box>

            <SuccessPopup
                handleClose={() => navigate('/passport')}
                successMsg={'Successfully deleted country'}
                success={success}
            />
        </Box>
    ) : (
        <LoadingSpinner label='Loading details...' />
    );
}

function ImagePlaceholderGrid() {
    // Define the number of placeholders you want
    const placeholders = Array(8).fill(null);

    return (
        <Grid container spacing={3}>
            {placeholders.map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box
                        sx={{
                            width: '100%',
                            paddingTop: '100%',
                            position: 'relative',
                            bgcolor: 'grey.200',
                            borderRadius: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ImageIcon sx={{ color: 'grey.400', width: '50px', height: '50px' }} />
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default Country;
