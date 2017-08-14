import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { IProps } from './FolderView';
import { SearchEntries } from './SearchEntries';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ErrorView } from './ErrorView';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { checkStatus } from './ApiUtil';

export class Search extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            items: '',
            loading: true,
            error: null
        };
    }

    componentDidMount = () => {
        if (!this.props.match.params.query)
        {
            this.setState({ loading: false });
            return;
        }
        fetch(`/api/Search/${this.props.match.params.query}`, { credentials: 'same-origin' })
            .then(checkStatus)
            .then(response => response.json())
            .then(items => this.setState({ items, loading: false }))
            .catch(e => this.setState({ error: e.status, loading: false }));
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.match.params.query) {
            this.setState({ loading: false });
            return;
        }
        if (decodeURIComponent(nextProps.match.params.query) === decodeURIComponent(this.props.match.params.query))
            return;
        this.setState({ loading: true });
        fetch(`/api/Search/${nextProps.match.params.query}`, { credentials: 'same-origin' })
            .then(checkStatus)
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