// document.querySelector("#submit").addEventListener("click", handlelogin);

let handlelogin = async () => {
    // e.preventDefault();
     let username= document.querySelector("#username").value
     console.log('username:', username)
     let  password= document.querySelector("#password").value
     console.log('password:', password)

    let data = {
      username,
      password
    };
  
    data = JSON.stringify(data);
  
    let res = await fetch("https://masai-api-mocker.herokuapp.com/auth/login", {
      method: "POST",
      body: data,
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin':'*'
      },
    });
  
    let info = await res.json();
  
    // let username = document.querySelector("#username").value;

    console.log("info:", info);
    if (info.error === true) {
      alert(info.message);
    } else if (info.error === false) {
      EmployeeDetails(username, info.token);
      // console.log(info)
    }
  };

  let EmployeeDetails = async (username, token) => {
    let res = await fetch(
      `https://masai-api-mocker.herokuapp.com/user/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    let details = await res.json();
    console.log("details:", details);
    alert("Login Successfull!");
    localStorage.setItem("userinfo", JSON.stringify(details));
    window.location.href = "index.html";
  };