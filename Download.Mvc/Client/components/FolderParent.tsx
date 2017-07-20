import * as React from 'react';
import { Link } from 'react-router-dom';

export class FolderParent extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <tr>
                <td>
                    <i className="fa fa-folder" aria-hidden="true"></i>
                </td>
                <td>
                    <Link to={`../${this.props.data.parent.id}/${this.props.data.parent.name}`}>
                        ..   
                    </Link>
                </td>
            </tr>
        );
    };
}