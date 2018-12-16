import React, {Component} from 'react';
import List from './items';
import store from '../state';

class Filter extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  items: props.data,
      filteredItems: [],
      selectedOpt: ''
    };

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			filteredItems: this.state.items
		})

		store.dispatch({
			type: 'newlist',
			list: this.state.filteredItems
		})
  }

  componentDidUpdate() {
		store.dispatch({
			type: 'newlist',
			list: this.state.filteredItems
		})
	}

  handleChange(event) {
		this.setState({
			selectedOpt: event.target.value
		}, () => {
      let selectedOptionFilter = this.state.selectedOpt;
      const newFilteredItems = this.state.items.filter(item => {
        return selectedOptionFilter.includes(item.tippred);
      });

      this.setState({
        filteredItems: newFilteredItems
      });
    });

		// e => this.setState({selectedOpt: e.target.value}, () => console.log(this.state))


    /*

     */
	}

  render() {
		const { selectedOption, filteredItems } = this.state;

		let categores = this.state.items.map((item, index) => item.tippred);
		categores = [... new Set(categores)];

		const markup = categores.map((item, index) => {
			return (
				<option defaultValue={this.state.selectedOpt} value={item} key={index}>{item}</option>
			)
		});

		return (
			//<select onChange={e => this.setState({selectedOpt: e.target.value}, () => console.log(this.state))}>
			<select onChange={this.handleChange}>
				<option>все</option>
				{markup}
			</select>
		)
  }
}

export default Filter;