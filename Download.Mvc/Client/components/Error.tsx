import * as React from 'react';

export const Error = (props) => {
    return (
        <div>
            <h1>Oops, something went wrong</h1>
            <button onClick={_ => window.location.reload()} className="btn btn-primary">
                Let's try this again
            </button>
        </div>
    );
}