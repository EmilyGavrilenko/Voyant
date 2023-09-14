import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const TravelMap = ({ width, height, countries }) => {
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
        const map = new mapboxgl.Map({
            container: 'map',
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

            // Color countries
            countries?.forEach((country) => {
                map.addLayer({
                    id: country.country['iso3'],
                    type: 'fill',
                    source: 'countries',
                    'source-layer': 'country_boundaries',
                    paint: {
                        'fill-color': '#FF5733',
                        'fill-opacity': 0.6,
                    },
                    filter: ['==', 'iso_3166_1_alpha_3', country.country['iso3']],
                });
            });

            // Spin Globe
            map.on('style.load', () => {
                map.setFog({}); // Set the default atmosphere style
            });

            // The following values can be changed to control rotation speed:

            // At low zooms, complete a revolution every two minutes.
            const secondsPerRevolution = 80;
            // Above zoom level 5, do not rotate.
            const maxSpinZoom = 5;
            // Rotate at intermediate speeds between zoom levels 3 and 5.
            const slowSpinZoom = 3;

            let userInteracting = false;
            let spinEnabled = true;

            function spinGlobe() {
                const zoom = map.getZoom();
                if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
                    let distancePerSecond = 360 / secondsPerRevolution;
                    if (zoom > slowSpinZoom) {
                        // Slow spinning at higher zooms
                        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                        distancePerSecond *= zoomDif;
                    }
                    const center = map.getCenter();
                    center.lng -= distancePerSecond;
                    // Smoothly animate the map over one second.
                    // When this animation is complete, it calls a 'moveend' event.
                    map.easeTo({ center, duration: 1000, easing: (n) => n });
                }
            }

            // Pause spinning on interaction
            map.on('mousedown', () => {
                userInteracting = true;
            });

            // Restart spinning the globe when interaction is complete
            map.on('mouseup', () => {
                userInteracting = false;
                spinGlobe();
            });

            // These events account for cases where the mouse has moved
            // off the map, so 'mouseup' will not be fired.
            map.on('dragend', () => {
                userInteracting = false;
                spinGlobe();
            });
            map.on('pitchend', () => {
                userInteracting = false;
                spinGlobe();
            });
            map.on('rotateend', () => {
                userInteracting = false;
                spinGlobe();
            });

            // When animation is complete, start spinning if there is no ongoing interaction
            map.on('moveend', () => {
                spinGlobe();
            });

            spinGlobe();
        });
    }, []);

    return (
        <div
            id='map'
            style={{ width: width ?? '50vw', height: height ?? '50vh', position: 'fixed', top: 60, right: 0 }}
        ></div>
    );
};

export default TravelMap;
