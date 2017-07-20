import * as React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumbs = (props) => {
    const path = props.data.path_collection;

    if (!path) return null;
    
    const pathList = path.entries.map((p, i) => {
        return <li key={p.id}><Link to={`/folder/${p.id}/${p.name}`}>{p.name}</Link></li>;
    });

    // add in the current directory
    pathList.push(
        <li key={props.data.id} className="active">{props.data.name}</li>
    );

    return <ol className="breadcrumb">{pathList}</ol>;
}