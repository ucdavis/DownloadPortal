import * as React from 'react';
import { Link } from 'react-router-dom';

export class SearchEntry extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                {this.props.entry.type === 'folder' &&
                    <div>
                        <Link to={`../folder/${this.props.entry.id}/${encodeURIComponent(this.props.entry.name)}`}>
                            <i className="fa fa-folder" aria-hidden="true"></i>
                            {this.props.entry.name}</Link>
                    </div>}
                {this.props.entry.type === 'file' && this.props.entry.name !== 'LICENSE.txt' &&
                    <div>
                        <Link to={`../folder/${this.props.entry.parent.id}/${encodeURIComponent(this.props.entry.parent.name)}`}>
                        <i className="fa fa-folder" aria-hidden="true"></i>
                        {this.props.entry.parent.name}</Link>

                        <ul><i className="fa fa-file-o" aria-hidden="true"></i>
                        {this.props.entry.name}</ul>
                    </div>}
            </li>
        );
    }
}