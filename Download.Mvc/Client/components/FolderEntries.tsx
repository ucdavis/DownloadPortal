import * as React from 'react';
import { Link } from 'react-router-dom';
import { FolderEntry } from './FolderEntry';
import { FolderParent } from './FolderParent';

export class FolderEntries extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        let entryList = this.props.entries.map((entry, index) =>
            <FolderEntry key={index} entry={entry} />
        );
        return(
            <table>
                <tbody>{entryList}</tbody>
            </table>);
    }
}
