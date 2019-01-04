import React from 'react';

class Navbar extends React.Component {

	render() {
		return (
			<div className='navbar-fixed'>
				<nav>
					<div className='nav-wrapper'>
						<a href='/' className='brand-logo'>Home</a>
						<ul id='nav-mobile' className='right hide-on-med-and-down'>
							<li><a href='#'>Item 1</a></li>
							<li><a href='#'>Item 2</a></li>
							<li><a href='#'>Item 3</a></li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}

}

export default Navbar;
