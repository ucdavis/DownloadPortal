import * as React from 'react';
import { Link } from 'react-router-dom';

export class FolderParent extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {
                    this.props.parent && <div><i className="fa fa-folder-open" aria-hidden="true"></i>
                        <Link to={`../folder/${this.props.parent.id}`}>..</Link> </div>}
            </div>       
            );
    }
}