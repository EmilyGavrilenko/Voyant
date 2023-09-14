import { Card, CardContent, Box, Grid, Typography } from '@mui/material';
import moment from 'moment';

const CountryCard = ({ country, date, navigateToCountry }) => {
    date = new Date();

    return (
        <Grid item sx={{ width: '300px' }}>
            <Card onClick={() => navigateToCountry(country)} sx={styles.card}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h2'>{country.flag}</Typography>
                    <Box sx={{ marginBottom: 1.5, ml: 1.5 }}>
                        <Typography variant='h6'>{country.name}</Typography>
                        {date && (
                            <Typography variant='body2' color='textSecondary' component='p'>
                                Visited: {moment(date).format('MMM. YYYY')}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

const styles = {
    card: {
        transition: 'all 0.3s',
        '&:hover': {
            backgroundColor: '#f5f5f5', // Change to desired hover color
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Add a shadow effect on hover
            cursor: 'pointer',
        },
        '&:active': {
            transform: 'scale(1.1)', // Slight scale effect on click
        },
    },
};

export default CountryCard;
