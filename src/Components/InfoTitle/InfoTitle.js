import React from 'react';
import './InfoTitle.css';


function InfoTitle(props){
	const convertCelsiusToFah = (celsius) =>{
		celsius = Number(celsius);
		let fahrenheit = Math.round((celsius * 9/5) + 32 );
		return fahrenheit;
	}
  return (
    <div id='descriptionBlock'>
    	<p id='currentTemp'>{convertCelsiusToFah(props.todayForecast.all_temp[0])}°F</p><br/><br/>
    	<h1>{props.location.city}, {props.location.zip}</h1>
    	<p className = 'Description'> Currently {props.todayForecast.condition[props.time].description} </p>
    </div>
  );
}

export default InfoTitle;
