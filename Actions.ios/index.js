"use strict".
/*

actions

*/
export const quickLogin = () => {
    return {
        type: 'QUICKLOGIN',
    };
};
export function login() {
    return {
        type: 'LOGIN',
    };
}
export function logout() {
    return {
        type: 'LOGOUT',
    }
}
