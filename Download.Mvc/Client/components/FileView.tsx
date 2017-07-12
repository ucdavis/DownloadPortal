import * as React from 'react';
import { match, Link} from 'react-router-dom';
import 'isomorphic-fetch';
import Dialog from 'react-toolbox/lib/dialog';
import { FolderParent } from './FolderParent';
import { FileDownload } from './FileDownload';
import { IProps } from './FolderView';

export class FileView extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            active: false,
            dowload: false
        };
    }

    handleToggle = () => {
        this.setState({ active: !this.state.active });
    }

    downloadLink = () => {
        //window.open('../downloadFile/' + this.props.match.params.id, '_blank');
        this.setState({ download: true, active: false });
    }

    actions = [
        { label: "Cancel", onClick: this.handleToggle },
        { label: "Agree", onClick: this.downloadLink }
    ];

    componentDidMount = () => {
        // go grab the file info we are looking at
        fetch('/api/file/' + this.props.match.params.id, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data }));

        }

    render() {
        const iconStyle = {
            padding: 5
        };
        return (
            <div>
                <h1>Viewing file {this.state.data.name}!</h1>
                <FolderParent parent={this.state.data.parent} />

                <p>File Id: {this.props.match.params.id} <br />
                    <button label='Show my dialog' onClick={this.handleToggle}>
                        <i className="fa fa-download" aria-hidden="true" style={iconStyle}></i>
                        Download File
                    </button>
                </p>
                {this.state.active &&
                    <div>

                        <Dialog
                            actions={this.actions}
                            active={this.state.active}
                            onEscKeyDown={this.handleToggle}
                            onOverlayClick={this.handleToggle}
                            title='My awesome dialog'
                    >
                            <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>

                        </Dialog>
                    </div>}
                {!this.state.active && this.state.download &&
                    <FileDownload id={this.props.match.params.id} />
                }
            </div>);
    }
}
