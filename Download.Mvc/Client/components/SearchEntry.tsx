import * as React from 'react';
import { Link } from 'react-router-dom';
import { SearchFileList } from './SearchFileList';

export class SearchEntry extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        let fileList = "";
        if (this.props.entry.files) {
            fileList = this.props.entry.files.map((entry, index) =>
                <SearchFileList key={index} entry={entry} />);      
                }
        return (

            <li>
                    <div>
                        <Link to={`../folder/${this.props.entry.folder.folderId}/${this.props.entry.folder.folderName}`}>
                        <i className="fa fa-folder" aria-hidden="true"></i>
                        {this.props.entry.folder.folderName}</Link>
                        {fileList}
                    </div>
            </li>
        );
    }
}