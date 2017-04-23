import "es6-promise";
import "whatwg-fetch";
import {Message} from "element-ui";
import qs from "querystring";
import isEmpty from "lodash.isempty";
import * as API from "config/ports";

const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};
//异步请求数据
const request = (url, params, method = METHODS.GET, jsonType = false) =>{
    var options = {
        headers: {
            'Content-Type': jsonType ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        method: method,
        credentials: 'include'
    };
    if(method !== METHODS.GET && !isEmpty(params)){
        options.body = jsonType ? JSON.stringify(params) : qs.stringify(params)
    }else if(method === METHODS.GET && !isEmpty(params)){
        url += ('?' + qs.stringify(params));
    }
    return fetch(url, options).then(checkRespStatus);
};

const post = (url, params) => request(url, params, METHODS.POST, true);

// check resp status
const checkRespStatus = (respPromise) =>{
    if(respPromise.status !== 200){
        return Promise.reject('Server error occurred');
    }
    return respPromise.json().then(resp =>{
        return new Promise((resolve, reject) =>{
            if(resp && resp.code == API.CODE_SUCCESS){
                resolve(resp.data);
            }else if(typeof(resp) === 'string' && resp.indexOf('InvalidSession') > -1){
                window.location.reload();
            }else{
                resp.msg && Message({message: resp.msg, type: 'error', showClose: true});
                // reject(resp);
                return;
            }
        });
    });
};

//vuex action
export const createAction = (type, payloadCreator, metaCreator) =>{
    const identity = (...args) => args[0];
    const isFunc = (fn) => typeof(fn) === 'function';
    const isPromise = obj => typeof(obj) === 'object' && isFunc(obj.then);
    const finalPayloadCreator = isFunc(payloadCreator) ? payloadCreator : identity;
    return ({commit, dispatch}, ...args) =>{
        const payload = finalPayloadCreator(...args);
        const action = {type, payload};
        if(isFunc(metaCreator)){
            action.meta = metaCreator(...args);
        }
        if(isPromise(payload)){
            return payload.then(result =>{
                commit(type, Object.assign(action, {payload: result}));
                //返回对应业务逻辑commit之后需要做的业务操作，这里将结果通过promise返回
                return Promise.resolve(result);
            }).catch(error =>{
                // commit(type, Object.assign(action, {error: true, msg: error.msg}));
                return Promise.reject({error: true, msg: error.msg});
            });
        }
        return commit(type, Object.assign(action, {payload}));
    };
};

export default {
    /******************过客模块*********************/

    //获取过客列表
    getJournalList: params => request(API.JOURNAL_LIST, params, METHODS.POST),
    //获取过客详情
    getPasserbyDetail: params => request(API.PASSING_DETAIL, params, METHODS.POST),
    //过客收藏
    passingCollection: params => {return new Promise((resolve, reject) => { resolve(params); }); } , //暂时怎么写,这样会导致promise无法返回结果
    //过客点赞
    passingPraised: params => {return new Promise((resolve, reject) => { resolve(params); }); } , //暂时怎么写,这样会导致promise无法返回结果


    /******************日记模块*********************/
    //获取我的分类列表
    getCategoryList: params => request(API.MY_CATEGORY_LIST, params, METHODS.POST),

    //添加我的分类
    addCategory: params => {return new Promise((resolve, reject) => { resolve(params); }); } , //暂时怎么写,这样会导致promise无法返回结果

    //编辑我的分类
    editCategory: params => {return new Promise((resolve, reject) => { resolve(params); }); } , //暂时怎么写,这样会导致promise无法返回结果

    //删除我的分类
    deleteCategory: params => {return new Promise((resolve, reject) => { resolve(params); }); } , //暂时怎么写,这样会导致promise无法返回结果

    //获取我的日记
    getMyDiarys: params => request(API.MY_DIARYS_LIST, params, METHODS.POST),
    //修改日记
    getEditDiary: params => request(API.EDIT_DIARY, params, METHODS.POST),
    //我的日记详情
    getDiaryDetail: params => request(API.DIARY_DETAIL, params, METHODS.POST)
};

