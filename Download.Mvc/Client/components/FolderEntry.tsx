import * as React from 'react';
import { Link } from 'react-router-dom';
import { FileIcon } from './FileIcon';
import { FileView } from './FileView';

export class FolderEntry extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.entry.type === 'folder') {
            return (
                <tr>
                    <td className="icon">
                        <i className="fa fa-folder-o" />
                    </td>
                    <td>
                        <Link to={`../${this.props.entry.id}/${encodeURIComponent(this.props.entry.name)}`}>
                            {this.props.entry.name}
                        </Link>
                    </td>
                </tr>
            );
        } else if (this.props.entry.type === 'file') {
            // TODO: decide if we want to show readme & license
            return (
                <tr className={this.props.highlight && 'warning'}>
                    <td className="icon">
                        <FileIcon fileName={this.props.entry.name} />
                    </td>
                    <td>
                        <FileView data={this.props.entry} readmeID={this.props.readmeID}/>
                    </td>
                </tr>
            );
        } else {
            // shouldn't ever happen
            return null;
        }
    }
}
