import {BaseURL, axios} from './config';

//----------------------------------控制器列表---------------------------------------------
export const getDeviceList = params => { return axios.get(`${BaseURL}/device/listByPage`, { params: params })};
//----------------------------------根据用户登录账号获取orgId---------------------------------------------
export const getOrgIdByAccount = params => { return axios.get(`${BaseURL}/account/findOrgId`, { params: params },{withCredentials:true})};

//-----------------------------------删除控制器---------------------------------------------
export const removeDeviceById = params => {  return axios.post(`${BaseURL}/device/delete`, params )};


//-----------------------------------新增控制器---------------------------------------------
export const addDevice = params => { return axios.post(`${BaseURL}/device/addClass`,  params)};

//-----------------------------------生成二维码编号---------------------------------------------
export const addQr = params => { return axios.get(`${BaseURL}/text/wei`,  { params: params })};

//-----------------------------------更新控制器---------------------------------------------
export const updateDevice = params => { return axios.post(`${BaseURL}/device/modify`,  params)};
//----------------------------------获取菜单列表---------------------------------------------
export const getMenuData = params => { return axios.get(`${BaseURL}/resource/list`, { params: params })};
//---------------------------------登录----------------------------------------------
export const signIn = params => { return axios.post(`${BaseURL}/account/signin`, params,{crossDomain:true,
  xhrFields: {  withCredentials: true  }})};

