import {axiosInstance} from './axiosInstance';
import {BASE_URL} from '../constant';

export const loginUser = async(payload)=>{
    try{
        const response = await axiosInstance.post(`${BASE_URL}/api/login`, payload);
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const getUser=async(payload)=>{
    try{
        const response = await axiosInstance.post(`${BASE_URL}/api/getUser`, {
            userId: payload
        });
        return response.data;
    }catch(err){
        console.log(err.response.data);
        return err.response.data;
    }
}