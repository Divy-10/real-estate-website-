import API from "./api";


// ================= Signup =================

export const signupUser = async (userData) => {

    const response = await API.post(
        "/user/signup",
        userData
    );

    return response.data;

};


// ================= Login =================

export const loginUser = async (userData) => {

    const response = await API.post(
        "/user/login",
        userData
    );

    return response.data;

};


// ================= Google Login =================

export const googleLoginUser = async (userData) => {

    const response = await API.post(
        "/users/google-login",
        userData
    );

    return response.data;

};