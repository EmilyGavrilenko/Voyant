import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import CountrySelector from '../travels/CountrySelector';

const Countries = () => {
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
        const map = new mapboxgl.Map({
            container: 'map',
            // style: 'mapbox://styles/mapbox/light-v11',
            style: 'mapbox://styles/emilee11/clmci63rr014t01rfc83mg2lt',
            center: [-102.049723, 36.963329],
            zoom: 1.5,
            projection: 'globe',
        });
        map.addControl(new mapboxgl.FullscreenControl());

        map.on('load', () => {
            map.addSource('countries', {
                type: 'vector',
                url: 'mapbox://mapbox.country-boundaries-v1',
            });

            // USA
            map.addLayer({
                id: 'usa-background',
                type: 'fill',
                source: 'countries',
                'source-layer': 'country_boundaries',
                paint: {
                    'fill-color': '#FF5733',
                    'fill-opacity': 0.7,
                },
                filter: ['==', 'iso_3166_1_alpha_3', 'USA'],
            });
        });
    }, []);

    return (
        <div>
            <div style={{ height: '60px', backgroundColor: '#081c2c' }} />P
            <div style={{ display: 'flex' }}>
                <div id='map' style={{ width: '70%', height: '70vh' }}></div>
                <CountrySelector />
            </div>
        </div>
    );
};

export default Countries;
