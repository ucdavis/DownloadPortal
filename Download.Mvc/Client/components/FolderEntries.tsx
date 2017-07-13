import * as React from 'react';
import { FolderEntry } from './FolderEntry';
import { FolderParent } from './FolderParent';
import { listStyle, iconStyle } from './FolderView';
import { FilePreview } from './FilePreview';

export class FolderEntries extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.getReadmeID = this.getReadmeID.bind(this);

        this.state = {
            readmeID: null,
            licenseID: null
        };
    }

    getReadmeID = (id) => {
        this.setState({readmeID: id});
    }

    getLicenseID = (id) => {
        this.setState({ licenseID: id });
    }

    render() {
        let entryList = this.props.data.item_collection.entries.map((entry, index) =>
            <FolderEntry key={index} entry={entry} updateReadmeID={this.getReadmeID} updateLicenseID={this.getLicenseID} licenseID={this.state.licenseID}/>
        );

        if (this.props.data.parent) {
            return (
                <div>
                    <h1>Viewing folder {this.props.data.name}!</h1>
                    <ul style={listStyle}>
                        <li><FolderParent data={this.props.data} /></li>
                            <ul style={listStyle}>
                                <li><i className="fa fa-folder-open" aria-hidden="true" style={iconStyle}></i>{this.props.data.name}</li>
                                <ul style={listStyle}>
                                    {entryList}
                                </ul>
                            </ul>
                    </ul>
                <FilePreview id={this.state.readmeID} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>Viewing folder {this.props.data.name}!</h1>
                    <ul style={listStyle}>
                        <li><i className="fa fa-folder-open" aria-hidden="true" style={iconStyle}></i>{this.props.data.name}</li>
                        <ul style={listStyle}>
                            {entryList}
                        </ul>
                    </ul>
                    <FilePreview id={this.state.readmeID} />
                </div>
            );
        }
    }
}
