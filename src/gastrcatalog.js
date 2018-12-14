import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import preload from './content/images/giphy.gif';
import './content/styles/app.css';

import Filter from './sub/filter';
import Items from './sub/items';

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
					return item.yandekskart.center.entry.map(coord=> parseFloat(coord.replace(",", ".")));
				});

        this.setState({ datas: data.result.entry, isLoading: false, spots: spots });
      })
      .catch(e => console.log(e));
  };

  componentDidMount() {
    this.getLinks();
  }

  render() {
    const { datas, isLoading, spots } = this.state;

    if (isLoading) {
      return null;
    }

    return (
			<div className={`catalog ${isLoading ? 'loading' : ''}`}>
				<Filter data={datas} />

				<div className="list">
					<Items data={datas} />
				</div>


				<img className="preloader" src={preload} alt=""/>
			</div>
    )
  }
}

ReactDOM.render(<Catalog/>, document.getElementById('catalog'));