import "whatwg-fetch";
require("dotenv").config();

const API_PORT = process.env.SERVER_PORT || 8081;

const GetUserData = async (data) => {
  const LOCAL_API_ROUTE = process.env.LOCAL_API_ROUTE;
  const LOCAL_API_URL = `//localhost:${API_PORT}${LOCAL_API_ROUTE}`;
  
  console.log(LOCAL_API_URL);

  const response = await window.fetch(LOCAL_API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData = await response.json();
  return jsonData;
};

export default GetUserData;
