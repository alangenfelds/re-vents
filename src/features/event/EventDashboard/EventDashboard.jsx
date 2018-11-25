import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";

import { connect } from "react-redux";

import EventList from "../../event/EventList/EventList";
import EventForm from "../../event/EventForm/EventForm";
import { createEvent, updateEvent, deleteEvent } from "../eventActions";

class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null
  };

  handleDeleteEvent = eventId => {
    this.props.deleteEvent(eventId);
    // const updatedEvents = this.state.events.filter(e => e.id !== eventId);
    // this.setState({
    //   events: updatedEvents
    // });
  };

  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      // events: this.state.events.map(event => {
      //   if (event.id === updatedEvent.id) {
      //     return Object.assign({}, updatedEvent);
      //   } else {
      //     return event;
      //   }
      // }),
      isOpen: false,
      selectedEvent: null
    });
  };

  handleOpenEvent = eventToOpen => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  };

  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  };

  handleFormClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleCreateEvent = newEvent => {
    this.props.createEvent(newEvent);
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            onEventDelete={this.handleDeleteEvent}
            onEventOpen={this.handleOpenEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            content="Create Event"
            positive
            onClick={this.handleFormOpen}
          />
          {this.state.isOpen ? (
            <EventForm
              selectedEvent={this.state.selectedEvent}
              handleCancel={this.handleFormClose}
              handleCreateEvent={this.handleCreateEvent}
              handleUpdateEvent={this.handleUpdateEvent}
            />
          ) : null}
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
  createEvent,
  deleteEvent,
  updateEvent
};

export default connect(
  mapStateToProps,
  actions
)(EventDashboard);
