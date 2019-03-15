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
						<tr key={`row_${row.id}`}>
							{this.props.fieldNames.map(field => (
								<td key={row[field.field]}>{row[field.field]}</td>
							))}
						</tr>
					))}
				</tbody>

			</table>
		)
	}
}

Listing.defaultProps = {
	fieldNames: [],
	rows: [],
}

export default connect(state => ({

}))(Listing);
