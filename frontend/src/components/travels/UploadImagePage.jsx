import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLocation } from 'react-router-dom';
import NewImageButton from './NewImageButton';
import { DocumentScanner } from '@mui/icons-material';

// backend methods
import { uploadPhotoToS3, labelImageRoboflow } from 'api/image';

function Country() {
    const location = useLocation();
    const [images, setImages] = useState(location?.state?.files ?? []);
    const [labeling, setLabeling] = useState(false);
    const [labelImageIndex, setLabelImageIndex] = useState(false);
    const [labeledImageIndexes, setLabeledImageIndexes] = useState([]);
    const [imageLabels, setImageLabels] = useState({});

    console.log('images', images);
    console.log('imageLabels', imageLabels);

    const handleNewImages = (files) => {
        setImages([...images, ...files]);
    };

    const handleLabelImage = async (image) => {
        if (labeling) return;

        const imgIndex = images.indexOf(image);
        const formData = new FormData();
        formData.append('image', image);
        setLabeling(true);
        setLabelImageIndex(imgIndex);

        let imgUrl = await uploadPhotoToS3(formData);
        console.log('imgUrl', imgUrl);
        if (!imgUrl) return;
        let response = await labelImageRoboflow(imgUrl);
        console.log('response', response);
        setLabeling(false);
        if (!response?.data) {
            alert('Error labeling image');
        }
        let predictions = response.data.predictions;
        if (!predictions || predictions.length === 0) {
            setImageLabels({ ...imageLabels, [imgIndex]: { prediction: null, imgUrl } });
            setLabeledImageIndexes([...labeledImageIndexes, imgIndex]);
            alert('No country flags identified');
        } else {
            processImageLabels(predictions, imgUrl, imgIndex);
        }
    };

    const processImageLabels = (predictions, imgUrl, imgIndex) => {
        let maxConfidence = Math.max(...predictions.map((prediction) => prediction.confidence));
        let maxConfidencePrediction = predictions.find((prediction) => prediction.confidence === maxConfidence);
        setImageLabels({ ...imageLabels, [imgIndex]: { prediction: maxConfidencePrediction, imgUrl } });
        setLabeledImageIndexes([...labeledImageIndexes, imgIndex]);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '60px', mb: '60px' }}>
            <Box sx={{ width: 800 }}>
                <Typography variant='h6' component='p' sx={{ mt: 5, mb: 1 }}>
                    Uploaded Images:
                </Typography>
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <NewImageButton handleNewImages={handleNewImages} />
                </Box>
                <ImageGrid
                    images={images}
                    handleLabelImage={handleLabelImage}
                    labeling={labeling}
                    labelImageIndex={labelImageIndex}
                    labeledImageIndexes={labeledImageIndexes}
                    imageLabels={imageLabels}
                />
            </Box>
        </Box>
    );
}

function round(num, places) {
    return Math.round(num * 10 ** places) / 10 ** places;
}

function ImageGrid({ images, handleLabelImage, labeling, labelImageIndex, labeledImageIndexes, imageLabels }) {
    return (
        <Grid container spacing={3}>
            {images?.map((image, index) => {
                let isLabeled = labeledImageIndexes.includes(index);
                let labeledPrediction = imageLabels[index]?.prediction;
                return (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            height: '300px',
                        }}
                    >
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
                        <LoadingButton
                            disabled={(labeling && !(labelImageIndex === index)) || isLabeled}
                            loading={labeling && labelImageIndex === index}
                            sx={{ mt: 1 }}
                            size='small'
                            variant='contained'
                            endIcon={isLabeled ? null : <DocumentScanner />}
                            onClick={() => handleLabelImage(image)}
                        >
                            {isLabeled ? 'Labeled' : 'Label Image'}
                        </LoadingButton>
                        {isLabeled && (
                            <Box sx={{ mt: 1 }}>
                                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                                    Country:
                                </Typography>
                                {labeledPrediction ? (
                                    <Typography variant='body2'>
                                        {labeledPrediction.class}: {round(labeledPrediction.confidence, 2)}%
                                    </Typography>
                                ) : (
                                    <Typography variant='body2'>No flags found</Typography>
                                )}
                            </Box>
                        )}
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default Country;
