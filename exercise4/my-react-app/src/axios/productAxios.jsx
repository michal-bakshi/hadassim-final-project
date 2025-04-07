import axios from 'axios'

const url=`${process.env.REACT_APP_URL_SERVER}/product`

export const addProduct=(obj)=>{
    return axios.post(`${url}/add`,obj)

}
export const getAllProducts=()=>{
    return axios.get(`${url}`)
}
export const getProductById=(id)=>{
    return axios.get(`${url}/${id}`)

}
