import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { apiEndpoints } from "../configs/apiConfig";

class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    // Create a custom Axios instance with baseURL from environment variables
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000", // Fallback to localhost if not defined
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // Add an interceptor for handling errors
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<any>) => {
        // // Handle exceptions gracefully
        // const errorResponse = {
        //   success: false,
        //   message: error.response?.data?.message || error.message,
        //   status: error.response?.status || 500,
        //   data: error.response?.data || null,
        // };
        // // Return error object instead of rejecting the promise
        // // return Promise.resolve(errorResponse);
        return null;
      }
    );
  }

  // Method to get the single instance of the class
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async loginWithPassword(
    payload: Record<string, unknown>
  ): Promise<any> {
    return this.axiosInstance.post(apiEndpoints.loginWithPassowrd, payload);
  }

  public async loginWithOTP(payload: Record<string, unknown>): Promise<any> {
    return this.axiosInstance.post(apiEndpoints.loginWithOTP, payload);
  }

  public async register(payload: Record<string, unknown>): Promise<any> {
    return this.axiosInstance.post(apiEndpoints.registerUser, payload);
  }

  public async verifyOtp(payload: Record<string, unknown>): Promise<any> {
    return this.axiosInstance.post(apiEndpoints.verifyOtp, payload);
  }

  public async verifyAccessToken(): Promise<any> {
    return this.axiosInstance.get(apiEndpoints.verifyAccessToken);
  }
  public async verifyRefreshToken(): Promise<any> {
    return this.axiosInstance.get(apiEndpoints.verifyRefreshToken);
  }
}

// Export the singleton instance
const apiService = ApiService.getInstance();
export default apiService;
