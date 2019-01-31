import React from 'react';
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class Navbar extends React.Component {

	componentDidMount() {
		const elements = document.querySelectorAll('.dropdown-trigger');
		M.Dropdown.init(elements, {
			alignment: 'left',
			coverTrigger: false,
		});
	}

	render() {
		return (
			<React.Fragment>
				<ul id='createDropdown' className='dropdown-content'>
					<li><a href='/notes/create'>Note</a></li>
					<li><a href='#!'>Campaign</a></li>
					<li><a href='#!'>Character</a></li>
					<li><a href='#!'>Item</a></li>
				</ul>
				<div className='navbar-fixed' style={{marginBottom: '20px'}}>
					<nav>
						<div className='nav-wrapper'>
							<a href='/' className='brand-logo'>Home</a>
							<ul id='nav-mobile' className='right hide-on-med-and-down'>
								<li><a className='dropdown-trigger' href='#!' data-target='createDropdown'>
									<i className='material-icons'>add</i>
								</a></li>
								<li><a href='/notes'>Notes</a></li>
								<li><a href='/tags'>Tags</a></li>
								<li><a href='#!'>Item 3</a></li>
							</ul>
						</div>
					</nav>
				</div>
			</React.Fragment>
		);
	}

}

export default Navbar;
