import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const NewCountryButton = () => {
    const navigate = useNavigate();

    const handleNewCountry = () => {
        navigate('/new-country', { firstCountry: false });
    };

    return (
        <Button variant='contained' color='primary' onClick={handleNewCountry} endIcon={<AddIcon />}>
            New Country
        </Button>
    );
};

export default NewCountryButton;
