import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { get } from 'object-path';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Listing from './components/Listing';

class Campaigns extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			campaigns: [],
		};
	}

	componentDidMount() {
		this.props.dispatch({
			type: 'CAMPAIGNS_FETCH_REQUESTED',
		});
		// this should eventually be a saga or use thunk
		/*
		fetch('/api/campaigns')
			.then(res => res.json())
			.then(data => {
				// this.setState({ campaigns: data.campaigns });
				this.props.dispatch({
					type: 'FETCH_CAMPAIGNS',
					payload: data,
				});
			})
			.catch(err => {
				console.log(err);
			});
		*/
	}

	render() {
		const cards = this.state.campaigns.map(campaign => {
			return (
				// here we might add the names of the characters, or possibly a small campaign description
				<a href={`/campaigns/${campaign.campaign_id}`} key={campaign.campaign_id}>
					<Card 
						sSize={6}
						mSize={4}
						cardColor={'blue-grey'}
						textColor={'white'}
						cardTitle={campaign.title}
						hoverable='hoverable'
					/>
				</a>
			)
		});

		return (
			<Fragment>
				<Navbar />
				<div className='container'>
					<h4>Campaigns</h4>
					<Listing
						rows={this.props.campaigns}
						fieldNames={this.props.fieldNames}
					/>
				</div>
			</Fragment>
		)

		/*
		console.log(this.state.campaigns);
		return (
			<React.Fragment>
				<Navbar />
				<div className='container'>
					<div className='row'>
						{cards}
					</div>
				</div>
			</React.Fragment>
		);
		*/
	}
};

export default connect(state => ({
	campaigns: get(state, 'campaigns.results'),
	fieldNames: get(state, 'campaigns.metadata.fieldNames'),
}))(Campaigns);
