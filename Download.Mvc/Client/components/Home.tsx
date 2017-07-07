import * as React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component<{}, {}> {
    render() {
        return <div>
            <h1>Hello, world!</h1>
            <p>Welcome to the new Download!</p>
            <Link to='/folder/27707355823'>Get started!</Link>
        </div>;
    }
}
