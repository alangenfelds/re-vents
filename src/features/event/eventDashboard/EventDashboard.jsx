import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import EventList from "../../event/eventList/EventList";
import EventActivity from "../../event/eventActivity/EventActivity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { deleteEvent } from "../eventActions";

class EventDashboard extends Component {
  handleDeleteEvent = eventId => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted />;
    return (
      <Grid>
        <Grid.Column width={10}>
          {events && (
            <EventList
              onEventDelete={this.handleDeleteEvent}
              // onEventOpen={this.handleOpenEvent}
              events={events}
            />
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    // events: state.eventsReducer.events,
    events: state.firestore.ordered.events,
    loading: state.async.loading
  };
};

const actions = {
  deleteEvent
};

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
