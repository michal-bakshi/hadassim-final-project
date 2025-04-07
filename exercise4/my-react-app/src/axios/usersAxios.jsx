import axios from 'axios'
const url=`${process.env.REACT_APP_URL_SERVER}/supplier`

export const addUser=(user)=>{
    return axios.post(`${url}/register`,user)

}
export const loginApi=(phoneNumber)=>{
    return axios.post(`${url}/login`,phoneNumber )
}
export const getAllUsers=()=>{
    return axios.get(`${url}/`)
}