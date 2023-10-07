import React, {useState, useEffect} from 'react';

import {YMaps, Map} from "@pbe/react-yandex-maps";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function YMap(props) {

    const [location, setLocation] = useState([0.0, 0.0])

    const loc = () => {
        setLocation([60.938448, 76.558161])
    }

    useEffect(() =>{
        loc()
    }, [location])

    return (
        <div className='cdek-map'>
            <YMaps>
                <div>
                    <Map
                        defaultState={{
                            center: location,
                            zoom: 10,
                            controls: ["zoomControl", "fullscreenControl"],
                        }}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}
                    >
                    </Map>
                </div>
            </YMaps>
        </div>
    );
}

export default YMap;