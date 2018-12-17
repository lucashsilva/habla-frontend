import * as React from 'react';
import './profile.css';
import { Segment } from 'semantic-ui-react';

class ProfilePage extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      profile: null,
      loading: true
    }
  }

  componentWillMount = async() => {
    await this.refresh();
  }

  refresh = () => {
    
  }

  public render() {
    return (
      <Segment>
       Not implemented yet.
      </Segment>
    );
  }
}

export default ProfilePage;
