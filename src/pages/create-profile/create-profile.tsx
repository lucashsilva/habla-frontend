import * as React from 'react';
import './create-profile.css';
import { client } from 'src/services/client';
import gql from 'graphql-tag';
import { Grid, Segment, Form, Message, Button, Image, Step, Icon, Divider } from 'semantic-ui-react';
import * as firebase from 'firebase';

class CreateProfilePage extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { profile: { photoURL: firebase.auth().currentUser.photoURL }, errorMessage: null };
  }

  public render() {
    return (
      <Grid padded centered verticalAlign="middle" className="page">
        <Grid.Column>
          <Segment centered textAlign='center' loading={this.state.loading} widescreen={10} computer={12} tablet={16} >
            <Step.Group attached='top' size='mini'>
              <Step completed>
                <Icon name="key"/>
                <Step.Content>
                  <Step.Title>Login</Step.Title>
                  <Step.Description>Connect with Habla</Step.Description>
                </Step.Content>
              </Step>

              <Step active>
                <Icon name="user circle"/>
                <Step.Content>
                  <Step.Title>Profile creation</Step.Title>
                  <Step.Description>Define how others will see you</Step.Description>
                </Step.Content>
              </Step>

              <Step disabled>
                <Icon name="comment alternate outline"/>
                <Step.Content>
                  <Step.Title>Habla!</Step.Title>
                  <Step.Description>You're finally ready to speak your mind.</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
            <Divider/>
            <Grid padded={false} columns={2}>
              <Grid.Column width={4} textAlign="center">
                <Image src={this.state.profile.photoURL || 'https://semantic-ui.com/images/avatar2/large/matthew.png'} rounded/>
              </Grid.Column>
              <Grid.Column width={12}>
                <Form error={!!this.state.errorMessage}>
                  <Form.Input icon='user'
                              iconPosition='left'
                              placeholder='Username'
                              name='username'
                              onChange={this.handleProfileInputChange}
                  />
                  <Form.Input placeholder='Name'
                              name='name'
                              onChange={this.handleProfileInputChange}
                  />
                  <Form.TextArea placeholder='Tell us a little bit about yourself...'
                                name='bio'
                                onChange={this.handleProfileInputChange}
                  />
                  <Message error
                          content={this.state.errorMessage}
                  />
                  <Button primary fluid onClick={this.submit} disabled={!(this.state.profile.name && this.state.profile.username && this.state.profile.bio)}>Continue</Button>
                </Form>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }

  handleProfileInputChange = (event) => {
    this.setState({ profile: { ...this.state.profile, [event.target.name]: event.target.value }});
  };

  private submit = async() => {
    this.setState({ loading: true });

    let response = await client.mutate({
      variables: { 
        profile: this.state.profile
      },
      mutation: gql(`
        mutation UpdateProfile ($profile: ProfileInput!) {
          updateProfile(profile: $profile) {
            uid
            username
            name
          }
        }
      `)
    });

    this.setState({ loading: false });

    if (this.props.onCreation) {
      await this.props.onCreation(response.data);
    }
  };
}

export default CreateProfilePage;
