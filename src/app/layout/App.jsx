import React, { Component } from "react";

const identity = arg => arg;

// const identityf = arg => () => arg;
function identityf(x) {
  return function() {
    return x;
  };
}

// const addf = a => b => a + b;
function addf(first) {
  return function(second) {
    return first + second;
  };
}

// const liftf = func => a => b => func(a, b);
function liftf(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
}

// const curry = (func, a) => b => func(a, b);
function curry(func, first) {
  return function(second) {
    return func(first, second);
  };
}

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;

const binary = (a, b) => {
  // binary function - means it takes 2 arguments
  return a * b;
};

const twice = func => {
  return function(a) {
    return func(a, a);
  };
};
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
    console.log("identity(3) = ", identity(3));
    console.log("identityf(3) = ", identityf(3));
    console.log(twice(binary)(3));
    console.log("addf(3)(4)", addf(3)(4));
    console.log("liftf(mul)(5)(6)", liftf(mul)(5)(6));
    console.log("curry(mul, 5)(7)", curry(mul, 5)(7));

    return (
      <div className="App">
        <h1>Re-vents</h1>
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
            <Route path="/profile/:id" component={UserDetailedPage} />
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
