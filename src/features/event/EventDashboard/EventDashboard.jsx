import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import cuid from "cuid";

import EventList from "../../event/EventList/EventList";
import EventForm from "../../event/EventForm/EventForm";

const events = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27T11:00:00+00:00",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28T14:00:00+00:00",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

class EventDashboard extends Component {
  state = {
    events: events,
    isOpen: false,
    selectedEvent: null
  };

  handleEditEvent = (eventToUpdate) => () => {
    this.setState({
      selectedEvent: eventToUpdate,
      isOpen: true
    })
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
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    newEvent.attendees = []

    const updatedEvents = [...this.state.events, newEvent];
    this.setState({
      events: updatedEvents,
      isOpen: false
    });
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList onEventEdit={this.handleEditEvent} events={this.state.events} />
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
            />
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
