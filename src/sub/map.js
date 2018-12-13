import React, {Component} from 'react';
import '../content/styles/app.css';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Baloons from './baloons';

class Ymap extends Component {
	constructor(props) {
		super(props);
// debugger
		this.state = {
			city: {
				center: [45.035470, 38.975313],
				zoom: 10
			},
			spots: props.placemarks
		}
	}


	componentDidMount() {

	}

	componentWillUnmount() {

	}

	// const coords = item.yandekskart.center.entry.map(coord=> parseFloat(coord.replace(",", ".")));
	/*
	<Map defaultState={this.state.city}>
		<Placemark modules={['geoObject.addon.balloon']} defaultGeometry={this.state.city.center} properties={{balloonContentBody:'This is balloon loaded by the Yandex.Maps API module system', }} />
	</Map>
	 */

	render() {
		const spot = this.state.spots;
		if (spot) {
			return (
				<Map defaultState={this.state.city}>
					{
						spot.map((item, index) => {
							return (
								<Placemark key={index} modules={['geoObject.addon.balloon']} defaultGeometry={item} properties={{balloonContentBody:'This is balloon loaded by the Yandex.Maps API module system', }} />
							)
						})
					}
				</Map>
			)
		}
	}
}

export default Ymap;

/*
export default withYMaps(Map, true, [
	"panorama.isSupported",
	"panorama.locate",
	"panorama.Player"
]);*/
