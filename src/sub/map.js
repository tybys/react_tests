import React, {Component} from 'react';
import '../content/styles/app.css';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Baloons from './baloons';

class Ymap extends Component {
	constructor(props) {
		super(props);
//debugger
		this.state = {
			city: {
				center: [45.035470, 38.975313],
				zoom: 10
			},
			marks: props.spots
		}
	}


	componentDidMount() {

	}

	componentWillUnmount() {

	}

	prepareCoords(coords) {
		return coords.map(coord=> parseFloat(coord.replace(",", ".")));
	}

	makeBaloon(array) {

		debugger

		var placemark = array;
		// Координаты точки, для которой будем запрашивать панораму.
		var coords = placemark.geometry.getCoordinates();
		// Тип панорамы (воздушная или наземная).
		var panoLayer = placemark.properties.get('panoLayer');

		placemark.properties.set('balloonContent', "Идет проверка на наличие панорамы...");

		// Запрашиваем объект панорамы.
		ymaps.panorama.locate(coords, {
			layer: panoLayer
		}).then(
			function (panoramas) {
				if (panoramas.length) {
					// Устанавливаем для балуна макет, содержащий найденную панораму.
					setBalloonContentLayout(placemark, panoramas[0]);
				} else {
					// Если панорам не нашлось, задаем
					// в содержимом балуна простой текст.
					placemark.properties.set('balloonContent', "Для данной точки панорамы нет.");
				}
			},
			function (err) {
				placemark.properties.set('balloonContent',
					"При попытке открыть панораму произошла ошибка: " + err.toString());
			}
		);
	}

	// const coords = item.yandekskart.center.entry.map(coord=> parseFloat(coord.replace(",", ".")));
	/*
	<Map defaultState={this.state.city}>
		<Placemark modules={['geoObject.addon.balloon']} defaultGeometry={this.state.city.center} properties={{balloonContentBody:'This is balloon loaded by the Yandex.Maps API module system', }} />
	</Map>
	 */

	render() {

		//const spot = this.state.spots;
		const spot = this.state.marks;

		if (spot) {
			return (
				<Map defaultState={this.state.city}>
					{
						spot.map((item, index) => {
							const coords = this.prepareCoords(item.yandekskart.center.entry);

							return (
								<Placemark key={index} modules={['geoObject.addon.balloon']} defaultGeometry={coords} properties={this.makeBaloon(coords)} />
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
