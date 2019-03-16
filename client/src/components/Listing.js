import React, { Component } from 'react';
import { connect } from 'react-redux';

class Listing extends Component {
	render() {
		return (
			<table className={`highlight ${this.props.center && 'centered'}`}>
				<thead>
					<tr>
						{this.props.fieldNames.map(row => (
							<th key={row.displayName}>{row.displayName}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{this.props.rows.map(row => (
						<tr 
							className='list-row' 
							key={`row_${row.id}`}
							onClick={() => this.handleClick(row.id)}
						>
							{this.props.fieldNames.map(field => (
								<td key={row[field.field]}>{row[field.alias || field.field]}</td>
							))}
						</tr>
					))}
				</tbody>

			</table>
		)
	}

	handleClick = (id) => {
		window.location = `/campaigns/${id}`;
	}
}

Listing.defaultProps = {
	fieldNames: [],
	rows: [],
}

export default connect(state => ({

}))(Listing);
