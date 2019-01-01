import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router-dom";

import SettingsNav from "./SettingNav";
import BasicsPage from "./BasicsPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from '../../user/userActions'

const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
})

const actions = {
  updatePassword,
  updateProfile,
};

const SettingsDashboard = ({ updatePassword, updateProfile, providerId, user }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basics" />
          <Route
            path="/settings/basics" 
            render={ () => <BasicsPage updateProfile={updateProfile} initialValues={user} /> }
          />
          <Route 
            path="/settings/about" 
            render={ () => <AboutPage updateProfile={updateProfile} initialValues={user} /> }
          />
          <Route path="/settings/photos" component={PhotosPage} />
          {/* <Route path="/settings/account" component={AccountPage}/> */}
          <Route 
            path="/settings/account" 
            render={ () => <AccountPage updatePassword={updatePassword} providerId={providerId} /> } 
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(
  mapState,
  actions
)(SettingsDashboard);
