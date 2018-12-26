import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../../features/nav/navBar/NavBar";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import TestComponent from '../../features/Testarea/TestCompoenent'
import ModalManager from '../../features/modals/ModalMananger';

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route path='/(.+)' render={()=> (
        <div>
        <NavBar />
        <Container className="main">
          <Switch>
            <Route path="/events" component={EventDashboard} />
            <Route path="/test" component={TestComponent} />
            <Route path="/event/:id" component={EventDetailedPage} />
            <Route path="/editEvent/:id" component={EventForm} />
            <Route path="/people" component={PeopleDashboard} />
            <Route path="/profile:id" component={UserDetailedPage} />
            <Route path="/settings" component={SettingsDashboard} />
            <Route path="/createEvent" component={EventForm} />
          </Switch>
        </Container>
      </div>
        )} />
      </div>
    );
  }
}

export default App;
