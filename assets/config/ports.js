if (__DEV__) {
    window.config = {
        host: 'http://localhost:2618/api',
        currentUser: 'bin'
    };
}

const getApi = (url) => `${window.config.host}/${url}`;

export const CODE_SUCCESS = 200;

//过客模块
export const JOURNAL_LIST = getApi('WuJi/GetPasserBy');

//日记模块
export const MY_CATEGORY_LIST = getApi('WuJi/GetCategoryList');
export const MY_DIARYS_LIST = getApi('WuJi/GetMyDiarys');
export const EDIT_DIARY = getApi('WuJi/GetEditDiary');
export const DIARY_DETAIL = getApi('WuJi/GetDiaryDetail');
//用户模块
export const IS_SHOW_FORGET_PWD_DIALOG = 'IS_SHOW_FORGET_PWD_DIALOG';