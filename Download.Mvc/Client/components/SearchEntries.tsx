import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { IProps } from './FolderView';
import { SearchEntry } from './SearchEntry';

export class SearchEntries extends React.Component<any, any> {

    render() {
        let entryList = "";
        if (this.props.entries) {
            entryList = this.props.entries.map((entry, index) =>
                <SearchEntry key={index} entry={entry} />);
        }
        return (
            <div>
                <ul>{entryList}</ul>
            </div>
        );
    }
}