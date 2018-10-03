import * as React from 'react';
import './new-post.css';

class NewPostComponent extends React.Component {
    render() {
        return (
            <div className="new-post">
                <input className="text-input" placeholder="What's up?"></input>
                <button className="button-send">Send</button>
            </div>
        );
    }
}

export default NewPostComponent;