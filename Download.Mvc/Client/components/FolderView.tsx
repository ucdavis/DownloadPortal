import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';

interface IRouteParams {
    id: string
}

export interface IProps {
    match: match<IRouteParams>
}

export class FolderView extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                total_count: 0,
                entries: []
            }
        };
    }
    componentDidMount = () => {
        // go grab the folder info we are looking at
        fetch('/api/folder/' + this.props.match.params.id, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }
    render() {
        return <div>
            <h1>Viewing folder {this.props.match.params.id}!</h1>
            <p>There are {this.state.data.total_count} things in here</p>
        </div>;
    }
}
