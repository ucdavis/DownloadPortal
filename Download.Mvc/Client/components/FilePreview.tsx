import * as React from 'react';
import 'isomorphic-fetch';

export class FilePreview extends React.Component<any, any>{
    constructor(props) {
        super(props);

        const name = props.name || 'README.md';
        this.state = {
            link: '',
            name
        };
    }
    componentDidMount = () => {
        if (!this.props.id)
            return;
        fetch(`/api/PreviewFile/${this.props.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(link => this.setState({ link }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id === this.props.id)
            return;
        fetch(`/api/PreviewFile/${nextProps.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(link => this.setState({ link }));
    }
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><i className="fa fa-file-text-o"/> {this.state.name}</div>
                <div className="panel-body">
                    <iframe src={this.state.link} height="600px" width="100%" frameBorder="none" ></iframe>
                </div>
            </div>
        );
    }
}