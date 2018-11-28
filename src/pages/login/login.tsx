import * as React from 'react';
import './login.css';
import * as firebase from 'firebase';

class LoginPage extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { credentials: { email: '', password: '' }};
  }

  public render() {
    return (
      <div className="login-box">
        <input className="text-input" placeholder="Email" name="email" type="text" value={this.state.credentials.email} onChange={this.handleInputChange}></input>
        <input className="text-input" placeholder="Password" name="password" type="password" value={this.state.credentials.password} onChange={this.handleInputChange}></input>
        <button className="login-button" onClick={this.login} disabled={!(this.state.credentials.email && this.state.credentials.password)}>Login</button>
      </div>
    );
  }

  handleInputChange = (event) => {
    this.setState({ credentials: { ...this.state.credentials, [event.target.name]: event.target.value }});
  };

  private login = async() => {
    await firebase.auth().signInWithEmailAndPassword(this.state.credentials.email, this.state.credentials.password);
  };
}

export default LoginPage;
