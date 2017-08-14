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
            <form className="form" action={`../../search/${encodeURIComponent(this.state.query)}`} method="get">
                <div className="row">
                    <div className="col-lg-6 pull-right">
                        <div className="input-group">
                            <input type="text" className="form-control" value={this.state.query} placeholder="Search . . ." onChange={this.handleChange} />
                                {this.state.query &&
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-default">Go!</button>
                                    </span>}
                                {!this.state.query &&
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-default" disabled>Go!</button>
                                    </span>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
