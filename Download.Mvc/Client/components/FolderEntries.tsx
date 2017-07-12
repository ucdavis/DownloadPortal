import * as React from 'react';
import { Link } from 'react-router-dom';
import { FolderEntry } from './FolderEntry';
import { FolderParent } from './FolderParent';
import {listStyle, iconStyle } from './FolderView';

export class FolderEntries extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        let entryList = this.props.data.item_collection.entries.map((entry, index) =>
            <FolderEntry key={index} entry={entry} />
        );
        if (this.props.data.parent) {
            return (
                <ul style={listStyle}>
                    <li><FolderParent data={this.props.data} /></li>
                    <ul style={listStyle}>
                        <li><i className="fa fa-folder-open" aria-hidden="true" style={iconStyle}></i>{this.props.data.name}</li>
                        <ul style={listStyle}>
                            {entryList}
                        </ul>
                    </ul>
                </ul>       
            );
        }
        else {
            return (
                    <ul style={listStyle}>
                        <li><i className="fa fa-folder-open" aria-hidden="true" style={iconStyle}></i>{this.props.data.name}</li>
                        <ul style={listStyle}>
                            {entryList}
                        </ul>
                    </ul>
            );
        }
    }
}
