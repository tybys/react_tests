import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Catalog from './gastrcatalog';

const title = 'My Minimal React Webpack Babel Setup';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>jiopa</div>
    )
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById('app')
);

module.hot.accept();
