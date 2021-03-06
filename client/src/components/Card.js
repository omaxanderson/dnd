import React from 'react';

class Card extends React.Component {

	constructor(props) {
		super(props);
		this.DEFAULT_SIZE_SM = 10;
		this.DEFAULT_SIZE_M = 6;
		this.DEFAULT_OFFSET_SM = 1;
		this.DEFAULT_OFFSET_M = 3;
	}

	render() {
		const {
			sSize,
			sOffset,
			mSize,
			mOffset,
			cardColor,
			textColor,
			cardTitle,
			cardBody,
			hoverable
		} = this.props;

		return (
			<div className={ 
				`col 
				s${sSize || this.DEFAULT_SIZE_SM} 
				${sOffset >= 0 ? `offset-s${sOffset}` : ''}
				m${mSize || this.DEFAULT_SIZE_M}
				${mOffset >= 0 ? `offset-m${mOffset}` : ''}`
			}
			key={this.props.idx}>
				<div className={ `card ${cardColor || ''} ${hoverable || ''}` }>
					<div className={ `card-content 
						${textColor ? `${textColor}-text` : ''}` }>
						<span className='card-title'>{cardTitle}</span>
						{ cardBody }
					</div>
				</div>
			</div>
		)
	}
}

export default Card;
