import axios from 'axios';
import { backend_url, backend_url_ASP, backend_url_MockAPI } from '../../Back_End_Url'
import { response_with_mess } from '../responseGenerator';


export async function call_MockApi(method, api_url, formData, title) {
    const mess_title = title ? title : null;
    const request_body = formData ? formData : null;
    // console.log('method', method)
    // console.log ('request url', backend_url_MockAPI + api_url)
    // console.log ('request body', request_body)
    try {
        const response = await axios({
            method: method,
            url: backend_url_MockAPI + api_url,
            data: request_body
        });
        // console.log('APIIII', response)
        return response_with_mess(true, mess_title, true, response.data);

    } catch (error) {

        console.log("register" + " BIG ERROR", error)
        console.log('APIIII' + '/' + error.message)

        return response_with_mess(false, mess_title, error.response ? error.response.data.error : error.message, null);

    }
}


// export async function call(method, api_url, formData, title) {
//     const mess_title = title ? title : null;
//     const request_body = formData ? formData : null;
//     console.log('method', method)
//     console.log ('request url', backend_url_ASP + api_url)
//     console.log ('request body', request_body)
//     try {
//         const response = await axios({
//             method: method,
//             url: backend_url_ASP + api_url,
//             data: request_body
//         });
//         // console.log('APIIII', response)
//         return response_with_mess(true, mess_title, response.data.success && response.data.success, response.data);

//     } catch (error) {

//         console.log("register" + " BIG ERROR", error)
//         console.log('APIIII' + '/' + error.message)

//         return response_with_mess(false, mess_title, error.response ? error.response.data.error : error.message, null);

//     }
// }

// export async function call_MockApi_With_Instance(method, api_url, formData, title) {
//     const mess_title = title ? title : null;
//     const request_body = formData ? formData : null;
//     console.log('method', method)
//     console.log ('request url', backend_url_MockAPI + api_url)
//     console.log ('request body', request_body)
//     try {
//         const response = await api({
//             method: method,
//             url: api_url,
//             data: request_body
//         });
//         // console.log('APIIII', response)
//         return response_with_mess(true, mess_title, true, response.data);

//     } catch (error) {

//         console.log("register" + " BIG ERROR", error)
//         console.log('APIIII' + '/' + error.message)

//         return response_with_mess(false, mess_title, error.response ? error.response.data.error : error.message, null);

//     }
// }








