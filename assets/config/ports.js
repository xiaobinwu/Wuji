if (__DEV__) {
    window.config = {
        host: 'http://localhost:2618/api',
        currentUser: 'bin'
    };
}

const getApi = (url) => `${window.config.host}/${url}`;

export const CODE_SUCCESS = 200;

//过客模块
export const JOURNAL_LIST = getApi('passing/getList');

//用户模块
export const IS_SHOW_FORGET_PWD_DIALOG = 'IS_SHOW_FORGET_PWD_DIALOG';