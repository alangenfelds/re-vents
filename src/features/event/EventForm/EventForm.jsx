import React, {Component} from "react";
import {Segment, Form, Button} from "semantic-ui-react";

const emptyEvent = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
}

class EventForm extends Component {
    state = {
        event: emptyEvent
    }

    componentDidMount() {
        if (this.props.selectedEvent) {
            this.setState({
                event: this.props.selectedEvent
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log('current props', this.props.selectedEvent)
        //   console.log('next props', nextProps.selectedEvent)
        if (nextProps.selectedEvent !== this.props.selectedEvent) {
            this.setState({
                event: nextProps.selectedEvent || emptyEvent
            })
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state.event)
        if (this.state.event.id) {
            this.props.handleUpdateEvent(this.state.event)
        } else {
            this.props.handleCreateEvent(this.state.event)
        }

    }

    onInputChange = (event) => {
        const newEvent = this.state.event
        newEvent[event.target.name] = event.target.value

        this.setState({
            event: newEvent
        })
    }

    render() {
        const {event} = this.state

        return (
            <Segment>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Field>
                        <label>Event Title</label>
                        <input name="title" value={event.title} onChange={this.onInputChange}
                               placeholder="Event Title"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input name="date" value={event.date} onChange={this.onInputChange} type="date"
                               placeholder="Event Date"/>
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input name="city" value={event.city} onChange={this.onInputChange}
                               placeholder="City event is taking place"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input name="venue" value={event.venue} onChange={this.onInputChange}
                               placeholder="Enter the Venue of the event"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input
                            name="hostedBy"
                            value={event.hostedBy}
                            onChange={this.onInputChange}
                            placeholder="Enter the name of person hosting"/>
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                    </Button>
                    <Button type="button" onClick={this.props.handleCancel}>Cancel</Button>
                </Form>
            </Segment>
        );
    }
}

export default EventForm;
