import React from 'react';
import Navbar from './components/Navbar';

class Campaign extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			campaign: {},
		}
	}

	componentDidMount() {
		fetch(`/api/campaigns/${this.props.match.params.campaignId}`)
			.then(res => res.json())
			.then(campaign => {
				this.setState({campaign});
				console.log(campaign);
			});
	}

	testPost() {
		fetch(`/api/campaigns`, {
			method: 'POST',
			body: JSON.stringify({
				title: 'test',
			}),
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
			});
	}

	render() {
		console.log(this.state.campaign);
		const { title } = this.state.campaign;
		return (
			<React.Fragment>
				<Navbar />
				<div className='container'>
					<h2>{title}</h2>
					<button className='btn' onClick={this.testPost}>Send</button>
				</div>
			</React.Fragment>
		)
	}
}

export default Campaign;
