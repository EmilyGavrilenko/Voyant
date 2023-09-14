import { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const NewImageButton = ({ sx, shouldNavigate, handleNewImages }) => {
    const navigate = useNavigate();
    const handleSelectImage = (event) => {
        const files = event.target.files;
        if (shouldNavigate) navigate('/upload-images', { state: { files } });
        else handleNewImages(files);
    };

    return (
        <Button variant='contained' color='primary' component='label' sx={sx} endIcon={<AddIcon />}>
            Upload Images
            <input type='file' accept='image/*' hidden multiple onChange={handleSelectImage} />
        </Button>
    );
};

export default NewImageButton;
