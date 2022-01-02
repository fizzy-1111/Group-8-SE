const DB_ENDPOINT = "192.168.1.3";

export const checkToken = async (token, onResponse) => {
  try {
    const response = await fetch(`${DB_ENDPOINT}/user/`, {
      headers: {
        authorization: token,
      },
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {}
};

export const userLogin = async (username, password, onResponse) => {
  const endpoint = `${DB_ENDPOINT}/user/signin`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    onResponse({ message: "There is some error" + endpoint });
  }
};

export const userSignup = async (username, password, onResponse) => {
  const endpoint = `${DB_ENDPOINT}/user/signup`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    onResponse({ message: "There is some error" + endpoint });
  }
};

export const uploadAvatar = async (uri, token, callback) => {
  try {
    const data = new FormData();
    data.append("avatar", dataURItoBlob(uri), "avatar" + getFileExtension(uri));
    const endpoint = `${DB_ENDPOINT}/user/upload_avatar`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: data,
    });
    const jsonResponse = await response.json();
    callback(jsonResponse);
  } catch (error) {
    console.log(error);
  }
};
export const fetchItemDetail = async (id, token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/item/item_info/`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: id }),
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    // TODO: show error
    console.log(error);
    onResponse({ status: 0, message: error });
  }
};
