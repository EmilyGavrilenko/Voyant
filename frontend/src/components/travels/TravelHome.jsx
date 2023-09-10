import TravelMap from './TravelMap';
import CountryList from './CountryList';

const TravelHome = () => {
    return (
        <div>
            <div style={{ height: '60px', backgroundColor: '#081c2c' }} />
            <div style={{ display: 'flex' }}>
                <CountryList />
                <TravelMap width='50vw' height='calc(100vh - 60px)' />
            </div>
        </div>
    );
};

export default TravelHome;
