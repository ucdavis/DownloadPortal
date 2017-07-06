import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FolderView } from './components/FolderView';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/folder/:id' component={FolderView} />
</Layout>;
