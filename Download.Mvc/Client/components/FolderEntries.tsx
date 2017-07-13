import * as React from 'react';
import { FolderEntry } from './FolderEntry';
import { FolderParent } from './FolderParent';
import { FilePreview } from './FilePreview';

export class FolderEntries extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        let entryList = this.props.data.item_collection.entries.map((entry, index) =>
            <FolderEntry key={index} entry={entry} updateReadmeID={this.props.getReadmeID} updateLicenseID={this.props.getLicenseID} licenseID={this.props.licenseID} readmeID={this.props.readmeID}/>
        );

        if (this.props.data.parent) {
            return (
                <div>
                    <h1>Viewing folder {this.props.data.name}!</h1>
                    <ul>
                        <li><FolderParent data={this.props.data} /></li>
                            <ul>
                                <li><i className="fa fa-folder-open" aria-hidden="true"></i>{this.props.data.name}</li>
                                <ul>
                                    {entryList}
                                </ul>
                            </ul>
                    </ul>
                <FilePreview id={this.props.readmeID} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>Viewing folder {this.props.data.name}!</h1>
                    <ul>
                        <li><i className="fa fa-folder-open" aria-hidden="true"></i>{this.props.data.name}</li>
                        <ul>
                            {entryList}
                        </ul>
                    </ul>
                    <FilePreview id={this.props.readmeID} />
                </div>
            );
        }
    }
}
