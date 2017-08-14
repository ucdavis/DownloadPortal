import * as React from 'react';

export class ErrorView extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.status == 403) {
            return(
                <div>
                    <h1>You are not authorized to access this page.</h1>
                </div>
            );
        }
        return (
            <div>
                <h1>Oops, something went wrong</h1>
                <button onClick={_ => window.location.reload()} className="btn btn-primary">
                    Let's try this again
            </button>
            </div>
        );
    }
}