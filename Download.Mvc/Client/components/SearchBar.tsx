import * as React from 'react';
import { Link } from 'react-router-dom';

export class SearchBar extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }
    handleChange = (e) => {
        this.setState({ query: e.target.value });
    }

    render() {
        return (
            <form action={`../../search/${encodeURIComponent(this.state.query)}`} method="get">
                <input type="text" value={this.state.query} placeholder="Search . . ." onChange={this.handleChange} />
                <Link to={`../../search/${encodeURIComponent(this.state.query)}`}>
                    <button>
                        <i className="fa fa-search"></i>
                    </button>
                </Link>
            </form>
        );
    }
}