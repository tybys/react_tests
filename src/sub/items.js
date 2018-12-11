import React, {Component} from 'react';
import '../content/styles/app.css';
//import ymaps from 'https://api-maps.yandex.ru/2.1/?apikey=00e75280-8fc4-4bda-a42b-b3b263a55f72&lang=ru_RU'
import { YMaps } from 'react-yandex-maps'
import Panorama from "./Panorama";

function items(props) {
  //let places = props.data.map((item, index) => item.title);

// debugger
  const markup = props.data.map((item, index) => {
    // debugger
    const coords = item.yandekskart.center.entry.map(coord=> parseFloat(coord.replace(",", ".")));
    let player = `player${index}`;

    return (
      <div key={index} className="item" data-x={coords[0]} data-y={coords[1]}>
        {index + 1}
        {item.title}
        {item.adres_street}
        {item.adres_home}

        {item.telefon !== undefined ? item.telefon.entry : ''}
        {/*{panoramas(coords)}*/}
        <div id={player} className="player" />
        <YMaps version="2.1" query={{apikey: '00e75280-8fc4-4bda-a42b-b3b263a55f72', lang: 'en_RU'}}>
          <Panorama player={player} coord={coords} />
        </YMaps>
      </div>
    )
  });

  //debugger

  return (
    markup
  )
}

export default items
