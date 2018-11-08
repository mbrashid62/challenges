/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { resolve } from 'path';
import apiRoutes from './api';
import webpack from 'webpack';
import config from '../webpack.config';

const compiler = webpack(config);

const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(logger('tiny'))
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use('/api', apiRoutes)

  .get('/*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'public', 'index.html'));
  })
  .use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack);
    res.status(err.status || 500).send('We have a problem!');
  })
  .listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
