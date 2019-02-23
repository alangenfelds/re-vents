import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import { Grid } from "semantic-ui-react";
import { toastr } from 'react-redux-toastr'

import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { objectToArray } from '../../../app/common/util/helpers'

// const mapState = (state, ownProps) => {

//   const eventId = ownProps.match.params.id;
//   let event = {};

//   if (eventId && state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
//     event = state.firestore.ordered.events.filter (event => event.id === eventId)[0];
//   }

//   return {
//     event,
//     loading: state.async.loading,
//   }
// }

const mapState = state => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event: event
  }
}

class EventDetailedPage extends Component {

  async componentDidMount() {
    const { firestore, match } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      this.props.history.push('/events');
      toastr.error('Sorry', 'Event not found')
    }
  }
  
  render() {
  const { event, loading } = this.props; 
  if (loading) return <LoadingComponent inverted/>
  const attendees = event && event.attendees && objectToArray(event.attendees);
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event}/>
        <EventDetailedInfo event={event}/>
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={attendees}/>
      </Grid.Column>
    </Grid>
  );
}
}

export default withFirestore(connect(mapState)(EventDetailedPage));
