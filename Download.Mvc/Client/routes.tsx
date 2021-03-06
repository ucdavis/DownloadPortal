import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FolderView } from './components/FolderView';
import { Search } from './components/Search';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/folder/:id/' component={FolderView} />
    <Route path='/search/:query?' component={Search} />
</Layout>;
