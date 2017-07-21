import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { IProps } from './FolderView';
import { SearchEntries } from './SearchEntries';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export class Search extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            items: '',
            loading: true
        };
    }
    componentDidMount = () => {
        if (!this.props.match.params.query)
            return;
        fetch(`/api/Search/${this.props.match.params.query}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(items => this.setState({ items, loading: false }));
    }

    componentWillReceiveProps(nextProps) {
        if (decodeURIComponent(nextProps.match.params.query) === decodeURIComponent(this.props.match.params.query))
            return;
        this.setState({ loading: true });
        fetch(`/api/Search/${nextProps.match.params.query}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(items => this.setState({ items, loading: false }));
    }

    render() {
        return (
            <div>
                <SearchBar />
                <h3>Searching for: {decodeURIComponent(this.props.match.params.query)}</h3>
                <p>
                    <Link to='/folder/27707355823/Download'>
                        <i className="fa fa-level-up" aria-hidden="true"></i> Return Home
                    </Link>
                </p>
                {this.state.items && !this.state.loading &&
                    <SearchEntries items={this.state.items} />
                }
                {this.state.loading && 
                    <p>Loading results . . . </p>}
            </div>
        );
    }
}