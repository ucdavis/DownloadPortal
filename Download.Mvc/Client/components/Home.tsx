import * as React from 'react';
import { Redirect } from 'react-router-dom';
declare var window: any;

export class Home extends React.Component<{}, {}> {
    render() {
        return <Redirect to={{
        pathname: `/folder/${window.App.defaultFolderId}/Download`,
      }}/>
    }
}
