const register = document.querySelector("#submit");
register.addEventListener("click", async (e) => {
  e.preventDefault();
  let p = {
    name: form1.name.value,
    username: form1.username.value,
    email: form1.email.value,
    password: form1.password.value,
    mobile: form1.mobile.value,
    description: form1.description.value,
  };
  console.log(p);
  p = JSON.stringify(p);
  let res = await fetch(
    `https://masai-api-mocker.herokuapp.com/auth/register`,
    {
      method: "POST",
      body: p,
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  let response = await res.json();
  console.log("data:", response);
  if (response.error === true) {
    alert(response.message);
  } else if (response.error === false) {
    alert(response.message);
    window.location.href = "./login.html";
  }
});