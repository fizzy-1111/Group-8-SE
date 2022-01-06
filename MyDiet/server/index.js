const DB_ENDPOINT = "https://my-diet-mobile-app.herokuapp.com";
import mime from "mime";

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

export const userSignup = async (
  username,
  fullname,
  email,
  phone,
  password,
  onResponse
) => {
  const endpoint = `${DB_ENDPOINT}/user/signup`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        fullname,
        email,
        phoneNumber: phone,
        password,
      }),
    });

    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    onResponse({ message: "There is some error" + endpoint });
  }
};

export const uploadPostAsync = async (
  imageUri,
  content,
  postType,
  token,
  onResponse
) => {
  try {
    const data = new FormData();
    data.append("image", {
      uri: "file:///" + imageUri.split("file:/").join(""),
      type: mime.getType(imageUri),
      name: imageUri.split("/").pop(),
    });
    data.append("content", content);
    data.append("postType", postType);
    const endpoint = `${DB_ENDPOINT}/post/uploadpost`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "multipart/form-data",
      },
      body: data,
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    console.log(error);
  }
};

export const uploadAvatar = async (imageUri, token, onResponse) => {
  try {
    const data = new FormData();
    data.append("avatar", {
      uri: "file:///" + imageUri.split("file:/").join(""),
      type: mime.getType(imageUri),
      name: imageUri.split("/").pop(),
    });
    const endpoint = `${DB_ENDPOINT}/user/upload_avatar/`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "multipart/form-data",
      },
      body: data,
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    console.log(error);
  }
};

export const searchFood = async (name, token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/food/findfood/`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    // TODO: show error
    console.log(error);
    onResponse({ status: 0, message: error });
  }
};

export const getPostList = async (cursor, type, token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/post/getpostlist/`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cursor, type }),
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    // TODO: show error
    console.log(error);
    onResponse({ status: 0, message: error });
  }
};

export const commentPost = async (postID, content, token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/post/commentpost/`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postID, content }),
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    // TODO: show error
    console.log(error);
    onResponse({ status: 0, message: error });
  }
};

export const findDietitian = async (name, token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/user/find_dietitian/`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    // TODO: show error
    console.log(error);
    onResponse({ status: 0, message: error });
  }
};

export const getDietiant = async (token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/user/dietitian_list/`, {
      headers: {
        authorization: token,
      },
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    console.log(error);
    onResponse({ status: 0, message: error });
  }
};

export const registerDietitian = async (_id, token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/user/register_dietitian/`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    // TODO: show error
    console.log(error);
    onResponse({ status: 0, message: error });
  }
};

export const changePassword = async (
  oldPassword,
  newPassword,
  token,
  onResponse
) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/user/change_password/`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    // TODO: show error
    console.log(error);
    onResponse({ status: 0, message: error });
  }
};

export const editProfile = async (
  fullname,
  email,
  phoneNumber,
  about,
  token,
  onResponse
) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/user/update/`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, phoneNumber, about }),
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    onResponse({ status: 0, message: error });
  }
};

export const getPT = async (token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/user/personal_dietitian/`, {
      headers: {
        authorization: token,
      },
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    onResponse({ status: 0, message: error });
  }
};

export const removePT = async (token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/user/unsubscribe/`, {
      headers: {
        authorization: token,
      },
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    onResponse({ status: 0, message: error });
  }
};

export const getClientList = async (token, onResponse) => {
  try {
    if (!token) throw "Token is null";

    const response = await fetch(`${DB_ENDPOINT}/user/client_list/`, {
      headers: {
        authorization: token,
      },
    });
    const jsonResponse = await response.json();
    onResponse(jsonResponse);
  } catch (error) {
    onResponse({ status: 0, message: error });
  }
};
