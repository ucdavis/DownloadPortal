import * as React from 'react';
import { Link } from 'react-router-dom';
import { SearchFileList } from './SearchFileList';

export class SearchEntry extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    _renderFileList = (fileList) => {
        return (
            <div className="well well-sm">                    
                <ul className="list-unstyled">
                    {fileList}
                </ul>
            </div>
        );
    }

    render() {
        if (!this.props.entry.files) {
            return;
        }
        let fileList = this.props.entry.files.map((entry, index) =>
            <SearchFileList key={index} entry={entry} />
        );
        return (
            <tr>
                <td className="icon">
                    <i className="fa fa-folder-o" />
                </td>
                <td>
                    <Link to={`/folder/${this.props.entry.folder.folderId}/${this.props.entry.folder.folderName}`}>
                        {this.props.entry.folder.folderName}
                    </Link>
                    {this._renderFileList(fileList)}
                </td>
            </tr>
        );
    }
}