import React, { Component } from "react";
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "./Menus/SignedOutMenu";
import SignedInMenu from "./Menus/SignedInMenu";
import { openModal } from '../../modals/modalActions';

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
})

const actions = {
  openModal,
}

class NavBar extends Component {
  handleSignIn = () => {
    // this.setState({
    //   isAuthenticated: true
    // });
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout()
    this.props.history.push('/');
  };

  render() {
    const { auth, profile } = this.props;
    const isAuthenticated = auth.isLoaded && !auth.isEmpty;
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
            <SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
