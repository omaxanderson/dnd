import React from 'react';
import Navbar from './components/Navbar';

class Home extends React.Component {
	render() {
		return (
			<React.Fragment>
			<Navbar />
			<div className='container'>
				<button style={{marginTop: '20px'}} className='btn' onClick={this.test}>Test</button>
				<div style={{height: '1000px'}}>
					<h3>To Do</h3>
					<div className='row'>
						<div className='collection col s4'>
							<a href='/notes' className='collection-item'>Note taking system</a>
							<a href='#!' className='collection-item'>Campaign Creator</a>
							<a href='#!' className='collection-item'>Character Creation</a>
							<a href='#!' className='collection-item'>Associate characters/users with campaigns</a>
							<a href='#!' className='collection-item'>Campaign Scheduler</a>
							<a href='#!' className='collection-item'>Quick name generator</a>
							<a href='#!' className='collection-item'>Ambient Sound Creator (tavern, weather, etc)</a>
							<a href='#!' className='collection-item'>Maybe a Spotify integration?</a>
							<a href='#!' className='collection-item'>Different "modes" for session prep (note taking) vs playing (sound, generators)</a>
						</div>
					</div>
				</div>
			</div>
			</React.Fragment>
		);
	}

	test(e) {
		e.preventDefault();
		fetch('/api/notes/1', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			/*
			body: JSON.stringify({
				content: `here's the newest content! round 2!!!`,
				title: 'new title too!',
			}), */
			credentials: 'same-origin',
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
