import React from "react";
import { connect } from 'react-redux'
import { Grid } from "semantic-ui-react";

import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapState = (state, ownProps) => {

  const eventId = ownProps.match.params.id;
  let event = {};

  // if (eventId && state.eventsReducer.events && state.eventsReducer.events.length > 0) {
  //   event = state.eventsReducer.events.filter (event => event.id === eventId)[0];
  // }
  if (eventId && state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
    event = state.firestore.ordered.events.filter (event => event.id === eventId)[0];
  }

  return {
    event,
    loading: state.async.loading,
  }
}

const EventDetailedPage = ({ event, loading }) => {
  if (loading) return <LoadingComponent inverted/>
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event}/>
        <EventDetailedInfo event={event}/>
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees}/>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(EventDetailedPage);
