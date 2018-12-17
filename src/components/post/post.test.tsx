import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PostComponent from './post';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const post = {
    id: 1,
    body: "Post body"
  };

  ReactDOM.render(<PostComponent post={post}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
