import axios from 'axios'

const url=`${process.env.REACT_APP_URL_SERVER}/order`

export const addOrder=(obj)=>{
    return axios.post(`${url}`,obj)

}
export const getAllOrders=()=>{
    return axios.get(`${url}`)
}
export const getOrderByupplier=(id)=>{
    return axios.get(`${url}/${id}`)

}
export const completeOrder=(id)=>{
    return axios.put(`${url}/${id}/complete`)

}
export const confirmOrder=(id)=>{
    return axios.put(`${url}/${id}/confirm`)

}
