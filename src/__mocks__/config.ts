import { v4 as uuid } from 'uuid';

const { mongo, ...otherConfigs } = jest.requireActual('../config.ts').default;

mongo.name += `-test-${uuid()}`;

export default {
  mongo,
  ...otherConfigs,
};
