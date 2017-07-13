import * as React from 'react';
import { Link } from 'react-router-dom';
import { iconStyle } from './FolderView';
import { FileView } from './FileView';

export class FolderEntry extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.updateReadmeID = this.updateReadmeID.bind(this);
        this.updateLicenseID = this.updateLicenseID.bind(this);
    }

    updateReadmeID(newID) {
        this.props.updateReadmeID(newID);
    }

    updateLicenseID(newID) {
        this.props.updateLicenseID(newID);
    }

    componentWillMount = () => {
        if (this.props.entry.name === 'README.md')
        {
            this.updateReadmeID(this.props.entry.id);
        }
        if (this.props.entry.name === 'LICENSE.txt')
        {
            this.updateLicenseID(this.props.entry.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.entry.id !== nextProps.entry.id) {
            if (nextProps.entry.name === 'README.md') {
                this.updateReadmeID(nextProps.entry.id);
            }
            if (nextProps.entry.name === 'LICENSE.txt') {
                this.updateLicenseID(nextProps.entry.id);
            }
        }
    }

    render() {
        return (
            <li>
                {this.props.entry.type === 'folder' &&
                    <div>
                    <i className="fa fa-folder" aria-hidden="true" style={iconStyle}></i>
                    <Link to={this.props.entry.id}> { this.props.entry.name }</Link>
                     </div>}
                {this.props.entry.type === 'file' &&
                    <div>
                    <FileView data={this.props.entry} licenseID={this.props.licenseID} readmeID={this.props.readmeID}/>
                    </div>}
            </li>
        );
    }
}
