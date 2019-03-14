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

	render() {
		console.log(this.state.campaign);
		const { title } = this.state.campaign;
		return (
			<React.Fragment>
				<Navbar />
				<div className='container'>
					<h2>{title}</h2>
				</div>
			</React.Fragment>
		)
	}
}

export default Campaign;
