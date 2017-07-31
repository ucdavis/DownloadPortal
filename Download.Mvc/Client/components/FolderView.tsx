import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { FolderEntries } from './FolderEntries';
import { SearchBar } from './SearchBar';
import { Breadcrumbs } from './Breadcrumbs';
import { Error } from './Error';
import ProgressBar from 'react-toolbox/lib/progress_bar';

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
        fetch(`/api/folder/${this.props.match.params.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data, loading: false }))
            .catch(_ => this.setState({ error: true, loading: false }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id === this.props.match.params.id) return;

        this.setState({ loading: true });

        fetch(`/api/folder/${nextProps.match.params.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data, loading: false }))
            .catch(_ => this.setState({ error: true, loading: false }));
    }

    render() {
        if (this.state.loading) return <ProgressBar mode="indeterminate" />;

        if (this.state.error) return <Error />;

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

