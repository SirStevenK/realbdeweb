import axios from "axios";

export default function InterceptorAccessToken(): void {
  axios.interceptors.response.use(
    async (response) => {
      // Return a successful response back to the calling service
      return response;
    },
    async (error) => {
      // Return any error which is not due to authentication back to the calling service
      if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      // Logout user if token refresh didn't work or user is disabled
      if (
        error.config.url == "/api/admin/auth/token"
        // error.response.message == "Account is disabled."
      ) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      // Try request again with new token
      try {
        // get access token in cookie
        await axios.get("/api/admin/auth/token");
        // New request
        const config = error.config;
        return await new Promise((resolve_2, reject_2) => {
          axios
            .request({ ...config, withCredentials: true })
            .then((response) => {
              resolve_2(response);
            })
            .catch((error_1) => {
              reject_2(error_1);
            });
        });
      } catch (error_2) {
        Promise.reject(error_2);
      }
    }
  );
}
