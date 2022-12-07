import {axios, axiosMaps} from './axiosDeclaration';

export const getApiMaps = async payload => {
  try {
    let params = payload.data ? {params: payload.data} : '';
    const response = await axiosMaps.get(payload.link, params);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const getApi = async payload => {
  try {
    let params = payload.data ? {params: payload.data} : '';
    const response = await axios.get(payload.link, params);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const postApi = async payload => {
  try {
    const response = await axios.post(payload.link, payload.data);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const patchApi = async payload => {
  try {
    const response = await axios.patch(payload.link, payload.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};
