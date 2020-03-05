import React from 'react';
import Card from '../Card/Card';
import './CardList.css';


function CardList(props){
	const obj = props.forecast;
	 
	const cards = Object.keys(obj).map(function(key){
		return <Card class='card' key={key} date={key} temps= {obj[key][key].condition} allTemps = {obj[key][key]}/>
	})
  return (
    <div id='class_list'>
		{cards}
    </div>

  );
}

export default CardList;