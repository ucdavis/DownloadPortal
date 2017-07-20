import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { FolderEntries } from './FolderEntries';
import { SearchBar } from './SearchBar';
import { Breadcrumbs } from './Breadcrumbs';
import ProgressBar from 'react-toolbox/lib/progress_bar';

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
            loading: true,
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
            readmeID: null
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
            .then(data => this.setState({ data, loading: false }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id === this.props.match.params.id) return;

        this.setState({ loading: true });

        fetch(`/api/folder/${nextProps.match.params.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data, loading: false }));
    }

    render() {
        if (this.state.loading) return <ProgressBar mode="indeterminate" />;
        return (
            <div>
                <SearchBar />
                <Breadcrumbs data={this.state.data} />
                <FolderEntries data={this.state.data} getLicenseID={this.getLicenseID} licenseID={this.state.licenseID} getReadmeID={this.getReadmeID} readmeID = { this.state.readmeID } />
            </div>
        );
    }
}

