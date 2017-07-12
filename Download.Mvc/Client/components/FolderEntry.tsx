import * as React from 'react';
import { Link } from 'react-router-dom';
import { iconStyle } from './FolderView';

export class FolderEntry extends React.Component<any, any>{
    render() {
        return (
            <li>
                {this.props.entry.type === 'folder' &&
                    <div>
                    <i className="fa fa-folder" aria-hidden="true" style={iconStyle}></i>
                        <Link to={this.props.entry.id}>{this.props.entry.name}</Link>
                     </div>}
                {this.props.entry.type === 'file' &&
                    <div>
                    <i className="fa fa-file-o" aria-hidden="true" style={iconStyle}></i>
                    <Link to={`../file/${this.props.entry.id}`}>{this.props.entry.name}</Link>
                    </div>}
            </li>
        );
    }
}
