import * as React from 'react';
import { Link } from 'react-router-dom';

export class FolderParent extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                { this.props.data.parent &&
                    <div>
                        
                        <Link to={`../folder/${this.props.data.parent.id}`}>
                        <i className="fa fa-folder" aria-hidden="true"></i>
                        ..</Link>
                    </div>}
            </div>       
            );
    }
}