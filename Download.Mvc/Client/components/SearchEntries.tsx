import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { IProps } from './FolderView';
import { SearchEntry } from './SearchEntry';

export class SearchEntries extends React.Component<IProps, any> {
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
        let entryList = "";
        if (this.state.items.entries) {
            entryList = this.state.items.entries.map((entry, index) =>
                <SearchEntry key={index} entry={entry} />);
        }
        return (
            <div>
                Searching for: {this.props.match.params.query}<br />
                <ul>{entryList}</ul>
            </div>
        );
    }
}