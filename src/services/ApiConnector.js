import axios from 'axios';

export const axiosInstance=axios.create({});

const ApiConnector = (method,url,bodyData,headers,params) => {
  return axiosInstance({
    method:`${method}`,
    url:`${url}`,
    data:bodyData?bodyData:null,
    headers:headers?headers:null,
    params:params?params:null
  })
}

export default ApiConnector;
