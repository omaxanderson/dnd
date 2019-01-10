import React from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';

class CampaignList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			campaigns: [],
		};
	}

	componentDidMount() {
		fetch('/api/campaigns')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.setState({ campaigns: data.campaigns });
			})
			.catch(err => {
				console.log(err);
			});
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
		});;
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
	}
};

export default CampaignList;
