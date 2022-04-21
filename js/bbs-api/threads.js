"use strict";

const checkTitle = (title) => {
  if (title === "") {
    alert("titleが入力されていません");
    return false;
  } else if (title.length > 64) {
    alert("titleは64文字以内で入力してください");
    return false;
  } else {
    return true;
  }
};

const threadsCreateSubmit = document.getElementById("threadsCreateSubmit");
threadsCreateSubmit.addEventListener("click", () => {
  const threadsCreateTitle =
    document.getElementById("threadsCreateTitle").value;
  if (checkTitle(threadsCreateTitle)) {
    const threadsCreateTitleData = { title: threadsCreateTitle };
    fetch(host + "/threads", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadsCreateTitleData),
    })
      .then((response) => response.json())
      .then(console.log)
      .catch(console.log);
  }
});

const threadsGetSubmit = document.getElementById("threadsGetSubmit");
threadsGetSubmit.addEventListener("click", () => {
  const threadsGetPerPage = document.getElementById("threadsGetPerPage").value;
  const threadsGetPage = document.getElementById("threadsGetPage").value;
  const threadsGetQ = document.getElementById("threadsGetQ").value;
  const url = new URL(host + "/threads");
  const params = {};

  if (threadsGetPerPage !== "") {
    params["per_page"] = threadsGetPerPage;
  }

  if (threadsGetPage !== "") {
    params["page"] = threadsGetPage;
  }

  if (threadsGetQ !== "") {
    params["q"] = threadsGetQ;
  }

  const param = new URLSearchParams(params);
  url.search = param;

  fetch(url.href, {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })
    .then((response) => response.json())
    .then(console.log)
    .catch(console.log);
});

const threadsIdGetSubmit = document.getElementById("threadsIdGetSubmit");
threadsIdGetSubmit.addEventListener("click", () => {
  const threadsId = document.getElementById("threadsId").value;
  fetch(host + "/threads/" + threadsId, {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })
    .then((response) => response.json())
    .then(console.log)
    .catch(console.log);
});

const threadsEditSubmit = document.getElementById("threadsEditSubmit");
threadsEditSubmit.addEventListener("click", () => {
  const threadsEditTitle = document.getElementById("threadsEditTitle").value;
  if (checkTitle(threadsEditTitle)) {
    const threadsEditID = document.getElementById("threadsEditID").value;
    const threadsEditTitleData = { title: threadsEditTitle };
    fetch(host + "/threads/" + threadsEditID, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadsEditTitleData),
    })
      .then((response) => response.json())
      .then(console.log)
      .catch(console.log);
  }
});
