import React from 'react';

class Home extends React.Component {
	render() {
		return (
			<button className='btn' onClick={this.test}>Test</button>
		);
	}

	test(e) {
		e.preventDefault();
		fetch('http://localhost:8080/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				test: 'test',
				name: 'max',
				dog: 'mongo'
			}),
			mode: 'cors'
		})
		.then(response => {
			console.log(response);
		})
		.catch(err => {
			console.log(err);
		});

	}
}

export default Home;
