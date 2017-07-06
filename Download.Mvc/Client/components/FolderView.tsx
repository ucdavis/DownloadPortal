import * as React from 'react';
import { match } from 'react-router-dom';

interface IRouteParams {
    id: string
}

export interface IProps {
    match: match<IRouteParams>
}

export class FolderView extends React.Component<IProps, any> {
    componentDidMount = () => {
        alert('mounted');
    }
    render() {

        return <div>
            <h1>Viewing folder {this.props.match.params.id}!</h1>
        </div>;
    }
}
