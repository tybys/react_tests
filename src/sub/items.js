import React, {Component} from 'react';
import '../content/styles/app.css';

class Items extends Component {
  render() {
		let categores = this.props.data.map((item, index) => item.tippred);
		categores = [... new Set(categores)];

		const category = categores.map((item, index) =>
      <div key={index}>
        <h2>{item}</h2>
        <div>
					{
					  this.props.data.map((_item, _index) => {
							if (_item.tippred == item) {
							  return (
									<div key={_index}>{_item.title}</div>
                )
              }
            })
					}
        </div>
      </div>
    );

		return(
      <div>
				{category}
      </div>
    )
  }
}

export default Items

/*
<sup><strong>{index + 1}</strong></sup>&nbsp;
{item.title}&nbsp;
{item.adres_street}&nbsp;
{item.adres_home}&nbsp;

{item.telefon !== undefined ? item.telefon.entry : ''}

const markup = this.props.data.map((item, index) => {
			//const coords = item.yandekskart.center.entry.map(coord=> parseFloat(coord.replace(",", ".")));

			// debugger

			return (
				<div key={index} data-type={item.tippred} className="item">
          <h2>item</h2>
				</div>
			)
		});
 */