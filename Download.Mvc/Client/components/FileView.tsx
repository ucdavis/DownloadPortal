import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import { FileDownload } from './FileDownload';
import { FolderParent } from './FolderParent';

interface IRouteParams {
    id: string
}

export interface IProps {
    match: match<IRouteParams>
}

export class FileView extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            link: ''
        };
    }

    componentDidMount = () => {
        // go grab the file info we are looking at
        fetch('/api/file/' + this.props.match.params.id, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data }));
        // grab link to download
        fetch('/api/downloadFile/' + this.props.match.params.id, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(link => this.setState({ link }));
    }

    render() {
        return <div>
            <h1>Viewing file {this.state.data.name}!</h1>
            <p>File Id: {this.props.match.params.id}</p>
            <FolderParent parent={this.state.data.parent} />
            <FileDownload link={this.state.link}/>
        </div>;
    }
}
