import * as React from 'react';
import './new-channel.css';
import { client } from 'src/services/client';
import gql from 'graphql-tag';
import { Button, Input, Header } from 'semantic-ui-react';

class NewChannelComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            channel: {
                name: ''
            },
            creating: false
        };
    }

    reset = () => {
        this.setState({
            channel: {
                name: ''
            }
        });
    };

    render() {
        return (
            <div className="new-channel">
                <Header icon='hashtag' content='Create new channel' color='grey'/>
                Do you have an interesting topic? Start talking about it!

                <Input label={<Button primary onClick={this.submit} disabled={this.state.creating} loading={this.state.creating}>Create</Button>}
                       labelPosition='right'
                       placeholder="Channel name"
                       name='name'
                       value={this.state.channel.name} 
                       onChange={this.handleInputChange}
                       disabled={this.state.posting}
                       size="huge"
                       className="channel-name-input"
                       fluid/>
            </div>
        );
    }

    handleInputChange = (event) => {
        const value = event.target.value;

        this.setState({ channel: { ...this.state.post, [event.target.name]: value}});
    };

    submit = async() => {
        this.setState({ creating: true });
            
        try {
            const response = await client.mutate({
                variables: { 
                    channel: this.state.channel
                },
                mutation: gql(`
                    mutation NewChannel ($channel: ChannelInput!) {
                        createChannel(channel: $channel) {
                            id
                            name
                        }
                    }
                `)
            });

            this.setState({ creating: false });
        
            this.props.onNewChannel && await this.props.onNewChannel(response.data.createChannel);

            this.reset();
        } catch (error) {
            console.log(error);
        }
    }
}

export default NewChannelComponent;