import Image from "next/image"
import { useEffect, useState } from "react"
import Map, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'


export default function EventMap({evt}) {
    const [lat,SetLat] = useState(null)
    const [lng,SetLng] = useState(null)
    const [loading,SetLoading] = useState(true)
    const [viewport, setViewport] = useState({
        latitude: 37.7577,   //initial values don't matter as they will be geocoded
        longitude: -122.4376,
        width: '100%',
        height: '500px',
        zoom: 14
    });

    

    useEffect(()=>{
        //Get latitude and longitude from address.
        Geocode.fromAddress(evt.address).then(
            (response) => {
                
                const {lat, lng} = response.results[0].geometry.location;
                SetLat(lat)
                SetLng(lng)
                //don't change any of the other properties, only change latitude to lat and longitude to lng setting our state 
                setViewport({...viewport,latitude: lat, longitude:lng })
                SetLoading(false)
            },
            (error) => {
                console.error(error);
            }
        );

    }, [])

  
    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
    

    if(loading) return false  //we don't want anything to happen until the geocoding is complete
    console.log(lat, lng)
  return <Map {...viewport} 
  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} 
  onMove={(vp) => setViewport(vp)} style={{width: 800, height: 400}}
  mapStyle="mapbox://styles/mapbox/streets-v9">
    <Marker key={evt.id} latitude={lat} longitude={lng}> <Image src='/images/pin.svg' width={20} height={20}/>
    </Marker>  </Map>
        
    
 
}
