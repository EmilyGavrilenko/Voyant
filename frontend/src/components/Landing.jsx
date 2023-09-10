import React from 'react';
import GlobeVideo from 'assets/spinning-globe.mov';

const Landing = () => {
    return (
        <div style={{ overflow: 'hidden' }}>
            {/* Video Container */}
            <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
                <video
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        zIndex: '-100',
                    }}
                    autoPlay
                    loop
                    muted
                >
                    <source src={GlobeVideo} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default Landing;
