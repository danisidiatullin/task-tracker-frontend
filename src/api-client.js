const requestOptions = ({
  method,
  content_type = "application/json",
  token = null,
  body = null,
}) => {
  let headers = { "Content-Type": content_type };
  if (token !== null) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (method !== "GET" && method !== "DELETE") {
    body = JSON.stringify(body);
    return {
      method: method,
      headers: headers,
      body: body,
    };
  }

  return {
    method: method,
    headers: headers,
  };
};

export class ApiClient {
  static getTitle = async () => {
    return await fetch("/api", requestOptions({ method: "GET" }));
  };

  static submitRegistration = async (body) => {
    return await fetch(
      "/api/users",
      requestOptions({ method: "POST", body: body })
    );
  };

  static submitLogin = async (body) => {
    return await fetch(
      "/api/token",
      requestOptions({
        method: "POST",
        content_type: "application/x-www-form-urlencoded",
        body: `grant_type=&username=${body.email}&password=${body.password}&scope=&client_id=&client_secret=`,
      })
    );
  };

  static fetchUser = async (token) => {
    return await fetch(
      "/api/users/me",
      requestOptions({ method: "GET", token: token })
    );
  };

  static getTasks = async (token) => {
    return await fetch(
      "/api/tasks",
      requestOptions({ method: "GET", token: token })
    );
  };

  static getTask = async (id, token) => {
    return await fetch(
      `/api/tasks/${id}`,
      requestOptions({ method: "GET", token: token })
    );
  };

  static createTask = async (token, body) => {
    return await fetch(
      "/api/tasks",
      requestOptions({ method: "POST", token: token, body: body })
    );
  };

  static updateTask = async (id, token, body) => {
    return await fetch(
      `/api/tasks/${id}`,
      requestOptions({ method: "PUT", token: token, body: body })
    );
  };

  static deleteTask = async (id, token) => {
    return await fetch(
      `/api/tasks/${id}`,
      requestOptions({ method: "DELETE", token: token })
    );
  };

  static getStatuses = async () => {
    return await fetch("/api/task_statuses", requestOptions({ method: "GET" }));
  };
}
