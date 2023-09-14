import TravelMap from './TravelMap';
import CountryList from './CountryList';
import LoadingSpinner from 'components/core/LoadingSpinner';
import { useUser } from '@clerk/clerk-react';

// backend methods
import { useQuery } from '@tanstack/react-query';
import { fetchUserCountries } from 'api/passport';

const TravelHome = () => {
    const { isLoaded, user } = useUser();

    // Fetch all the user's countries
    const { data: countries } = useQuery({
        queryKey: [user?.id, 'countries'],
        queryFn: () => fetchUserCountries(user?.id),
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        enabled: Boolean(isLoaded && user?.id),
    });

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
