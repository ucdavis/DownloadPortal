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
        if (this.props.id) {
            fetch('/api/previewFile/' + this.props.id, { credentials: 'same-origin' })
                .then(response => response.json())
                .then(link => this.setState({ link }));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            fetch('/api/previewFile/' + nextProps.id, { credentials: 'same-origin' })
                .then(response => response.json())
                .then(link => this.setState({ link }));
        }
    }
    render() {
        return (
            <div>
                <iframe src={this.state.link} height="600px" width="100%" frameBorder="none" ></iframe>
            </div>
        );
    }
}