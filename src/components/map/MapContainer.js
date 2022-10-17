// MapContainer.js

import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = () => {
    console.log(kakao);
    // useEffect(() => {
    //     const container = document.querySelector('.myMap');
	// 	const options = {
	// 		center: new kakao.maps.LatLng(33.450701, 126.570667),
	// 		level: 3
	// 	};
    //     const map = new kakao.maps.Map(container, options);
    //     console.log(map);
    // }, []);

    return (
        <div className='myMap' style={{
            width: '500px', 
            height: '500px'
        }}></div>
    );
}

export default MapContainer; 