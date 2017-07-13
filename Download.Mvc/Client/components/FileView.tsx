import * as React from 'react';
import 'isomorphic-fetch';
import Dialog from 'react-toolbox/lib/dialog';
import { FileDownload } from './FileDownload';
import { iconStyle, listStyle } from './FolderView';
import { FilePreview } from './FilePreview';

export class FileView extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            active: false,
            download: false
        };
    }

    handleToggle = () => {
        this.setState({ active: !this.state.active });
    }

    downloadLink = () => {
        this.setState({ download: true, active: false });
    }

    actions = [
        { label: "Cancel", onClick: this.handleToggle },
        { label: "Agree", onClick: this.downloadLink }
    ];

    componentDidMount = () => {
        // go grab the file info we are looking at
        fetch('/api/file/' + this.props.data.id, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data }));

        }

    render() {
        return (
            <div>
                <i className="fa fa-file-o" style={iconStyle}></i>
                <a href="#" label='Show download info' onClick={this.handleToggle}>
                    {this.props.data.name}
                </a>
                    {this.state.active &&
                        <Dialog
                            actions={this.actions}
                            active={this.state.active}
                            onEscKeyDown={this.handleToggle}
                            onOverlayClick={this.handleToggle}
                            title='Download Agreement'
                            >
                            <h4>{this.props.data.name}</h4>
                            <p>{this.state.data.description}</p>
                            <FilePreview id={this.props.data.id} />

                        </Dialog>
                    }
                {!this.state.active && this.state.download &&
                    <FileDownload id={this.props.data.id} />
                }
            </div>);
    }
}
