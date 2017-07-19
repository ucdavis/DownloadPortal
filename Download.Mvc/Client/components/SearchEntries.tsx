import * as React from 'react';
import { SearchEntry } from './SearchEntry';

export class SearchEntries extends React.Component<any, any> {

    render() {
        if (!this.props.items || this.props.items.length <= 0)
            return (<div>No entries were found</div>);
        let entryList = this.props.items.map((entry, index) =>
            <SearchEntry key={index} entry={entry} />);
        return (
            <div>
                {entryList}
            </div>
        );
    }
}