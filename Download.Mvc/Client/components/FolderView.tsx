import * as React from 'react';
import { match } from 'react-router-dom';
import 'isomorphic-fetch';
import { FolderEntries } from './FolderEntries';
import { Link } from 'react-router-dom';

interface IRouteParams {
    id: string
}

export interface IProps {
    match: match<IRouteParams>
}

export class FolderView extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                item_collection: {
                    total_count: 0,
                    entries: []
                },
                parent: {
                    id: 0
                }
            },
            licenseID: null,
            readmeID: null,
            query: ''
        };
    }

    getLicenseID = (id) => {
        this.setState({ licenseID: id });
    }

    getReadmeID = (id) => {
        this.setState({ readmeID: id });
    }

    handleChange = (e) => {
        this.setState({ query: e.target.value });
    }

    handleSubmit = (e) => {
        let link = "../../search/" + this.state.query;
        window.location.href = link;
    }

    componentDidMount = () => {
        // go grab the folder info we are looking at
        fetch(`/api/folder/${this.props.match.params.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id === this.props.match.params.id)
            return;
        fetch(`/api/folder/${nextProps.match.params.id}`, { credentials: 'same-origin' })
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        return (
            <div>
                <form>
                <input type="text" value={this.state.query} placeholder="Search . . ." onChange={this.handleChange} />
                <Link to={`../../search/${this.state.query}`}>
                    <button type="submit" value="Submit">
                        <i className="fa fa-search"></i>
                    </button>
                </Link>
                </form>
                <FolderEntries data={this.state.data} getLicenseID={this.getLicenseID} licenseID={this.state.licenseID} getReadmeID={this.getReadmeID} readmeID = { this.state.readmeID } />
            </div>
        );
    }
}

