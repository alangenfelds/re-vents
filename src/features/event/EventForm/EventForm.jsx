import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.eventsReducer.events.length > 0) {
    event = state.eventsReducer.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const mapActionsToProps = {
  createEvent,
  updateEvent
};

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {
  // state = {
  //   event: Object.assign({}, this.props.event)
  // };

  onFormSubmit = values => {
    // event.preventDefault();
    // console.log(this.state.event)
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(values);
      this.props.history.push("/events/");
    }
  };

  // onInputChange = event => {
  //   const newEvent = this.state.event;
  //   newEvent[event.target.name] = event.target.value;

  //   this.setState({
  //     event: newEvent
  //   });
  // };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                multiple={false}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />
              <Header sub color='teal' content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={TextInput}
                placeholder="Event City"
              />
              <Field
                name="venue"
                type="text"
                component={TextInput}
                placeholder="Event Venue"
              />
              <Field
                name="date"
                type="text"
                component={TextInput}
                placeholder="Event Date"
              />
              <Button positive type="submit">
                Submit
              </Button>
              <Button type="button" onClick={() => this.props.history.push('/events/')}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(reduxForm({ form: "eventForm", enableReinitialize: true })(EventForm));
