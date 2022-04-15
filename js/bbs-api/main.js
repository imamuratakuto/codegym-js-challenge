"use strict";

const p = console.log;
const host = "http://52.195.0.124:20780"; //ローカルで掲示板を動かす場合の設定

//以下にコードを書きましょう。
const checkName = (name) => {
  if (name === "") {
    alert("入力されていない欄があります");
    return false;
  } else if (name.length > 17) {
    alert("16文字以内で入力してください");
    return false;
  } else {
    return true;
  }
};

const checkBio = (bio) => {
  if (bio === "") {
    alert("入力されていない欄があります");
    return false;
  } else if (bio.length > 129) {
    alert("128文字以内で入力してください");
    return false;
  } else {
    return true;
  }
};

const checkPassword = (password) => {
  if (password === "") {
    alert("入力されていない欄があります");
    return false;
  } else {
    return true;
  }
};

const registerSubmit = document.getElementById("registerSubmit");
registerSubmit.addEventListener("click", () => {
  const newUserName = document.getElementById("registerName").value;
  const newUserBio = document.getElementById("registerBio").value;
  const newUserPass = document.getElementById("registerPassword").value;
  if (checkName(newUserName)) {
    if (checkBio(newUserBio)) {
      if (checkPassword(newUserPass)) {
        const newUserData = {
          name: newUserName,
          bio: newUserBio,
          password: newUserPass,
        };
        fetch(host + "/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserData),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
      }
    }
  }
});

const loginSubmit = document.getElementById("loginSubmit");
loginSubmit.addEventListener("click", () => {
  const loginUserName = document.getElementById("loginName").value;
  const loginUserPass = document.getElementById("loginPassword").value;
  const loginUserData = { name: loginUserName, password: loginUserPass };
  fetch(host + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginUserData),
  })
    .then((response) => response.json())
    .then((data) => localStorage.setItem("token", data.token))
    .catch((error) => console.log(error));
});

const logoutSubmit = document.getElementById("logoutSubmit");
logoutSubmit.addEventListener("click", () => {
  fetch(host + "/logout", {
    method: "POST",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  localStorage.removeItem("token");
});

const usersIdGetSubmit = document.getElementById("usersIdGetSubmit");
usersIdGetSubmit.addEventListener("click", () => {
  const usersGetId = document.getElementById("usersIdGetId").value;
  fetch(host + "/users/" + usersGetId, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});

const usersGetSubmit = document.getElementById("usersGetSubmit");
usersGetSubmit.addEventListener("click", () => {
  const usersGetPerPage = document.getElementById("usersGetPerPage").value;
  const usersGetPage = document.getElementById("usersGetPage").value;
  const usersSerchWord = document.getElementById("usersSerchWord").value;
  const url = new URL(host + "/users");
  const params = {};

  if (usersGetPerPage !== "") {
    params["per_page"] = usersGetPerPage;
  }

  if (usersGetPage !== "") {
    params["page"] = usersGetPage;
  }

  if (usersSerchWord !== "") {
    params["q"] = usersSerchWord;
  }

  const param = new URLSearchParams(params);
  url.search = param;

  console.log(url.href);
  fetch(url.href, {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});

const usersDeleteSubmit = document.getElementById("usersDeleteSubmit");
usersDeleteSubmit.addEventListener("click", () => {
  fetch(host + "/users", {
    method: "DELETE",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  localStorage.removeItem("token");
});

const usersEditSubmit = document.getElementById("usersEditSubmit");
usersEditSubmit.addEventListener("click", () => {
  const usersEditBio = document.getElementById("usersEditBio").value;
  if (checkBio(usersEditBio)) {
    const usersEditBioData = { bio: usersEditBio };
    fetch(host + "/users", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usersEditBioData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
});
