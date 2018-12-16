import React, {Component} from 'react';
import '../content/styles/app.css';
import {Provider} from 'react-redux';
import store from '../state';

class Items extends Component {
	constructor(props) {
		super(props);

		this.state = {
			actualList: []
		}
	}

	async componentDidMount() {
		await store.subscribe(() => {
			this.setState({
				actualList: store.getState().list
			});
		});
	}

	render() {
		let categores = this.props.data.map((item, index) => item.tippred);
		categores = [... new Set(categores)];

		return (
			<Provider store={store}>
				<ul>
					{this.state.actualList.map((item, index) => (
						<li key={index}>
							{item.title}&nbsp;&ndash;&nbsp;
						</li>
					))}
				</ul>
			</Provider>
			)
  }
}

export default Items
/*
this.props.data.map((_item, _index) => {
		if (_item.tippred == item) {
			return (
				<div key={_index}>{_item.title}</div>
			)
		}
	})

	const category = categores.map((item, index) =>
			<Provider store={store} key={index}>
				<div>
					<h2>{item}</h2>
					<div>
						{
							<ul>
								{this.state.actualList.map((item, index) => (
									<li key={index}>
										{item.title}&nbsp;&ndash;&nbsp;
									</li>
								))}
							</ul>
						}
					</div>
				</div>
			</Provider>
    );
 */