import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { FolderEntries } from './FolderEntries';

export const listStyle = {
    'listStyleType': 'none',
    'padding': '0px 0px 0px 15px'
};
export const iconStyle = {
    'padding': '0px 5px 0px 0px'
};

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
                item_collection: {
                    total_count: 0,
                    entries: []
                },
                parent: {
                    id: 0
                }
            }
        };
    }
    componentDidMount = () => {
        // go grab the folder info we are looking at
        fetch('/api/folder/' + this.props.match.params.id, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id)
        {
            fetch('/api/folder/' + nextProps.match.params.id, { credentials: 'same-origin' })
                .then(response => response.json())
                .then(data => this.setState({ data }));
        }
    }

    render() {
        return (
                <FolderEntries data={this.state.data} />
        );
    }
}

