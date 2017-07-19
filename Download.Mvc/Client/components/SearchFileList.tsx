import * as React from 'react';
import { Link } from 'react-router-dom';

export class SearchFileList extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (

                <ul><i className="fa fa-file-o" aria-hidden="true"></i>
                    {this.props.entry.fileName}</ul>
        );
    }
}