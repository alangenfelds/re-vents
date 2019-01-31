import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { differenceInYears, format } from "date-fns";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Segment
} from "semantic-ui-react";

import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
});

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

class UserDetailedPage extends Component {
  render() {
    const { profile, photos } = this.props;
    let age;
    if (profile.dateOfBirth) {
        age =  differenceInYears(
            new Date(),
            new Date(profile.dateOfBirth.toDate()))
    } else {
        age = 'unknown age'
    }
    const memberSince =
      profile.createdAt &&
      format(profile.createdAt.toDate(), "do MMMM YYYY");
    if (!profile.dateOfBirth) return <LoadingComponent inverted />;
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image
                  avatar
                  size="small"
                  src={profile.photoURL || '/assets/user.png'}
                />
                <Item.Content verticalAlign="bottom">
                  <Header as="h1">{profile.displayName}</Header>
                  <br />
                  <Header as="h3">{profile.occupation}</Header>
                  <br />
                  <Header as="h3">
                    {age}, Lives in {profile.city}
                  </Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header icon="smile" content="About Display Name" />
                <p>
                  I am a: <strong>{profile.occupation}</strong>
                </p>
                <p>
                  Originally from <strong>{profile.origin}</strong>
                </p>
                <p>
                  Member Since: <strong>{memberSince}</strong>
                </p>
                <p>{profile.about}</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header icon="heart outline" content="Interests" />
                { profile.interests ? 
                <List>
                  {profile.interests.map(item => (
                    <Item key={item}>
                      <Icon name="heart" />
                      <Item.Content>{item}</Item.Content>
                    </Item>
                  ))}
                </List> 
                : <p>No interests</p>
                }
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            <Button as={Link} to="/settings" color="teal" fluid basic content="Edit Profile" />
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon="image" content="Photos" />

            <Image.Group size="small">
            { photos && photos.length > 0 && photos.map( photo =>  <Image key={photo.id} src={photo.url} />)}
             
            </Image.Group>
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon="calendar" content="Events" />
            <Menu secondary pointing>
              <Menu.Item name="All Events" active />
              <Menu.Item name="Past Events" />
              <Menu.Item name="Future Events" />
              <Menu.Item name="Events Hosted" />
            </Menu>

            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src={"/assets/categoryImages/drinks.jpg"} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card>
                <Image src={"/assets/categoryImages/drinks.jpg"} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(mapState),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);
