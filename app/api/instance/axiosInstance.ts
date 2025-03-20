import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { apiBaseUrl } from "../baseUrl";
import { asyncStorage_getByKey } from "@/app/tool/AsyncStorage";
// import { LocalStorageUtil } from "../../core/utils/storage.util";
// import { JwtUtil } from "../../core/utils/jwt.util";
import { loginRequiredAlert } from "@/utils/alert.util";
import { useNavigation } from "expo-router";

const publicApi = axios.create({
  baseURL: apiBaseUrl + "/api",
  timeout: 10000,
});
const loginRequiredApi = axios.create({
  baseURL: apiBaseUrl + "/api",
  timeout: 10000,
});
const adminApi = axios.create({
  baseURL: apiBaseUrl + "/api",
  timeout: 10000,
});

const isValidToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Chuyển về giây
    return decoded.exp > currentTime; // Kiểm tra token hết hạn chưa
  } catch (error) {
    return false; // Token không hợp lệ
  }
};

publicApi.interceptors.request.use(
  (config) => {
    // const token = LocalStorageUtil.getAuthTokenFromLocalStorage();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// loginRequiredApi.interceptors.request.use(
//   async (config) => {
//     const auth = await asyncStorage_getByKey("auth");
//     const token = auth.token;

//     if (token) {
//       if (isValidToken(token) === false) {
//         //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
//         console.log("Token expired");

//         return Promise.reject(new Error("Token expired"));
//       }
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
//       console.log("No token found");

//       return Promise.reject(new Error("No token found"));
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

loginRequiredApi.interceptors.request.use(
  async (config) => {
    console.log("🔄 [Interceptor] Chuẩn bị gửi request:", config.url);

    const auth = await asyncStorage_getByKey("auth");

    if (!auth || !auth.token) {
      console.log("❌ [Interceptor] Không có token → Show login alert");
      loginRequiredAlert(); // Hiện thông báo yêu cầu đăng nhập

      return Promise.reject(new Error("No token found"));
    }

    if (!isValidToken(auth.token)) {
      console.log("⏳ [Interceptor] Token hết hạn → Show login alert");
      loginRequiredAlert(); // Hiện thông báo yêu cầu đăng nhập

      return Promise.reject(new Error("Token expired"));
    }

    config.headers.Authorization = `Bearer ${auth.token}`;
    return config;
  },
  (error) => {
    console.log("❌ [Interceptor] Lỗi request:", error.message);
    return Promise.reject(error);
  }
);

// adminApi.interceptors.request.use(
//   async (config) => {
//     const token = LocalStorageUtil.getAuthTokenFromLocalStorage();

//     if (token) {
//       if (JwtUtil.isTokenValid(token) === false) {

//         //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
//         await loginRequiredAlert();

//         return Promise.reject(new Error('Token expired'));
//       }
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {

//       //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
//       await loginRequiredAlert();

//       return Promise.reject(new Error('No token found'));
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export {
  publicApi,
  loginRequiredApi,
  // adminApi,
};
