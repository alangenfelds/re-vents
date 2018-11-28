import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import { connect } from "react-redux";

import EventList from "../../event/EventList/EventList";
import { deleteEvent } from "../eventActions";

class EventDashboard extends Component {


  handleDeleteEvent = eventId => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            onEventDelete={this.handleDeleteEvent}
            // onEventOpen={this.handleOpenEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventsReducer.events
  };
};

const actions = {
  deleteEvent,
};

export default connect(
  mapStateToProps,
  actions
)(EventDashboard);
