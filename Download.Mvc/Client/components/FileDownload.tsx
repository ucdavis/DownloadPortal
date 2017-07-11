import * as React from 'react';
import { match , history} from 'react-router-dom';
import 'isomorphic-fetch';
import Dialog from 'react-toolbox/lib/dialog';

export class FileDownload extends React.Component<any, any>{
    state = {
        active: false
    };

    handleToggle = () => {
        this.setState({ active: !this.state.active });
    }

    downloadLink = () => {
        location.href = this.props.link;
    }

    actions = [
        { label: "Cancel", onClick: this.handleToggle },
        { label: "Agree", onClick: this.downloadLink }
    ];

    render() {
        return (
            <div>
                <button label='Show my dialog' onClick={this.handleToggle}>
                    <i className="fa fa-download" aria-hidden="true"></i>
                </button>
                <Dialog
                    actions={this.actions}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title='My awesome dialog'
                >
                    <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
                </Dialog>
            </div>
        );
    }
}