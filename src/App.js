import React, {useState} from 'react';
import './App.css';
import Title from './Components/Title/Title' ; 
import Input from './Components/Input/Input' ; 
import InfoTitle from './Components/InfoTitle/InfoTitle' ; 
import CardList from './Components/CardList/CardList' ; 

function App(){

//states
  let [input, setInput] = useState('');
  let [forecast, setForecast] = useState (null);
  let [date, setDate] = useState(null);
  let [time, setTime] = useState(null);
  let [location, setLocation] = useState({});
  let [error, setError] = useState('');

 //api key
 const API_KEY= '8a4dd592f4335f6214b13ef8678445a5';

const getWeatherInfo = async(e) =>{
    e.preventDefault();
    const zipcode = e.target.zipcode.value;
    //condition check for input
    if(e.target.zipcode.value === ''){
      return; 
    }
    //promise
    try{
      const apiCall = await fetch (`http://api.openweathermap.org/data/2.5/forecast?zip=${e.target.zipcode.value}&appid=${API_KEY}&units=metric`);
      const data = await apiCall.json(); 
      const formattedData = formatData(data, zipcode);
      setForecast(formattedData);
      //if an error existed prev, get rid of it
      if (error){
        setError(null);
      }
    } catch(err){
      setError(err);
    }  
}

const formatData = (data, zipcode) => {
  const location = data.city.name;
  const obj = {};
  for(let i = 0 ; i < data.list.length ; i++){
    let date = data.list[i].dt_txt.split(" ")[0];
    let time = data.list[i].dt_txt.split(" ")[1]; 
    if(i===0){
      setDate(date);
      setTime(time);
      setLocation({
        zip:zipcode,
        city: location
      });
    }
    
    //add object if it doesn't exist with formatting
    if(!obj[date]){
      obj[date] = {
        [date]:{
          condition:{
            //data is to display hour by hour information on a day to day basis if needed
            [time]: {
              temp: data.list[i].main.temp,
              temp_min: data.list[i].main.temp_min,
              temp_max:data.list[i].main.temp_max,
              weather:data.list[i].weather[0].main,
              description:data.list[i].weather[0].description
            }
          },
          //data is to find the hi's and lows of days if needed
          all_max:[data.list[i].main.temp_max],
          all_min:[data.list[i].main.temp_min],
          all_temp:[data.list[i].main.temp]
        }
      }
    } else{
      //go into the object and edit data
      obj[date][date].all_max.push(data.list[i].main.temp_max);
      obj[date][date].all_min.push(data.list[i].main.temp_min);
      obj[date][date].all_temp.push(data.list[i].main.temp);
      obj[date][date].condition[time] = {
        temp: data.list[i].main.temp,
        temp_min: data.list[i].main.temp_min,
        temp_max:data.list[i].main.temp_max,
        weather:data.list[i].weather[0].main,
        description:data.list[i].weather[0].description
      }
    }
  }
  return obj;
}
  return (
    //if there is nothing in forcast , aka user didnt submit request
    !forecast ?
    <div key='appstart' className= 'forecast'>
        <Title/>
        <Input getInput={getWeatherInfo} />
        {error ? <div className = 'error'> error please check input</div> : <div></div>}
    </div>
    :
    <div key='appuse' className= 'forecast'>
        <InfoTitle location = {location} time = {time}todayForecast = {forecast[date][date]}/>
        <Input getInput={getWeatherInfo} />
        <CardList forecast = {forecast}/>
        {error ?  <div className = 'error'> error please check input</div> : <div></div>}
    </div>
  );
}

export default App;
