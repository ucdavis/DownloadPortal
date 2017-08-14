import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { IProps } from './FolderView';
import { SearchEntries } from './SearchEntries';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ErrorView } from './ErrorView';
import ProgressBar from 'react-toolbox/lib/progress_bar';

declare var Promise: any;

export class Search extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            items: '',
            loading: true,
            error: null
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
        if (!this.props.match.params.query)
            return;
        fetch(`/api/Search/${this.props.match.params.query}`, { credentials: 'same-origin' })
            .then(this.checkStatus)
            .then(response => response.json())
            .then(items => this.setState({ items, loading: false }))
            .catch(e => this.setState({ error: e.status, loading: false }));
    }

    componentWillReceiveProps(nextProps) {
        if (decodeURIComponent(nextProps.match.params.query) === decodeURIComponent(this.props.match.params.query))
            return;
        this.setState({ loading: true });
        fetch(`/api/Search/${nextProps.match.params.query}`, { credentials: 'same-origin' })
            .then(this.checkStatus)
            .then(response => response.json())
            .then(items => this.setState({ items, loading: false }))
            .catch(e => this.setState({ error: e.status, loading: false }));
    }

    render() {
        if (this.state.loading) return <ProgressBar mode="indeterminate" />;

        if (this.state.error)
            return <ErrorView status={this.state.error} />
        return (
            <div>
                <SearchBar />
                <h3>Searching for: {decodeURIComponent(this.props.match.params.query)}</h3>
                <p>
                    <Link to='/folder/27707355823/Download'>
                        <i className="fa fa-level-up" aria-hidden="true"></i> Return Home
                    </Link>
                </p>
                <SearchEntries items={this.state.items} />
            </div>
        );
    }
}