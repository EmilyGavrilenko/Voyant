import { CircularProgress, Typography } from '@mui/material';
import TravelMap from './TravelMap';
import CountryList from './CountryList';

// backend methods
import { useQuery } from '@tanstack/react-query';
import { fetchUserCountries } from 'api/passport';

const TravelHome = () => {
    // Fetch all the user's countries
    const { data: countries, isLoading: isLoading } = useQuery({
        queryKey: ['1', 'countries'],
        queryFn: () => fetchUserCountries(),
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    });

    return (
        <div>
            <div style={{ height: '60px', backgroundColor: '#081c2c' }} />
            {isLoading ? (
                <div
                    style={{
                        width: '100%',
                        height: 'calc(100vh - 60px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='h5' sx={{ mb: 3 }}>
                        Loading passport...
                    </Typography>
                    <CircularProgress />
                </div>
            ) : (
                <div style={{ display: 'flex' }}>
                    <CountryList countries={countries} />
                    <TravelMap width='50vw' height='calc(100vh - 60px)' countries={countries} />
                </div>
            )}
        </div>
    );
};

export default TravelHome;
