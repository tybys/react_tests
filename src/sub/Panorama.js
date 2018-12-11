import React from "react";
import { withYMaps } from "react-yandex-maps";
import '../content/styles/app.css';

class Panorama extends React.Component {
  componentDidMount() {
    this._isMounted = true;
    const { ymaps } = this.props;
    const newplayer = this.props.player;
    const newcoords = this.props.coord;

    if (!ymaps.panorama.isSupported()) return;

    ymaps.panorama.locate(newcoords).done(function(panoramas) {
        if (panoramas.length > 0) {
          new ymaps.panorama.Player(newplayer, panoramas[0], {
            direction: [256, 16]
          });

          //debugger

          let checkExist = setInterval(function() {
            let playerDomNode = document.getElementById(newplayer);
            let canvas = playerDomNode.querySelector('canvas');

            if (canvas !== undefined) {
              //console.log("Exists!");

              canvas.toBlob(function(blob) {
                debugger
                var newImg = document.createElement('img'),
                  url = URL.createObjectURL(blob);

                newImg.onload = function() {
                  // no longer need to read the blob so it's revoked
                  URL.revokeObjectURL(url);
                };

                newImg.src = url;
                document.body.appendChild(newImg);
              });

              clearInterval(checkExist);
            }
          }, 100);

          /*debugger
          let canvas = playerDomNode.querySelector('canvas').toDataURL("image/png");*/
        }
      },
      function(error) {
        alert(error.message);
      }
    )
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
