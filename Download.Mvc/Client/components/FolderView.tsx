import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { FolderEntries } from './FolderEntries';

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
            },
            licenseID: null,
            readmeID:null
        };
    }


    getLicenseID = (id) => {
        this.setState({ licenseID: id });
    }

    getReadmeID = (id) => {
        this.setState({ readmeID: id });
    }

    componentDidMount = () => {
        // go grab the folder info we are looking at
        fetch(`/api/folder/${this.props.match.params.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id === this.props.match.params.id)
            return;
        fetch(`/api/folder/${nextProps.match.params.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        return (
            <FolderEntries data={this.state.data} getLicenseID={this.getLicenseID} licenseID={this.state.licenseID} getReadmeID={this.getReadmeID} readmeID = { this.state.readmeID } />
        );
    }
}

