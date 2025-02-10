
import axios from 'axios';
import { backend_url } from '../../Back_End_Url'
import { jwtDecode } from "jwt-decode";

export async function login(formData) {
  try {
    const response = await axios.post(`${backend_url}/login`, formData);
    return response.data;
  } catch (error) {
    console.log(error.response.data)
    return error.response.data;
  }

}
export const getUserFromToken = (token) => {
  try {
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};





