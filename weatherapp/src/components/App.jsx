import React, { useState} from 'react'
import LanguagePicker from './LanguagePicker'
import Header from './Header'
import Form from './Form'
import Result from './Result'
import './style/App.css'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function App() {
  const [whatLang, setwhatLang] = useState('pl');
  const [whatValue, setwhatValue] = useState('');
  const [typeSearch, settypeSearch] = useState(true);
  const [coords, setCoords] = useState([50.08, 19.92]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [windDirection, setWindDirection] = useState('');
  const [pressure, setPressure] = useState('');
  const [fellTemp, setFellTemp] = useState('');
  const [cloud, setCloud] = useState('');
  const [condition, setCondition] = useState('');
  const [clickedCoords, setClickerCoords] = useState([50.08, 19.92]);
  const [units, setUnits] = useState([true, true, true]);
  const [tempUnits, setTempUnits] = useState([true, true, true]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    const API_key = "a4a243b7bf9c44e5a59133510233009";
    const API = `https://api.weatherapi.com/v1/current.json?key=${API_key}&q=${(typeSearch?whatValue:clickedCoords)}&lang=${whatLang}`;
    fetch(API).then(response => {
      if(response.ok){
        return response
      }throw Error("City not found")
    })
    .then(response => response.json())
    .then(result => {
      setUnits(tempUnits);
      setClickerCoords([result.location.lat, result.location.lon]);
      setCoords([result.location.lat, result.location.lon]);
      setCity(result.location.name);
      setCountry(result.location.country);
      setDate(result.location.localtime);
      setTemperature(tempUnits[0]?result.current.temp_c:result.current.temp_f);
      setWindSpeed(tempUnits[1]?result.current.wind_kph:result.current.wind_mph);
      setWindDirection(result.current.wind_dir);
      setPressure(tempUnits[2]?result.current.pressure_mb:result.current.pressure_in);
      setFellTemp(tempUnits[0]?result.current.feelslike_c:result.current.feelslike_f);
      setCloud(result.current.cloud);
      setCondition(result.current.condition.icon);
    })
    .catch(err => console.log(err))
    
  }

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        const temp = [e.latlng.lat.toFixed(2), e.latlng.lng.toFixed(2)];
        setClickerCoords(temp);
      },
    });
  };

  const UnitsSet = (num) =>{
    let temp = [...tempUnits];
    temp[num] = !temp[num];
    setTempUnits(temp);
  }

  return (
    <div className='App'>
      <LanguagePicker lang={whatLang} changLang={() => setwhatLang(whatLang==='pl'?'en':'pl')}/>
      <Header lang={whatLang}/>
      <Form value={whatValue} 
      lang={whatLang} 
      change={(e) => setwhatValue(e.target.value)} 
      TypeSearch={typeSearch} 
      changeTypeSearch={() => settypeSearch(!typeSearch)} 
      coords={clickedCoords}
      submit={handleSubmit} 
      units={tempUnits}
      changUnits={UnitsSet} />
      <main>
        {(city===''?null:(
          <Result 
          country={country}
          city={city}
          date={date}
          coords={coords}
          temperature={temperature}
          windSpeed={windSpeed}
          windDirection={windDirection}
          pressure={pressure}
          fellTemp={fellTemp}
          cloud={cloud}
          condition={condition}
          lang={whatLang}
          units={units}
          />
        ))}
        <div className='Maps'>
          <MapContainer center={clickedCoords} zoom={11} style={{ width: '100%', height: '100%' }}>
          <ChangeView center={clickedCoords} zoom={11}/>
          {(!typeSearch?<LocationFinderDummy />:null)}
            <TileLayer
              url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
              maxZoom={18}
              id="mapbox/streets-v11"
              tileSize={512}
              zoomOffset={-1}
              accessToken="pk.eyJ1Ijoia2FtaWx3MTIzIiwiYSI6ImNsbjc3eHR3cjA5OXUya3J0aXVuOWl0M2QifQ.Dw5hwmjuUlTiV2Y_bjWCrg"
            />
              <Marker position={clickedCoords} icon={customIcon}>
                <Popup>
                  {city}
                </Popup>
              </Marker>
          </MapContainer>
        </div>
      </main>
    </div>
  )
}
