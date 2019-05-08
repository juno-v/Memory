const loginMode = require('./loginModeReducer.js');


test('test results for action.type test cases', () => {

    let state = 'login';

    let loginAction = {
        type: 'SET_TO_LOGIN_MODE',
    }; 

    let registerAction = {
        type: 'SET_TO_REGISTER_MODE',
    }

    let emptyAction = {
       type: 'DEFAULT',
    }
    
    expect(loginMode(state, loginAction)).toBe('login'); 
    expect(loginMode(state, registerAction)).toBe('register'); 
    expect(loginMode(state, emptyAction)).toBe(state); 
})