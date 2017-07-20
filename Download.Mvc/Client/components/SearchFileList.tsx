import * as React from 'react';
import { Link } from 'react-router-dom';
import { FileIcon } from './FileIcon';

export class SearchFileList extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <FileIcon fileName={this.props.entry.fileName} /> {this.props.entry.fileName}
            </li>
        );
    }
}