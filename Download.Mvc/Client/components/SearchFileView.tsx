import * as React from 'react';
import { Link } from 'react-router-dom';
import { FileIcon } from './FileIcon';

export class SearchFileView extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.entry);
        return (
            <li>
                <Link to={`/folder/${this.props.entry.folderId}/${this.props.entry.folderName}#${this.props.entry.fileId}`}>
                    <FileIcon fileName={this.props.entry.fileName} /> {this.props.entry.fileName}
                </Link>
            </li>
        );
    }
}