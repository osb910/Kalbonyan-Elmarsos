import {StorageStack} from './StorageStack';
import {ApiStack} from './ApiStack';
import {AuthStack} from './AuthStack';

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
