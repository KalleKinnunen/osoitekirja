import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'



export default function Map({ route }) {
    const [view, setView] = useState({ lng: 0, lat: 0 })
    const { add } = route.params.address
    
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=2wPFy3K2lD2vDhMKl3dfrMzVfgMxp6xj&location=${add.address}`

    useEffect(() => {
        async function fetchAddressCoord() {
            let response = await fetch(url)
            let data = await response.json()
            let objekti = await data.results[0].locations[0].latLng
            setView(objekti)
        }
        fetchAddressCoord()
    }, [])

    return (
        <MapView
            style={{ flex: 1, width: '100%', height: 400 }}
            region={{
                latitude: parseFloat(view.lat),
                longitude: parseFloat(view.lng),
                latitudeDelta: 0.00322,
                longitudeDelta: 0.0211
            }}>
            <Marker
                coordinate={{
                    latitude: parseFloat(view.lat),
                    longitude: parseFloat(view.lng)
                }}>
            </Marker>
        </MapView>
    )
}