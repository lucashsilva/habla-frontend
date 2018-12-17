import * as React from 'react';
import './login.css';
import * as firebase from 'firebase';
import { Segment, Divider, Button, Header, Form, Message, Grid, Icon } from 'semantic-ui-react';

class LoginPage extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { credentials: { email: '', password: '' }, loading: false, errorMessage: null };
  }

  public render() {
    return (
      <Grid className="page" padded centered verticalAlign="middle">
          <Grid.Column widescreen={6} largeScreen={7} computer={8} tablet={10} mobile={16}>
            <Segment centered textAlign='center' loading={this.state.loading}>
              <Header size='huge'>Habla</Header>
              <Form error={!!this.state.errorMessage}>
                <Form.Input icon='at'
                            iconPosition='left'
                            placeholder='Email'
                            name='email'
                            onChange={this.handleInputChange}
                />
                <Form.Input icon='key'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            onChange={this.handleInputChange}
                />
                <Message error
                        content={this.state.errorMessage}
                />
                <Button.Group fluid>
                  <Button primary onClick={this.login}>Login</Button>
                  <Button.Or />
                  <Button color='orange' onClick={this.register}>Register</Button>
                </Button.Group>
              </Form>
            <Divider horizontal>Or</Divider>
            <Button fluid color='facebook' onClick={this.loginWithFacebook} disabled>
              <Icon name='facebook'/> Login with Facebook
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }

  handleInputChange = (event) => {
    this.setState({ credentials: { ...this.state.credentials, [event.target.name]: event.target.value }});
  };

  private login = async() => {
    if (!(this.state.credentials.email && this.state.credentials.password)) {
      this.setState({ errorMessage: 'Please inform your email and password to login.' });
      return;
    }

    this.setState({ loading: true });
    
    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.credentials.email, this.state.credentials.password);
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  private loginWithFacebook = async() => {
    alert("Provider not configured");
    return; 

    let provider = new firebase.auth.FacebookAuthProvider();
  
    this.setState({ loading: true });
    
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  }

  private register = async() => {
    if (!(this.state.credentials.email && this.state.credentials.password)) {
      this.setState({ errorMessage: 'Please inform an email and password to create an account.' });
      return;
    }

    this.setState({ loading: true });
    
    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.credentials.email, this.state.credentials.password);
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  }; 
}

export default LoginPage;
