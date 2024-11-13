class ApiResponse {
    constructor(statusCode=200, message = "success", data = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    // Method to create a login response
    apiLoginRes(data) {
        return new ApiResponse(201, "Login successful", data);
    }
    apiLogoutRes(data) {
        return new ApiResponse(201, "logout successful", data);
    }
}

export default ApiResponse;
