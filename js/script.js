// SELECT ELEMENTS
import { getAll, get } from "./getElements.js";

const url = "https://randomuser.me/api/";
const randomuser = get(".random-btn");
const profileInfo = get(".profile-name");
const profileTitle = get(".profile-title");
const profileImg = get(".profile-img");
const btns = [...getAll(".icon-btn")];

// Fecth users func
const fetchUsers = async () => {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const profile = data.results[0];
    //   destructuring
    const { phone, email } = profile;
    const { first, last } = profile.name;
    let { date: birthday } = profile.dob;
    birthday = birthday.slice(0, birthday.indexOf("T"));
    birthday = birthday.replaceAll("-", "/");
    const { password } = profile.login;
    const { large: img } = profile.picture;
    const { number, name: streetName } = profile.location.street;
    return {
      phone,
      email,
      name: `${first} ${last}`,
      birthday,
      password,
      img,
      address: `${number} ${streetName}`,
    };
  } catch (error) {}
};

// display Users func
const displayUsers = (user) => {
  profileImg.src = user.img;
  profileInfo.textContent = user.name;
  profileTitle.textContent = `My name is `;
  btns.forEach((btn) => btn.classList.remove("active"));
  btns[0].classList.add("active");
  btns.forEach((btn) => {
    const label = btn.dataset.label;
    btn.addEventListener("click", () => {
      profileTitle.textContent = `My ${label} is `;
      profileInfo.textContent = user[label];
      btns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");
    });
  });
};

// show users func
const showUser = async () => {
  const data = await fetchUsers();
  displayUsers(data);
};

window.addEventListener("DOMContentLoaded", showUser);
randomuser.addEventListener("click", showUser);
