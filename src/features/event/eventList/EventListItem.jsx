import React, { Component } from "react";
import { Segment, Item, List, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from 'date-fns/format';

import EventListAttendee from "./EventListAttendee";

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a href="/">{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(),'Do MMMM')} at {' '} {format(event.date.toDate(), 'HH:mm')} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              Object.values(event.attendees).map((attendee, index) => (
                <EventListAttendee key={index} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          {/* <Button onClick={this.props.onEventOpen(event)} as="a" color="teal" floated="right" content="View" /> */}
          <Button
            as={Link}
            to={`/event/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
          <Button
            onClick={() => this.props.onEventDelete(event.id)}
            as="a"
            color="red"
            floated="right"
            content="Delete"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
