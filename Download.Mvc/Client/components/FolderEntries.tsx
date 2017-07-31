import * as React from 'react';
import { FolderEntry } from './FolderEntry';
import { FolderParent } from './FolderParent';
import { FilePreview } from './FilePreview';

declare var window: any;

export class FolderEntries extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            defaultReadmeId: window.App.defaultReadmeId
        };
    }
    componentDidMount = () => {
        if (!this.props.data) return null;
        this.setState({ entries: this.props.data.item_collection.entries.filter(f => f.name === "README.md") });
    }

    componentWillReceiveProps = (nextProps) => {
        if (!this.props.data || nextProps.data === this.props.data) return null;
        this.setState({ entries: nextProps.data.item_collection.entries.filter(f => f.name === "README.md") });
    }

    _renderParent = () => {
        if (!this.props.data.parent) return null; // top level folder w/ no parent

        return <FolderParent data={this.props.data} />;
    }

    render() {
        let entryList = this.props.data.item_collection.entries.map((entry, index) =>
                <FolderEntry key={index} entry={entry} highlight={entry.id === this.props.highlightFile} />
            );

        return (
            <div>
                <table className="table">
                    <tbody>
                        {this._renderParent()}
                        {entryList}
                    </tbody>
                </table>
                {this.state.entries && this.state.entries.length > 0 &&
                    <FilePreview id={this.state.entries[0].id} />}
                {this.state.entries && this.state.entries.length < 1 && 
                    <FilePreview id={this.state.defaultReadmeId} />}
            </div>
        );
    }
}
