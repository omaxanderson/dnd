import React from 'react';
import Navbar from './components/Navbar';
import Dropdown from './components/Dropdown';
import { connect } from 'react-redux';
import { get } from 'object-path';

class Campaign extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			campaign: {},
		}
	}

	componentDidMount() {
		this.props.dispatch({
			type: 'CAMPAIGN_FETCH_REQUESTED',
			payload: {
				campaignId: this.props.match.params.campaignId,
			},
		});
		/*
		fetch(`/api/campaigns/${this.props.match.params.campaignId}`)
			.then(res => res.json())
			.then(campaign => {
				this.setState({campaign});
			});
		*/
	}

	testPost = () => {
		this.props.dispatch({
			type: 'CAMPAIGN_FETCH_REQUESTED',
			payload: {
				campaignId: this.props.match.params.campaignId,
			}
		});
	}

	render() {
		// console.log('campaign state', this.state.campaign);
		// console.log('campaign props', this.props.campaign);
		const { title } = this.props.campaign;
		return (
			<React.Fragment>
				<Navbar />
				<div className='container'>
					<h2>{title}</h2>
					<div className='row'>
						<div className='col s4'>
							<button onClick={this.testPost} className='btn'>Test</button>
						</div>
						<div className='col s4'>
							<Dropdown
								options={this.props.campaignNotes}
								label='dropdown label'
							/>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default connect(state => ({
	campaignNotes: get(state, 'campaigns.campaign.notes', []),
	campaign: get(state, 'campaigns.campaign', {}),
}))(Campaign);
