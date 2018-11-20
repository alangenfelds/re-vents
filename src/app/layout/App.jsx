import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Container } from "semantic-ui-react";

import NavBar from "../../features/nav/navBar/NavBar";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="main">
          <EventDashboard />
        </Container>
      </div>
    );
  }
}

export default App;
