import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "./Menus/SignedOutMenu";
import SignedInMenu from "./Menus/SignedInMenu";

class NavBar extends Component {
  state = {
    isAuthenticated: false
  };

  handleSignIn = () => {
    this.setState({
      isAuthenticated: true
    });
  };

  handleSignOut = () => {
    this.setState({
      isAuthenticated: false
    });
    this.props.history.push('/');
  };

  render() {
    const { isAuthenticated } = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={Link} to="/">
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item name="Events" as={NavLink} to="/events" />
          <Menu.Item name="Test" as={NavLink} to="/test" />
          { isAuthenticated && 
           <Menu.Item name="People" as={NavLink} to="/people" />}
          { isAuthenticated &&  <Menu.Item as={NavLink}
              to="/createEvent"> 
            <Button
              floated="right"
              positive
              inverted
              content="Create Event"
            />
          </Menu.Item>}
          {isAuthenticated ? (
            <SignedInMenu signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
