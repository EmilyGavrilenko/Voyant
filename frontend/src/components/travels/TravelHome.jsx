import TravelMap from './TravelMap';
import CountryList from './CountryList';

// backend methods
import { useQuery } from '@tanstack/react-query';
import { fetchUserCountries } from 'api/passport';
import LoadingSpinner from 'components/core/LoadingSpinner';

const TravelHome = () => {
    // Fetch all the user's countries
    const { data: countries } = useQuery({
        queryKey: ['1', 'countries'],
        queryFn: () => fetchUserCountries(),
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    });

    console.log('countries', countries);

    return (
        <div>
            <div style={{ height: '60px', backgroundColor: '#081c2c' }} />
            {!countries ? (
                <LoadingSpinner label='Loading passport...' />
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
