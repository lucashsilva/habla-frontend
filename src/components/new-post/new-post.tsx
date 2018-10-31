import * as React from 'react';
import './new-post.css';
import { api } from '../../services/api';

class NewPostComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                body: ''
            }
        };
    }

    reset = () => {
        this.setState({
            post: {
                body: ''
            }
        });
    };

    render() {
        return (
            <div className="new-post">
                <input className="text-input" placeholder="What's up?" name="body" value={this.state.post.body} onChange={this.handleInputChange}></input>
                <button className="button-send" onClick={this.submit}>Send</button>
            </div>
        );
    }

    handleInputChange = (event) => {
        this.setState({ post: { [event.target.name]: event.target.value }});
    };

    submit = async() => {
        await api.post('posts', this.state.post);

        if (this.props.onNewPost) {
            await this.props.onNewPost(this.state.post);
        }

        this.reset();
    }
}

export default NewPostComponent;