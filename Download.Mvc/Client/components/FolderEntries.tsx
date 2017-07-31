import * as React from 'react';
import { FolderEntry } from './FolderEntry';
import { FolderParent } from './FolderParent';
import { FilePreview } from './FilePreview';

declare var window: any;

export class FolderEntries extends React.Component<any, any>{
    constructor(props) {
        super(props);

        const readme = this.props.data.item_collection.entries.filter(f => f.name === "README.md");

        this.state = {
            readme,
            defaultReadmeId: window.App.defaultReadmeId
        };    
    }
    
    componentWillReceiveProps = (nextProps) => {
        if (!this.props.data || nextProps.data === this.props.data) return null;
        this.setState({ readme: nextProps.data.item_collection.entries.filter(f => f.name === "README.md") });
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
                {this.state.readme && this.state.readme.length > 0 &&
                    <FilePreview id={this.state.readme[0].id} />}
                {this.state.readme && this.state.readme.length < 1 && this.state.defaultReadmeId &&
                    <FilePreview id={this.state.defaultReadmeId} />}
            </div>
        );
    }
}
