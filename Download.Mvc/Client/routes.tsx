import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FolderView } from './components/FolderView';
import { FileView } from './components/FileView';
import { FileDownload } from './components/FileDownload';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/folder/:id' component={FolderView} />
    <Route path='/file/:id' component={FileView} />
    <Route path='/downloadFile/:id' component={FileDownload} />
</Layout>;
