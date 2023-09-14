import React, { useState } from 'react';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import SuccessPopup from 'components/core/SuccessPopup';
import NewImageButton from './NewImageButton';
import ButtonPrimary from 'components/core/ButtonPrimary';
import { Save, DocumentScanner } from '@mui/icons-material';

// backend methods
import { uploadPhotoToS3, labelImageRoboflow } from 'api/image';

function Country() {
    const location = useLocation();
    const [images, setImages] = useState(location?.state?.files ?? []);
    let imgsExist = images.length > 0;

    console.log('images', images);

    const handleNewImages = (files) => {
        setImages([...images, ...files]);
    };

    const labelImages = async () => {
        if (images.length === 0) return;
        let image = images[0];

        const formData = new FormData();
        formData.append('image', image);

        let imgUrl = await uploadPhotoToS3(formData);
        // let imgUrl = 'https://voyant-image-bucket.s3.us-west-2.amazonaws.com/photos/1694699137320.jpeg'
        console.log('imgUrl', imgUrl);
        if (!imgUrl) return;
        let response = await labelImageRoboflow(imgUrl);
        console.log('response', response);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '60px' }}>
            <Box sx={{ width: 800 }}>
                <Typography variant='h6' component='p' sx={{ mt: 5, mb: 1 }}>
                    Uploaded Images:
                </Typography>
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <NewImageButton handleNewImages={handleNewImages} />
                    <ButtonPrimary
                        disabled={!imgsExist}
                        sx={{ ml: 1 }}
                        label='Label Images'
                        endIcon={<DocumentScanner />}
                        onClick={labelImages}
                    />
                    {/* <ButtonPrimary disabled={!imgsExist} sx={{ ml: 1 }} label='Save' endIcon={<Save />} /> */}
                </Box>
                <ImageGrid images={images} />
            </Box>
        </Box>
    );
}

function ImageGrid({ images }) {
    return (
        <Grid container spacing={3}>
            {images?.map((image, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box
                        sx={{
                            width: '100%',
                            paddingTop: '100%',
                            position: 'relative',
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
                                overflow: 'hidden',
                                borderRadius: '10px',
                            }}
                        >
                            {
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt='New image'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            }
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default Country;
