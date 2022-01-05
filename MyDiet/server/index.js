const DB_ENDPOINT = "http://192.168.1.5:8000";
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
