import React, {useState, useEffect} from 'react';

import {YMaps, Map, Placemark, ObjectManager} from "@pbe/react-yandex-maps";
import {Button} from "react-bootstrap";
import axios from "axios";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

import logo from '../icons/unfort-logo.svg';

function YMap({city, sdek, setAddress}) {

    const API_KEY_GEOCODER = 'e78621dd-a747-4466-9d44-ddbfcae2ef00'
    const API_KEY_ORG_SEARCH = 'b6b3d74a-33bb-4328-bbfb-cdf3359f798d'

    const [location, setLocation] = useState([55.75399399999374, 37.62209300000001])
    const [loc, setLoc] = useState('')
    const [coordinates, setCoordinates] = useState()
    const [orgCoordinates, setOrgCoordinates] = useState()

    const [test, setTest] = useState('')

    const balloonHandler = async () => {
        let balloonBtn = await document.getElementsByClassName('balloon-button')
        setAddress(balloonBtn[0]?.id)
    }

    useEffect(() => {
        async function geoCoder() {
            const {data} = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_GEOCODER}&geocode=${city ? city : 'Москва'}&format=json`)
            await setLoc(data.response.GeoObjectCollection.featureMember[0].GeoObject?.Point.pos)
            await setCoordinates(loc !== '' ? (loc?.split(' ')?.reverse()) : location)
            // setLocation([coordinates[1], coordinates[0]])
        }

        async function orgSearch() {
            const {data} = await axios.get(`https://search-maps.yandex.ru/v1/?text=СДЭК,${city ? city : 'Москва'}&type=biz&lang=ru_RU&apikey=${API_KEY_ORG_SEARCH}`)
            await setOrgCoordinates(data.features)
            // console.log(orgCoordinates)
        }

        // geoCoder()
        async function go() {
            await geoCoder()
            await orgSearch()
            // await balloonHandler()
        }

        go()

        // console.log(orgCoordinates)
        // console.log(coordinates)
        // console.log(city)
    }, [city])

    // const searchControl = Map.controls.get('searchControl');
    // console.log(searchControl)

    return sdek && (
        <div className='cdek-map'>
            <YMaps>
                <div>
                    <Map
                        width="500px"
                        height="500px"
                        defaultState={{
                            center: coordinates ? coordinates : location,
                            zoom: 13,
                            controls: ["zoomControl"],
                        }}
                        modules={["control.ZoomControl", 'geoObject.addon.balloon']}
                    >
                        {
                            orgCoordinates?.map((coord) => {
                                return <Placemark
                                    onClick={balloonHandler}
                                    key={orgCoordinates.indexOf(coord)}
                                    geometry={coord.geometry.coordinates.reverse()}
                                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                    properties={{
                                        balloonContent: `
                                            <div class="balloon">
                                                <div class="balloon-header">Адрес: ${coord.properties.description}</div>
                                                <div class="balloon-body" style="opacity: 0">
                                                    <button id='${coord.properties.description}' class='size-btn btn btn-dark balloon-button' style='width: 100%' type="button">Выбрать</button>
                                                </div>
                                                <div class="balloon-footer">
                                                    Время работы: ${coord.properties.CompanyMetaData.Hours.text}
                                                    <br>
                                                    Телефон: ${coord.properties.CompanyMetaData.Phones?.map((phone) => (phone.formatted))}
                                                </div>
                                            </div>
                                        `,
                                        // balloonContentHeader : "123",
                                        // balloonContentBody: "123",
                                        // balloonContentFooter: "123",
                                    }}
                                    options={{
                                        // openEmptyBalloon: true,
                                        // cursor: 'pointer',
                                        hasBalloon: true,
                                        iconLayout: 'default#image',
                                        iconImageHref: logo,
                                        iconImageSize: [40, 40],
                                        openBalloonOnClick: true,
                                        unselectable: false,
                                    }}
                                />
                                // console.log(coord.properties.CompanyMetaData.Phones?.map((phone) => (phone.formatted)))
                            })
                        }
                    </Map>
                </div>
            </YMaps>
        </div>
    );
}

export default YMap;