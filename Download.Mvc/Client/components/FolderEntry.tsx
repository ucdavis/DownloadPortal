import * as React from 'react';
import { Link } from 'react-router-dom';
import { FileView } from './FileView';

export class FolderEntry extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        if (this.props.entry.name === 'README.md')
        {
            this.props.updateReadmeID(this.props.entry.id);
        }
        if (this.props.entry.name === 'LICENSE.txt')
        {
            this.props.updateLicenseID(this.props.entry.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.entry.id !== nextProps.entry.id) {
            if (nextProps.entry.name === 'README.md') {
                this.props.updateReadmeID(nextProps.entry.id);
            }
            if (nextProps.entry.name === 'LICENSE.txt') {
                this.props.updateLicenseID(nextProps.entry.id);
            }
        }
    }

    render() {
        return (
            <li>
                {this.props.entry.type === 'folder' &&
                    <div>
                        <Link to={`../${this.props.entry.id}/${encodeURIComponent(this.props.entry.name)}`}>
                        <i className="fa fa-folder" aria-hidden="true"></i>
                        {this.props.entry.name}</Link>
                     </div>}
                {this.props.entry.type === 'file' && this.props.entry.name !== 'README.md' && this.props.entry.name !== 'LICENSE.txt' &&
                    <div>
                    <FileView data={this.props.entry} licenseID={this.props.licenseID} readmeID={this.props.readmeID}/>
                    </div>}
            </li>
        );
    }
}
