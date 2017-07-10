import * as React from 'react';
import { Link } from 'react-router-dom';

export class FolderEntry extends React.Component<any, any>{
    render() {

        return (
            <tr>
                {this.props.entry.type === 'folder' &&
                    <td>
                        <i className="fa fa-folder" aria-hidden="true"></i>
                        <Link to={this.props.entry.id}> {this.props.entry.name}</Link>
                     </td>}
                {this.props.entry.type === 'file' &&
                    <td><i className="fa fa-file-o" aria-hidden="true"></i> {this.props.entry.name}</td>}
            </tr>
        );
    }
}
