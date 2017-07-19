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

    handleSubmit = (e) => {
        window.location.href = "../../search/" + encodeURIComponent(this.state.query);
    }
    render() {
        return (
            <form>
                <input type="text" value={this.state.query} placeholder="Search . . ." onChange={this.handleChange} />
                <Link to={`../../search/${this.state.query}`}>
                    <button type="submit" value="Submit">
                        <i className="fa fa-search"></i>
                    </button>
                </Link>
            </form>
        );
    }
}