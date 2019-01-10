import React from 'react';

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
			<h2>{title}</h2>
		)
	}
}

export default Campaign;
