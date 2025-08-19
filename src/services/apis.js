import axiosInstance from './axiosInterceptor';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://los-dev.krytrim.com';
// const baseUrl = 'https://los-uat.krytrim.com';
console.log(baseUrl);
class Apis {
  async getHeaders() {
    const token = await AsyncStorage.getItem('token');

    return {
      Authorization: token,
    };
  }

  async logout(body) {
    const headers = await this.getHeaders();

    return axiosInstance.post(baseUrl + '/api/v1/login', body, {headers});
  }

  login(body) {
    const headers = {
      'X-Client-Id': '93b79c1f-52e2-441f-ae8e-bf9cb2e71f70',
    };

    return axiosInstance.post(baseUrl + `/api/v1/login`, body, {headers});
  }

  otpVerify(body) {
    return axiosInstance.post(baseUrl + `/api/v1/login`, body);
  }
  generateOtp(body) {
    return axiosInstance.post(baseUrl + `/api/v1/login`, body);
  }
  resetGenerateOtp(body) {
    return axiosInstance.post(baseUrl + `/api/v1/login`, body);
  }
  resetGenerateOtpVerify(body) {
    return axiosInstance.post(baseUrl + `/api/v1/login`, body);
  }
  resetPassword(body) {
    return axiosInstance.post(baseUrl + `/api/v1/login`, body);
  }

  loanDashboard(body) {
    return axiosInstance.post(baseUrl + `/api/v1/external`, body);
  }
  loanPipelineDashboard(body) {
    return axiosInstance.post(baseUrl + `/api/v1/external`, body);
  }
  center(body) {
    return axiosInstance.post(baseUrl + `/api/v1/center`, body);
  }

  async getRoleAction(body) {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'X-Client-Id': '93b79c1f-52e2-441f-ae8e-bf9cb2e71f70',
      Authorization: token,
      // 'Content-Type': 'application/json',
    };
    // console.log('==========Roles=========>', headers);

    return axiosInstance.post(baseUrl + `/api/v1/rbac`, body, {headers});
  }

  async physicalKyc(body) {
    const headers = await this.getHeaders();
    return axiosInstance.post(baseUrl + '/api/v1/kyc/physical', body, {
      headers,
    });
  }

  async imgUpload(body) {
    const headers = await this.getHeaders();
    return axiosInstance.post(baseUrl + '/api/v1/image', body, {
      headers,
    });
  }

  async payment(body) {
    const headers = await this.getHeaders();
    return axiosInstance.post(baseUrl + '/api/v1/payment', body, {headers});
  }
}

export default Apis;
