import * as React from 'react';
import { Link } from 'react-router-dom';

export class FolderParent extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    render() {
        const iconStyle = {
            'padding': '0px 5px 0px 0px'
        };
        return (
            <div>
                {
                    this.props.data.parent && <div><i className="fa fa-folder" aria-hidden="true" style={iconStyle}></i>
                        <Link to={`../folder/${this.props.data.parent.id}`}>{this.props.data.parent.name}</Link></div>
                }
            </div>       
            );
    }
}