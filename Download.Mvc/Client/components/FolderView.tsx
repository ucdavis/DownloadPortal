import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { FolderEntries } from './FolderEntries';
import { SearchBar } from './SearchBar';
import { Breadcrumbs } from './Breadcrumbs';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { ErrorView } from './ErrorView';

declare var Promise: any;

interface IRouteParams {
    id: string
}

interface ILocationParams {
    hash: string
}

export interface IProps {
    match: match<IRouteParams>,
    location: match<ILocationParams>
}

export class FolderView extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: null,
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

    checkStatus(response) {
        // The Promise returned from fetch() won’t reject on HTTP error statuses
        // So instead lets check for good statuses and reject the rest
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }

    componentDidMount = () => {
        // go grab the folder info we are looking at
        fetch(`/api/folder/${this.props.match.params.id}`, { credentials: 'same-origin' })
            .then(this.checkStatus)
            .then(response => response.json())
            .then(data => this.setState({ data, loading: false }))
            .catch(e => this.setState({ error: e.status, loading: false }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id === this.props.match.params.id) return;

        this.setState({ loading: true });

        fetch(`/api/folder/${nextProps.match.params.id}`, { credentials: 'same-origin' })
            .then(this.checkStatus)
            .then(response => response.json())
            .then(data => this.setState({ data, loading: false }))
            .catch(e => this.setState({ error: e.status, loading: false }));
    }

    render() {
        if (this.state.loading) return <ProgressBar mode="indeterminate" />;

        if (this.state.error) {
            return <ErrorView status={this.state.error} />
        }
        const highlightHash = this.props.location.hash ? this.props.location.hash.substr(1) : '';

        return (
            <div>
                <SearchBar />
                <br/>
                <Breadcrumbs data={this.state.data} />
                <FolderEntries data={this.state.data} highlightFile={highlightHash} />
            </div>
        );
    }
}

