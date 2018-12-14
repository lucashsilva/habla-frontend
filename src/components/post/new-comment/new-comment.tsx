import * as React from 'react';
import './new-comment.css';
import { client } from 'src/services/client';
import gql from 'graphql-tag';
import { Button, Input, Checkbox } from 'semantic-ui-react';

class NewCommentComponent extends React.Component<NewCommentComponentProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            comment: {
                body: ''
            },
            anonymous: false,
            posting: false
        };
    }

    reset = () => {
        this.setState({
            comment: {
                body: ''
            }
        });
    };

    render() {
        return (
            <div className="new-comment">
                <Input label={<Button primary onClick={this.submit} disabled={this.state.posting}>Send</Button>}
                       labelPosition='right'
                       placeholder="Reply..."
                       name='body'
                       value={this.state.comment.body} 
                       onChange={this.handleInputChange}
                       disabled={this.state.posting}/>
                <Checkbox type="checkbox" 
                          name="anonymous" 
                          checked={this.state.anonymous} 
                          onChange={this.handleAnonymousCheckboxChange}
                          label="Anonymous"
                          className="anonymous-checkbox"
                          disabled={this.state.posting}/>
            </div>
        );
    }

    handleInputChange = (event) => {
        const value = event.target.value;

        this.setState({ comment: { ...this.state.comment, [event.target.name]: value}});
    };

    handleAnonymousCheckboxChange = () => {
        this.setState({ anonymous: !this.state.anonymous });
    }

    submit = async() => {
        this.setState({ posting: true });

        navigator.geolocation.getCurrentPosition(async(location) => {
            try {
                const response = await client.mutate({
                  variables: { 
                    comment: this.state.comment,
                    postId: this.props.postId,
                    anonymous: this.state.anonymous
                  },
                  mutation: gql(`
                    mutation CreateComment ($postId: ID!, $comment: CommentInput!, $anonymous: Boolean) {
                      createComment(postId: $postId, comment: $comment, anonymous: $anonymous) {
                        id
                        body
                        distance
                        owner {
                          uid
                          name
                          username
                          photoURL
                        }
                      }
                    }
                  `),
                  context: {
                    location: {
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude
                    }
                  }
                });

                this.setState({ posting: false });
            
                this.props.onNewComment && await this.props.onNewComment(response.data.createComment);

                this.reset();
            } catch (error) {
                console.log(error);
            } 
        });
    }
}

export interface NewCommentComponentProps {
    postId: number;
    onNewComment: Function;
}

export default NewCommentComponent;