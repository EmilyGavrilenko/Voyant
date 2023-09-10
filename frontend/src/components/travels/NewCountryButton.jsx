import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NewCountryButton = () => {
    const handleButtonClick = () => {
        console.log('New Country button clicked');
    };

    return (
        <Button variant='contained' color='primary' onClick={handleButtonClick} endIcon={<AddIcon />}>
            New Country
        </Button>
    );
};

export default NewCountryButton;
