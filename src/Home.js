import React from 'react';
import axios from 'axios';
import './styles.css';

export default class App extends React.Component {
	state = {
		users: [],
	};
	componentDidMount() {
		axios.get('/users.json').then((response) => {
			this.setState({ users: response.data });
		});
	}

	render() {
		const { users } = this.state;
		console.log('users is: ', users);
		if (users.length < 1) {
			return <div>HOME SWEET HOME!</div>;
		}
		return (
			<div>
			Home Sweet Home 
			<a href="/about">To About</a>
			</div>
		);
	}
}
