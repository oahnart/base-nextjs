import axios from 'axios';
import dataCode from '@/common/constants/codeError.json';
import { UrlInternal } from '@/common/constants/endpoints';
import Cookies from 'js-cookie';
import { TOKEN } from '@/utils/Cookies/type';

const jwt = require('jsonwebtoken');

// const { REACT_APP_API_SERVER } = process.env;

export const BASE_URL = "https://api.devartnguide.com/api/v1"; 

const accessToken = Cookies.get(TOKEN);

const _axios = axios.create({
  baseURL: BASE_URL,
});

const mainAxios = {
  request: async (parameter: any) => {
    const {
      methodType,
      url,
      payload,
      requiresToken,
      config,
      notError,
      getError,
      params,
    } = parameter;

    return new Promise((resolve, reject) => {
      // axios request default options
      const headers = config && config.headers ? config.headers : {};

      if (headers.contentType) {
        headers['Content-Type'] = headers.contentType;
        delete headers.contentType;
      } else {
        headers['Content-Type'] = 'application/json';
      }

      // if API endpoint requires a token
      if (requiresToken) {
        const decoded = jwt.decode(accessToken);
        if (new Date(decoded?.exp * 1000) < new Date()) {
          Cookies.remove(TOKEN);
          window.location.href = UrlInternal.LOGIN
          // message.warning("token expires");
        }

        if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
      }

      _axios
        .request({
          url,
          method: methodType,
          data: payload,
          headers,
          params,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 401) {
              if (accessToken) {
                Cookies.remove(TOKEN)
                window.location.reload();
              }
            } else if (!notError) {
              const data: any = dataCode;
              const errData = err.response.data;
              console.log("data[errData.errorCode?.trim()]",data[errData.errorCode?.trim()]);
              
              // message.info(data[errData.errorCode?.trim()]);
              resolve({ data: { datas: [] }, error: err.response.data });
            } else if (getError) {
              resolve({ data: { datas: [] }, error: err.response.data });
            }
          }
          reject(err);
        });
    });
  },

  async getRequest(parameter: any) {
    parameter.methodType = 'GET';
    return this.request(parameter);
  },

  async postRequest(parameter: any) {
    parameter.methodType = 'POST';
    return this.request(parameter);
  },

  async putRequest(parameter: any) {
    parameter.methodType = 'PUT';
    return this.request(parameter);
  },

  async patchRequest(parameter: any) {
    parameter.methodType = 'PATCH';
    return this.request(parameter);
  },

  async deleteRequest(parameter: any) {
    parameter.methodType = 'DELETE';
    return this.request(parameter);
  },
};

export { mainAxios };
