import * as React from 'react';
import './new-post.css';
import { api } from '../../services/api';

class NewPostComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                body: '',
                anonymous: false
            }
        };
    }

    reset = () => {
        this.setState({
            post: {
                body: '',
                anonymous: false
            }
        });
    };

    render() {
        return (
            <div className="new-post">
                <div className="col">
                    <div className="row">
                        <input className="text-input" placeholder="What's up?" name="body" value={this.state.post.body} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="row">
                        <input type="checkbox" name="anonymous" checked={this.state.post.anonymous} onChange={this.handleInputChange}/> <label className="anonymous">Anonymous</label>
                    </div>
                </div>
                <div className="col right">
                    <button className="button-send" onClick={this.submit}>Send</button>
                </div>
            </div>
        );
    }

    handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({ post: { ...this.state.post, [event.target.name]: value}});
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