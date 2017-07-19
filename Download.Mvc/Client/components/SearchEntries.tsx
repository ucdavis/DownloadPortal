import * as React from 'react';
import { SearchEntry } from './SearchEntry';

export class SearchEntries extends React.Component<any, any> {

    render() {
        let entryList = "";
        if (!this.props.items)
            return;

        entryList = this.props.items.map((entry, index) =>
            <SearchEntry key={index} entry={entry} />);
        return (
            <div>
                {entryList}
            </div>
        );
    }
}