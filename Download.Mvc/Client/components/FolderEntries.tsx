﻿import * as React from 'react';
import { FolderEntry } from './FolderEntry';
import { FolderParent } from './FolderParent';
import { FilePreview } from './FilePreview';

export class FolderEntries extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    _renderParent = () => {
        if (!this.props.data.parent) return null; // top level folder w/ no parent

        return <FolderParent data={this.props.data} />;
    }

    render() {
        let entryList = this.props.data.item_collection.entries.map((entry, index) =>
            <FolderEntry key={index} entry={entry} updateReadmeID={this.props.getReadmeID} updateLicenseID={this.props.getLicenseID} licenseID={this.props.licenseID} readmeID={this.props.readmeID}/>
        );

        return (
            <table className="table">
                <tbody>
                    {this._renderParent()}
                    {entryList}
                </tbody>
            </table>
        )
    }
}
