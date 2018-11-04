import React, { Fragment } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Col } from '../Grid';
import './Nav.css';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
		greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.firstName}</strong>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.username} </strong>
			</Fragment>
		)
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info sticky-top border-bottom border-dark rounded mb-3">
      <Col size="md-2">
        <Link to="/articles" className="navbar-brand">Scraped Pi</Link>
      </Col>
      <Col size="md-1">
        <NavLink to="/watched-articles">
          <div className="nav-item">
            Watching
          </div>
        </NavLink>
      </Col>
      <Col size="md-6"></Col>
      <Col size="md-3">
        <div className="float-right">
        {greeting} - <Link to="/" className="logout" onClick={props.logout}>Logout</Link>
        </div>
      </Col>
    </nav>
  )
};

export default Nav;
