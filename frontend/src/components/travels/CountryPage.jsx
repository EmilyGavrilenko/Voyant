import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from 'components/core/LoadingSpinner';
import ImageIcon from '@mui/icons-material/Image';
import SuccessPopup from 'components/core/SuccessPopup';
import MonthYearPicker from 'components/core/MonthYearPicker';
import { formatDate } from 'utils/datetime';
import { useUser } from '@clerk/clerk-react';

// backend methods
import { fetchCountryData, deleteCountry, saveCountry } from 'api/passport';

function Country() {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();
    const user_id = user?.id;

    const [country, setCountry] = useState(location?.state?.countryData);
    const [success, setSuccess] = useState(false);
    const [editing, setEditing] = useState(false);
    const [updatedFields, setUpdatedFields] = useState({});

    let country_id = params.country_id;

    useEffect(() => {
        async function getCountryData() {
            let data = await fetchCountryData(country_id, user_id);
            data = { ...data, ...data.country };
            delete data['country'];
            setCountry(data);
        }
        if (!country && user_id) {
            getCountryData();
        }
    }, [user_id]);

    const onDelete = async () => {
        let success = await deleteCountry(country_id, user_id);
        if (success) {
            setSuccess(true);
        } else {
            alert('Error deleting country');
        }
    };

    const onEdit = () => {
        console.log('editing');
        setEditing(true);
    };

    const onSave = async () => {
        console.log(updatedFields);
        let success = await saveCountry(country_id, updatedFields, user_id);
        console.log('success', success);
        if (success) {
            console.log({ ...country, ...updatedFields });
            setCountry({ ...country, ...updatedFields });
        }
        setEditing(false);
    };

    return country ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box width={800} sx={{ mt: '60px', padding: 5, pb: 0, display: 'flex', justifyContent: 'space-between' }}>
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
                </Box>
                {editing ? (
                    <Box sx={{ mt: 2 }}>
                        <Button size='large' color='primary' endIcon={<Save />} onClick={() => onSave()}>
                            Save
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ mt: 2 }}>
                        <Button size='large' color='primary' endIcon={<Edit />} onClick={() => onEdit()}>
                            Edit
                        </Button>
                        <Button size='large' color='error' endIcon={<Delete />} onClick={onDelete}>
                            Delete
                        </Button>
                    </Box>
                )}
            </Box>
            <Box sx={{ width: 800 }}>
                <Box sx={{ mt: 1 }}>
                    <Typography
                        variant='h7'
                        display={editing ? 'block' : 'inline'}
                        sx={{ fontWeight: 'bold', mb: editing ? 1 : 0 }}
                    >
                        Visited:{' '}
                    </Typography>
                    {editing ? (
                        <MonthYearPicker
                            updateDate={(newValue) => setUpdatedFields({ ...updatedFields, date_visited: newValue })}
                        />
                    ) : (
                        <Typography variant='body1' display='inline' color='textSecondary'>
                            {country.date_visited ? formatDate(country.date_visited) : 'No date added'}
                        </Typography>
                    )}
                </Box>
                <Typography variant='h6' component='p' sx={{ mt: 2 }}>
                    About:
                </Typography>
                {editing ? (
                    <TextField
                        label={null}
                        multiline
                        rows={4}
                        variant='outlined'
                        value={updatedFields.about ?? country.about ?? ''}
                        sx={{ width: 800 }}
                        onChange={(e) => setUpdatedFields({ ...updatedFields, about: e.target.value })}
                    />
                ) : (
                    <Typography variant='body1' color='textSecondary' component='p'>
                        {country.about ?? 'No trip details'}
                    </Typography>
                )}
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
