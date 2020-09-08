import "whatwg-fetch";

const GetUserData = async (data) => {
  const { LOCAL_API } = process.env;
  const response = await window.fetch(LOCAL_API, {
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
