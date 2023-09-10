import { Card, CardContent, Box, Grid, Typography } from '@mui/material';
import moment from 'moment';

const CountryCard = ({ name, flag, date }) => {
    date = new Date();

    return (
        <Grid item sx={{ width: '300px' }}>
            <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h2'>{flag}</Typography>
                    <Box sx={{ marginBottom: 1.5, ml: 1.5 }}>
                        <Typography variant='h6'>{name}</Typography>
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

export default CountryCard;
