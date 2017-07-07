import * as React from 'react';

export interface ILayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<ILayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
             { this.props.children }
            </div>
        </div>;
    }
}
