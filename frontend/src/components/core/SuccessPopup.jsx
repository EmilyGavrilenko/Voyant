import { Snackbar, Alert } from '@mui/material';

const SuccessPopup = ({ handleClose, successMsg, success }) => {
    return (
        <Snackbar
            open={success}
            autoHideDuration={1000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity='success' variant='filled'>
                {successMsg ?? 'This is a success message!'}
            </Alert>
        </Snackbar>
    );
};

export default SuccessPopup;
