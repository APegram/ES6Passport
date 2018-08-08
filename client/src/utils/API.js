import axios from "axios";

export default {
    createUser: userInfo => {
        return axios.post("/auth/signup", userInfo);
    },
    verifyUser: userInfo => {
        console.log(userInfo);
        return axios.post("/auth/login", userInfo)
    }
}