import React, { Component } from "react";

import EventListItem from "./EventListItem";

class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <div>
        {events.map(event => (
          <EventListItem
              onEventDelete={this.props.onEventDelete}
              key={event.id}
              event={event} />
        ))}
      </div>
    );
  }
}

export default EventList;
