// MapComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline} from 'react-native-maps';
import PlacesAutoComplete from './PlacesAutoComplete';
import Geolocation from '@react-native-community/geolocation';


const MapComponent = (props) => {

    const {pickUp , drop} = props

    const mapViewRef = useRef(null);
    const [currentLocation , setCurrentLocation] = useState(null)
    const [polyMarkerPoints , setPolyMarkerPoints] = useState([])

    useEffect(() => {
      setCurrentLocation({ latitude : pickUp.latitude, longitude : pickUp.longitude });
      setPolyMarkerPoints([
        {
          latitude : pickUp.latitude,
          longitude  : pickUp.longitude
        },
        {
          latitude : drop.latitude,
          longitude  : drop.longitude
        },
      ])
        //Set RN COnfiguration
        // Geolocation.setRNConfiguration(
        //     config = {
        //       skipPermissionRequests: false,
        //       authorizationLevel : 'whenInUse',
        //       enableBackgroundLocationUpdates : false,
        //       locationProvider : 'auto'
        //     }
        //   )
        // // Get the current location
        // Geolocation.getCurrentPosition(
        //   (position) => {
        //     console.log('CURRENT LOCATION ',position)
        //     const { latitude, longitude } = position.coords;
        //     setCurrentLocation({ latitude, longitude });
        //   },
        //   (error) => {
        //     console.log(error.code, error.message);
        //   },
        //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        // );
      }, [pickUp , drop]);

    const onMapReady = () => {
        // Coordinates of your markers
        const coordinates = [
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
            // Add other marker coordinates as needed
        ];

        // Fit the map to the provided coordinates
        mapViewRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 150, right: 50, left: 50 },
            animated: true,
        });
    };

    return (
        <View style={styles.container}>
           {currentLocation ?  <MapView
                ref={mapViewRef}
                style={{...styles.map , ...props.mapStyle}}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.004,
                }}
                onMapReady={onMapReady}
            >
                {pickUp && <Marker
                    coordinate={{ latitude: pickUp.latitude, longitude: pickUp.longitude }}
                    title="Initial Title"
                    description={pickUp?.description}
                    style={{ height: 10, width: 1 }}
                />}
                {drop && <Marker
                    coordinate={{ latitude: drop.latitude, longitude: drop.longitude }}
                    title="Initial Title"
                    description={drop?.description}
                    style={{ height: 10, width: 1 }}
                />}
                {polyMarkerPoints[0].latitude!==null && <Polyline 
                  coordinates={polyMarkerPoints}
                  strokeWidth={3}
                  strokeColor='red'
                />}
            </MapView> :  <ActivityIndicator />}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
    },
    map:{
        height:450,
    }
});

export default MapComponent;
