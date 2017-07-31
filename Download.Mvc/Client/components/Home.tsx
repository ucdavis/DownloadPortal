import * as React from 'react';
import { Link } from 'react-router-dom';
declare var window: any;

export class Home extends React.Component<{}, {}> {
    render() {
        return <div>
            <h1>Hello, world!</h1>
            <p>Welcome to the new Download!</p>
            <Link to={`/folder/${window.App.defaultFolderId}/Download`}>Get started!</Link>
        </div>;
    }
}
