import API from "./api.js";

export class ApiClient {
  static getTitle = async () => {
    try {
      const response = await API.get("/api");
      return response.data.message;
    } catch (error) {
      console.log("something messed up");
    }
  };

  static submitRegistration = async (body) => {
    try {
      var response = await API.post("/api/users", body);
      return { access_token: response.data.access_token, error: null };
    } catch (error) {
      return { error: response.data.detail, access_token: null };
    }
  };

  static submitLogin = async (body) => {
    try {
      var response = await API.post(
        "/api/token",
        `grant_type=&username=${body.email}&password=${body.password}&scope=&client_id=&client_secret=`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return { access_token: response.data.access_token, error: null };
    } catch {
      return { error: response.data.detail, access_token: null };
    }
  };

  static fetchUser = async (token) => {
    try {
      await API.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return token;
    } catch (error) {
      return null;
    }
  };

  static getTasks = async (token) => {
    try {
      const response = await API.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      return { error: false, data: data };
    } catch (error) {
      return { error: true };
    }
  };

  static getTask = async (id, token) => {
    try {
      const response = await API.get(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      return { error: false, data: data };
    } catch (error) {
      return { error: true };
    }
  };

  static createTask = async (token, body) => {
    try {
      await API.post("/api/tasks", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  static updateTask = async (id, token, body) => {
    try {
      await API.put(`/api/tasks/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  static deleteTask = async (id, token) => {
    try {
      await API.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  static getStatuses = async () => {
    try {
      const response = await API.get("/api/task_statuses");
      return { error: false, data: response.data };
    } catch (error) {
      return { error: true };
    }
  };
}
