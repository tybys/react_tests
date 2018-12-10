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
      isLoading: true
    };
  }


  getLinks = () => {
    fetch("/obshepit.json", {})
      .then(data => data.json())
      .then(data => {
        this.setState({ datas: data.result.entry, isLoading: false });
      })
      .catch(e => console.log(e));
  };

  componentDidMount() {
    this.getLinks();
  }

  render() {
    const { datas, isLoading } = this.state;

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

//export default Catalog;
ReactDOM.render(<Catalog/>, document.getElementById('catalog'));
