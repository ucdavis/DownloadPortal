import * as React from 'react';
import 'isomorphic-fetch';

export class FilePreview extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            link: '',
        };
    }
    componentDidMount = () => {
        // grab link to download
        fetch('/api/previewFile/' + this.props.id, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(link => this.setState({ link }))
            .then(loading => this.setState({ loading: false }));
    }

    render() {
        return (
            <div>
                <h3>Preview</h3>
                <iframe src={this.state.link} height="500px" width="700px"></iframe>
            </div>
        );
    }
}