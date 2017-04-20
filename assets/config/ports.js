if (__DEV__) {
    window.config = {
        host: 'http://localhost:2618/api',
        currentUser: 'bin'
    };
}

const getApi = (url) => `${window.config.host}/${url}`;

export const CODE_SUCCESS = 200;

//公用模块
export const PRE_PAGE = 'PRE_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const GO_PAGE = 'GO_PAGE';

//过客模块
export const JOURNAL_LIST = getApi('WuJi/GetPasserBy');

//日记模块
export const MY_CATEGORY_LIST = getApi('WuJi/GetCategoryList');
export const ADD_CATEGORY = getApi('WuJi/addCategory');
export const EDIT_CATEGORY = getApi('WuJi/editCategory');
export const DELETE_CATEGORY = getApi('WuJi/deleteCategory');
export const MY_DIARYS_LIST = getApi('WuJi/GetMyDiarys');
export const EDIT_DIARY = getApi('WuJi/GetEditDiary');
export const DIARY_DETAIL = getApi('WuJi/GetDiaryDetail');
//用户模块
export const IS_SHOW_FORGET_PWD_DIALOG = 'IS_SHOW_FORGET_PWD_DIALOG';