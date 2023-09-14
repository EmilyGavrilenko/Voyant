import { postMethod } from 'api/methods';
import { getGeneralHeader } from './auth';

// Label an image using Roboflow
export const labelImageRoboflow = async (imgURL) => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/images/`;
    const error = 'Error labeling image';
    const header = getGeneralHeader();
    // try {
    //     const response = await fetch(backend_url, {
    //         method: 'POST',
    //         body: {imgURL: imgURL},
    //     });

    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }

    //     const data = await response.json();
    //     console.log('Image labeled successfully:', data);
    // } catch (error) {
    //     console.error('Error labeling image:', error);
    // }
    return await postMethod(backend_url, { imgURL: imgURL }, header, error, true);
};

// Upload an image to S3
export const uploadPhotoToS3 = async (image) => {
    return await fetch(process.env.REACT_APP_UPLOAD_IMG_URL + '/images/upload', {
        method: 'POST',
        body: image,
    })
        .then(async (res) => {
            let data = await res.json();
            if (res.status === 200) {
                window.console.log('Successfully saved photo');
                return data.file.url;
            } else {
                console.error('Error saving photo: ', data.msg);
                return null;
            }
        })
        .catch((err) => {
            console.error('Error saving photo');
            console.error(err);
            return null;
        });
};
