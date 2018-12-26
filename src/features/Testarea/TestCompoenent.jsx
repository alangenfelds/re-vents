import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
// import GoogleMapReact from "google-map-react";

import Script from "react-load-script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { incrementCounter, decrementCounter } from "./testActions";
import { openModal } from '../modals/modalActions'

// const Marker = () => <Icon name='marker' size='big' color='red' />;

class TestCompoenent extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: "",
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  onChange = address => {
    this.setState({
      address
    });
  };

  render() {
    const { incrementCounter, decrementCounter, answer, openModal } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4Tl5KFkHBW0QcjdLBW-L-xJvYGbd_-LU&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        <h3>The answer is {answer}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
        <Button onClick={() => openModal('TestModal', {data: 43})} color="teal" content="Open Modal" />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete inputProps={inputProps} />
          )}
          <button type="submit">Submit</button>
        </form>

        {/* Important! Always set the container height explicitly */}
        {/* <div style={{ height: "300px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyD4Tl5KFkHBW0QcjdLBW-L-xJvYGbd_-LU"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  answer: state.test.answer
});

const actions = {
  incrementCounter,
  decrementCounter,
  openModal
};

export default connect(
  mapStateToProps,
  actions
)(TestCompoenent);
