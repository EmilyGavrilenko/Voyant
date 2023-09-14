import { Button } from '@mui/material';
const ButtonPrimary = (props) => {
    return (
        <Button variant='contained' color='primary' component='label' {...props}>
            {props.label}
        </Button>
    );
};

export default ButtonPrimary;
