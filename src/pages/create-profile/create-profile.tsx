import * as React from 'react';
import './create-profile.css';
import { api } from 'src/services/api';

class CreateProfilePage extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { profile: { } };
  }

  public render() {
    return (
      <code>
        <div className="header">
          Let's create your profile
        </div>
        <div className="login-box">
          <input className="text-input" placeholder="Name" name="name" type="text" value={this.state.profile.name} onChange={this.handleProfileInputChange}></input>
          <input className="text-input" placeholder="Username" name="username" type="text" value={this.state.profile.username} onChange={this.handleProfileInputChange}></input>
          <button className="login-button" onClick={this.submit} disabled={!(this.state.profile.name && this.state.profile.username)}>Continue</button>
        </div>
      </code>
    );
  }

  handleProfileInputChange = (event) => {
    this.setState({ profile: { ...this.state.profile, [event.target.name]: event.target.value }});
  };

  private submit = async() => {
    let response = await api.put("/profiles/self", this.state.profile);

    if (this.props.onCreation) {
      await this.props.onCreation(response.data);
    }
  };
}

export default CreateProfilePage;
