import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import preload from './content/images/giphy.gif';
import './content/styles/app.css';

import Filter from './sub/filter';
import { YMaps } from 'react-yandex-maps'
import Items from './sub/items';
import Map from './sub/map';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
			spots: null,
      isLoading: true
    }
  }


  getLinks = () => {
    fetch("/obshepit.json", {})
      .then(data => data.json())
      .then(data => {
      	let temp = [];
      	const spots = data.result.entry.map((item, index) => {
      		// const coords = item.yandekskart.center.entry.map(coord=> parseFloat(coord.replace(",", ".")));
					return item.yandekskart.center.entry.map(coord=> parseFloat(coord.replace(",", ".")));
					// debugger
					/*item.yandekskart.center.entry.map((coord) => {
						//temp.push(parseFloat(coord.replace(",", ".")))
					});*/
				});

      	// debugger

        this.setState({ datas: data.result.entry, isLoading: false, spots: spots });
      })
      .catch(e => console.log(e));
  };

  componentDidMount() {
    this.getLinks();
  }

  render() {
    const { datas, isLoading, spots } = this.state;
    //const spotsArray = this.spots(datas);

    if (isLoading) {
      return null;
    }

    return (
			<YMaps version="2.1" query={{apikey: '00e75280-8fc4-4bda-a42b-b3b263a55f72', lang: 'en_RU'}}>
				<Map placemarks={spots} />
			</YMaps>
    )
  }
}

//export default Catalog;
ReactDOM.render(<Catalog/>, document.getElementById('catalog'));

/*
<div className={`catalog ${isLoading ? 'loading' : ''}`}>
				<YMaps version="2.1" query={{apikey: '00e75280-8fc4-4bda-a42b-b3b263a55f72', lang: 'en_RU'}}>
					<Map />

				</YMaps>
        <Filter data={datas} />


        <img className="preloader" src={preload} alt=""/>
      </div>
 */
