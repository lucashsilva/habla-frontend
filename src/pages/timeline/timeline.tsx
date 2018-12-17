import * as React from 'react';
import './timeline.css';
import TimelineComponent from '../../components/timeline/timeline';

class TimelinePage extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  get channelId() {
    return this.props && this.props.match && this.props.match && this.props.match.params.channelId;
  }

  public render() {
    return (
      <TimelineComponent/>
    );
  }
}

export default TimelinePage;
