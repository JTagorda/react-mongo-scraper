import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { LoginCard } from '../../components/LoginCard';
import { Input, FormBtn } from '../../components/Form';
import AUTH from '../../utils/AUTH';

class SignupForm extends Component {

	constructor() {
    super();
    
		this.state = {
      firstName: '',
      lastName: '',
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		};
  }
  
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
  }
  
	handleSubmit = (event) => {
		event.preventDefault();
		// TODO - validate!
		AUTH.signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      console.log(response);
      if (!response.data.errmsg) {
        console.log('youre good');
        this.setState({
          redirectTo: '/'
        });
      } else {
        console.log('duplicate');
      }
    });
  }
  
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    
		return (
      <Row>
        <Col size="md-1"></Col>
        <Col size="md-5">
          <div className="text-center text-light bg-dark py-2 px-4">
            <h1>Welcome to Scraped Pi</h1>
            <img className="img-fluid img-thumbnail my-2" src="https://images.unsplash.com/photo-1526815456940-2c11653292a2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=25a07faa86f6201b4e68cac2dc351537&auto=format&fit=crop&w=1950&q=80"></img>
            <p>Posts from /r/raspberry-pi/ reddit forum. Save what peaks your interest. Leave notes to inform your projects.</p>
          </div>
        </Col>
        <Col size="md-6">
          <Container>
            <Row>
              <Col size="md-1"></Col>
              <Col size="md-10">
                <LoginCard title="Register for Scraped Pi">
                  <form style={{marginTop: 10}}>
                    <label htmlFor="username">First name: </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="username">Last name: </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="username">Username: </label>
                    <Input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="password">Password: </label>
                    <Input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                    />
                    <Link to="/">Login</Link>
                    <FormBtn onClick={this.handleSubmit}>Register</FormBtn>
                  </form>
                </LoginCard>
              </Col>
              <Col size="md-1"></Col>
            </Row>
          </Container>
        </Col>
      </Row>
		)
	}
}

export default SignupForm;
