import React from 'react';
import './card.css';
import Clear from '../../Assets/Clear.png';
import Clouds from '../../Assets/Clouds.png';
import Rain from '../../Assets/Rain.png';

function CardList(props){
  	const obj = props.temps;

	const getImage = () =>{
		let image = '' ; 
		Object.keys(obj).forEach(function(key){
			image = obj[key].weather;
		})
		if(image === 'Clear'){
			return <img className='icon' alt='' src={Clear}/>
		}
		if(image === 'Clouds'){
			return <img className='icon' alt=''  src = {Clouds}/>
		}
		if(image === 'Rain'){
			return <img className='icon' alt='' src = {Rain}/>
		} else {
			return <img className='icon' alt='' src={Clear}/>
		}
	}
	const getHighestTemp = (arr) =>{
		let high = arr[0];
		for(let i = 1; i < arr.length ; i++){
			high = Math.max(high, arr[i]);
		}
		return high;
	}
	const getLowestTemp = (arr) =>{
		let low = arr[0];
		for(let i = 1; i< arr.length ; i++){
			low = Math.min(low,arr[i]);
		}
		return low;
	}
	const convertTime = (time) =>{
		
		time = time.split(':'); // convert to array

		// fetch
		let hours = Number(time[0]);
		let minutes = Number(time[1]);
		let seconds = Number(time[2]);

		// calculate
		let timeValue;

		if (hours > 0 && hours <= 12) {
		  timeValue= "" + hours;
		} else if (hours > 12) {
		  timeValue= "" + (hours - 12);
		} else if (hours == 0) {
		  timeValue= "12";
		}
		 
		timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
		// timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;   get seconds option
		timeValue += (hours >= 12) ? " PM " : " AM ";  // get AM/PM

		return timeValue;
	}
	const convertCelsiusToFah = (celsius) =>{
		celsius = Number(celsius);
		let fahrenheit = Math.round((celsius * 9/5) + 32 );
		return fahrenheit;
	}
	const getDayFromDate = (date) =>{
		date=String(date);
		const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let d = new Date(date);
		let dayName = days[d.getDay() + 1];
		//added to fix bug where day was not being returned
		if(!dayName){
			dayName = 'Sunday';
		}
		return dayName;
	}
	//card component
	//todo: make into array because of possible misorder return due to being an object
	const hourlySummary = Object.keys(obj).map(function(key){
		return <div key={key}>
		<p>{convertTime(key)}: {obj[key].description}</p>
		</div>
	})

  return (
    <div className='card'>
    	<div className='cardImage'>{getImage()}</div>
    	<hr/>
    	<strong>{getDayFromDate(props.date)}</strong>
    	<p id='hi'>HI:{convertCelsiusToFah(getHighestTemp(props.allTemps.all_max))}°F </p>
    	<p id= 'low'>LOW:{convertCelsiusToFah(getLowestTemp(props.allTemps.all_min))}°F</p>
    	{hourlySummary}
    </div>

  );
}

export default CardList;