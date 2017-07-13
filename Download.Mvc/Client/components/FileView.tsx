import * as React from 'react';
import 'isomorphic-fetch';
import Dialog from 'react-toolbox/lib/dialog';
import { FileDownload } from './FileDownload';
import { FilePreview } from './FilePreview';

export class FileView extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            download: false
        };
    }

    handleToggle = () => {
        this.setState({ active: !this.state.active, download: false });
    }

    downloadLink = () => {
        this.setState({ download: true, active: false });
    }

    actions = [
        { label: "Cancel", onClick: this.handleToggle },
        { label: "Agree", onClick: this.downloadLink }
    ];

    render() {
        return (
            <div>
                <a href="#" label='Show download info' onClick={this.handleToggle}>
                    <i className="fa fa-file-o"></i>
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
                            <FilePreview id={this.props.licenseID} />
                        </Dialog>
                    }
                {!this.state.active && this.state.download &&
                    <FileDownload id={this.props.data.id} />
                }
            </div>);
    }
}
