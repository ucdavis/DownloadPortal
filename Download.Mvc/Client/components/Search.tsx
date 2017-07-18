import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { IProps } from './FolderView';
import { SearchEntries } from './SearchEntries';

export class Search extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            items: '',
        };
    }
    componentDidMount = () => {
        if (!this.props.match.params.query)
            return;
        fetch(`/api/Search/${this.props.match.params.query}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(items => this.setState({ items }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.query === this.props.match.params.query)
            return;
        fetch(`/api/Search/${nextProps.match.params.query}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(items => this.setState({ items }));
    }
    render() {
        return (
            <div>
                Searching for: {this.props.match.params.query}<br />
                {this.state.items &&
                    <SearchEntries entries={this.state.items.entries} />
                }
            </div>
        );
    }
}