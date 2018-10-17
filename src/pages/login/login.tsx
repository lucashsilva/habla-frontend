import * as React from 'react';
import './login.css';
import * as firebase from 'firebase';

class LoginPage extends React.Component<any, any> {

  public render() {
    return (
      <div>
          <a onClick={this.login}>Sign in</a>
      </div>
    );
  }

  private login = async() => {
    await firebase.auth().signInWithEmailAndPassword("lucashenrique125@gmail.com", "12345678");
  }
}

export default LoginPage;
