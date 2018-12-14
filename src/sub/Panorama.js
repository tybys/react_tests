import React from "react";
import {withYMaps} from "react-yandex-maps";
import '../content/styles/app.css';

class Panorama extends React.Component {
	constructor(props) {
		super(props);

		this.ymaps = this.props;
	}

	map(api) {
		if (!api.panorama.isSupported()) return;

		api.ready(function () {

			//debugger
			const mapNode = document.getElementById('map');
			var myMap = new api.Map('map', {
					center: [59.938557, 30.316198],
					zoom: 10,
					controls: []
				}),

				// При клике на метке будет открываться балун,
				// содержащий Яндекс.Панораму в текущей географической точке.
				myPlacemark1 = new api.Placemark([59.938557, 30.316198], {
					// Для данной метки нужно будет открыть воздушную панораму.
					panoLayer: 'yandex#airPanorama'
				}, {
					preset: 'islands#redIcon',
					openEmptyBalloon: true,
					balloonPanelMaxMapArea: 0
				}),

				myPlacemark2 = new api.Placemark([59.900557, 30.44319], {
					// Для этой метки будем запрашивать наземную панораму.
					panoLayer: 'yandex#panorama'
				}, {
					preset: 'islands#nightIcon',
					openEmptyBalloon: true,
					balloonPanelMaxMapArea: 0
				});

			// Функция, устанавливающая для метки макет содержимого ее балуна.
			function setBalloonContentLayout(placemark, panorama) {
				// Создание макета содержимого балуна.
				var BalloonContentLayout = api.templateLayoutFactory.createClass(
					'<div id="panorama" style="width:256px;height:156px"></div>', {
						// Переопределяем функцию build, чтобы при формировании макета
						// создавать в нем плеер панорам.
						build: function () {
							// Сначала вызываем метод build родительского класса.
							BalloonContentLayout.superclass.build.call(this);
							// Добавляем плеер панорам в содержимое балуна.
							this._openPanorama();
						},
						// Аналогично переопределяем функцию clear, чтобы удалять
						// плеер панорам при удалении макета с карты.
						clear: function () {
							this._destroyPanoramaPlayer();
							BalloonContentLayout.superclass.clear.call(this);
						},
						// Добавление плеера панорам.
						_openPanorama: function () {
							if (!this._panoramaPlayer) {
								// Получаем контейнер, в котором будет размещаться наша панорама.
								var el = this.getParentElement().querySelector('#panorama');
								this._panoramaPlayer = new api.panorama.Player(el, panorama, {
									controls: ['panoramaName']
								});
							}
						},
						// Удаление плеера панорамы.
						_destroyPanoramaPlayer: function () {
							if (this._panoramaPlayer) {
								this._panoramaPlayer.destroy();
								this._panoramaPlayer = null;
							}
						}
					});
				// Устанавливаем созданный макет в опции метки.
				placemark.options.set('balloonContentLayout', BalloonContentLayout);
			}

		});
	}

	panorama(api, params) {
		// debugger
		const coord = this.props.coord;
		const player = this.props.player;
		if (!api.panorama.isSupported()) return;

		let map = new Promise((resolve, reject) => {
			api.panorama.locate(coord).done((panoramas) => {
					if (panoramas.length > 0) {
						new api.panorama.Player(player, panoramas[0], {
							direction: [256, 16]
						});

						resolve(document.getElementById(player))
					}
				}
			)
		});

		map.then((data) => {
			debugger
			/*let checkExist = setInterval(function() {
					let playerDomNode = data;
					let canvas = playerDomNode.querySelector('canvas');

					if (canvas !== undefined) {
							//console.log("Exists!");

								html2canvas(playerDomNode).then(canvas => {
										document.body.appendChild(canvas)
								})

							clearInterval(checkExist);
					}
			}, 0);*/

			//checkExist();

		})
	}

	componentDidMount() {
		this._isMounted = true;
		const {ymaps} = this.props;

		//this.panorama(ymaps);
		this.map(ymaps);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return null;
	}
}

export default withYMaps(Panorama, true, [
	"panorama.isSupported",
	"panorama.locate",
	"panorama.Player"
]);
