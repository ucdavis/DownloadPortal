import * as React from 'react';
import { Link } from 'react-router-dom';

export class FolderParent extends React.Component<any, any>{
    render() {
        return (
            <div>
                {
                    this.props.parent.id !== 0 && <p><i className="fa fa-folder-open" aria-hidden="true"></i>
                        <Link to={`folder/:${this.props.parent.parent.id}`}>..</Link></p>}
            </div>       
            );
    }
}