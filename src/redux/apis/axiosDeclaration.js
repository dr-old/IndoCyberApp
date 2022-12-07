import defaultAxios from 'axios';
import env from '../../utils/env';

const axios = defaultAxios.create(env.CONFIG);
const axiosMaps = defaultAxios.create(env.CONFIGMAPS);

export {axios, axiosMaps};
