import * as React from 'react';
import 'isomorphic-fetch';

export class FileDownload extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            link: '',
            loading: true
        };
    }
    componentDidMount = () => {
        // grab link to download
        fetch(`/api/downloadFile/${this.props.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(link => this.setState({ link, loading: false}))
            .then(this.onLoad);
    }
    onLoad = () => {
        window.location.href = this.state.link;
    }

    render() {
        return (
            <div>
                {this.state.loading &&
                    <h3>Download Loading . . .</h3>
                }
            </div>
        );
    }
}