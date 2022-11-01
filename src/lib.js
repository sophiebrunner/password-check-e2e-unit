export function isPassword(pw) {
  return pw.getAttribute("type") === "password";
}
export function changeType(pw, value) {
  return pw.setAttribute("type", value);
}
export function changeText(el, txt) {
  el.innerText = txt;
}
export function setCheckStatus(check, success) {
  if (success) {
    check.classList.add("checks__check--success");
    check.classList.remove("checks__check--failed");
  } else {
    check.classList.remove("checks__check--success");
    check.classList.add("checks__check--failed");
  }
}

export function initApp() {
  const inputPw1 = document.querySelector("#pw1");
  const inputPw2 = document.querySelector("#pw2");

  const lowerCase = document.querySelector("#lowercase");
  const upperCase = document.querySelector("#uppercase");
  const length = document.querySelector("#length");
  const numbers = document.querySelector("#numbers");
  const equal = document.querySelector("#equal");

  const btn = document.querySelector("button");

  function toggleButton() {
    const isInputPassword = isPassword(inputPw1);
    if (isInputPassword) {
      changeType(inputPw1, "text");
      changeType(inputPw2, "text");
      changeText(btn, "Hide Passwords");
    } else {
      changeType(inputPw1, "password");
      changeType(inputPw2, "password");
      changeText(btn, "Show Passwords");
    }
  }
  btn.addEventListener("click", toggleButton);

  function checkPasswords() {
    const pw1 = inputPw1.value;
    const pw2 = inputPw2.value;

    if (pw1 !== pw2 || pw1.length === 0 || pw2.length === 0) {
      setCheckStatus(equal, false);
      setCheckStatus(lowerCase, false);
      setCheckStatus(upperCase, false);
      setCheckStatus(length, false);
      setCheckStatus(numbers, false);
      return;
    }

    setCheckStatus(equal, pw1 === pw2);
    setCheckStatus(numbers, /\d/.test(pw1));
    setCheckStatus(lowerCase, /[a-z]/.test(pw1));
    setCheckStatus(upperCase, /[A-Z]/.test(pw1));
    setCheckStatus(length, pw1.length >= 10);
  }
  inputPw1.addEventListener("keyup", checkPasswords);
  inputPw2.addEventListener("keyup", checkPasswords);
  checkPasswords();
}
