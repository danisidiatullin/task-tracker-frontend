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
    const response = await fetch("/api", requestOptions({ method: "GET" }));
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      return data.message;
    }
  };

  static submitRegistration = async (body) => {
    const response = await fetch(
      "/api/users",
      requestOptions({ method: "POST", body: body })
    );
    const data = await response.json();

    if (!response.ok) {
      return { error: data.detail, access_token: null };
    }
    return { access_token: data.access_token, error: null };
  };

  static submitLogin = async (body) => {
    const response = await fetch(
      "/api/token",
      requestOptions({
        method: "POST",
        content_type: "application/x-www-form-urlencoded",
        body: `grant_type=&username=${body.email}&password=${body.password}&scope=&client_id=&client_secret=`,
      })
    );
    const data = await response.json();

    if (!response.ok) {
      return { error: data.detail, access_token: null };
    }
    return { access_token: data.access_token, error: null };
  };

  static fetchUser = async (token) => {
    const response = await fetch(
      "/api/users/me",
      requestOptions({ method: "GET", token: token })
    );
    const data = await response.json();

    if (!response.ok) {
      return null;
    }
    return token;
  };

  static getTasks = async (token) => {
    const response = await fetch(
      "/api/tasks",
      requestOptions({ method: "GET", token: token })
    );
    const data = await response.json();

    if (!response.ok) {
      return { error: true };
    } else {
      return { error: false, data: data };
    }
  };

  static getTask = async (id, token) => {
    const response = await fetch(
      `/api/tasks/${id}`,
      requestOptions({ method: "GET", token: token })
    );
    const data = await response.json();

    if (!response.ok) {
      return { error: true };
    } else {
      return { error: false, data: data };
    }
  };

  static createTask = async (token, body) => {
    const response = await fetch(
      "/api/tasks",
      requestOptions({ method: "POST", token: token, body: body })
    );
    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  };

  static updateTask = async (id, token, body) => {
    const response = await fetch(
      `/api/tasks/${id}`,
      requestOptions({ method: "PUT", token: token, body: body })
    );
    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  };

  static deleteTask = async (id, token) => {
    const response = await fetch(
      `/api/tasks/${id}`,
      requestOptions({ method: "DELETE", token: token })
    );
    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  };

  static getStatuses = async () => {
    const response = await fetch(
      "/api/task_statuses",
      requestOptions({ method: "GET" })
    );
    const data = await response.json();

    if (!response.ok) {
      return { error: true };
    } else {
      return { error: false, data: data };
    }
  };
}
