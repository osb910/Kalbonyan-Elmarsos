import {ApiStack} from './ApiStack';
import {StorageStack} from './StorageStack';
import {AuthStack} from './AuthStack';
import {App} from '@serverless-stack/resources';

/**
 * @param {App} app
 */
const main = app => {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'services',
    bundle: {
      format: 'esm',
    },
  });
  app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
};

export default main;
