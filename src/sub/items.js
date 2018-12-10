import React, {Component} from 'react';
import '../content/styles/app.css';
//import ymaps from 'https://api-maps.yandex.ru/2.1/?apikey=00e75280-8fc4-4bda-a42b-b3b263a55f72&lang=ru_RU'
fetch('https://api-maps.yandex.ru/2.1/?apikey=00e75280-8fc4-4bda-a42b-b3b263a55f72&lang=ru_RU').then(() => {
  const ymaps = global.ymaps;

  var locateRequest = ymaps.panorama.locate([55.83403, 37.623370]);

  locateRequest.then(
    function (panoramas) {
      if (panoramas.length) {
        console.log("Ура, нашлась панорама " + panoramas[0]);
      } else {
        console.log("Для заданной точки не найдено ни одной панорамы.");
      }
    },
    function (err) {
      console.log("При попытке получить панораму возникла ошибка.");
    }
  );
  debugger
});
//console.log(window.ymaps.panorama)
function panoramas(coordinates) {
  //debugger


  /*var locateRequest = window.ymaps.panorama.locate(coordinates);

  locateRequest.then(
    function (panoramas) {
      if (panoramas.length) {
        console.log("Ура, нашлась панорама " + panoramas[0]);
      } else {
        console.log("Для заданной точки не найдено ни одной панорамы.");
      }
    },
    function (err) {
      console.log("При попытке получить панораму возникла ошибка.");
    }
  );*/
}

function items(props) {
  //let places = props.data.map((item, index) => item.title);

// debugger
  const markup = props.data.map((item, index) => {
    // debugger
    const coords = item.yandekskart.center.entry;

    return (
      <div key={index} className="item" data-x={coords[0]} data-y={coords[1]}>
        {index + 1}
        {item.title}
        {item.adres_street}
        {item.adres_home}

        {item.telefon !== undefined ? item.telefon.entry : ''}
        {/*{panoramas(coords)}*/}
      </div>
    )
  });

  //debugger

  return (
    markup
  )
}

export default items
