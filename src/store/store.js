async function getPersonal() {
  const token = sessionStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/user",
      requestOptions
    );
    const responseJSON = await response.json();
    setUser(responseJSON.data);
    console.log("personal: ", user);
  } catch (error) {
    console.log("Faild fetch user : ", error.message);
  }
}
