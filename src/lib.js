export function arePasswordsEqual(pw1, pw2) {
  return pw1 === pw2 ? true : false;
}
export function containsNumbers(pw) {
  return /\d/.test(pw);
}
export function hasLowerCaseLetters(pw) {
  return /[a-z]/.test(pw);
}
export function hasUpperCaseLetters(pw) {
  return /[A-Z]/.test(pw);
}
export function reachesMinimumLength(pw) {
  return pw.length >= 10 ? true : false;
}

export function initApp() {
  const inputPw1 = document.querySelector("#pw1");
  const inputPw2 = document.querySelector("#pw2");

  const lowerCase = document.querySelector("#lowercase");
  const upperCase = document.querySelector("#uppercase");
  const length = document.querySelector("#length");
  const numbers = document.querySelector("#numbers");
  const equal = document.querySelector("#equal");
  const allTests = document.querySelectorAll(".checks__check");

  const btn = document.querySelector("button");

  function changeType(pw, value) {
    return pw.setAttribute("type", value);
  }
  function changeText(el, txt) {
    el.innerText = txt;
  }
  function isPassword(pw) {
    return pw.getAttribute("type") === "password";
  }
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

  function setCheckStatus(check, success) {
    if (success) {
      check.classList.add("checks__check--success");
      check.classList.remove("checks__check--failed");
    } else {
      check.classList.remove("checks__check--success");
      check.classList.add("checks__check--failed");
    }
  }

  function checkPasswords() {
    const pw1 = inputPw1.value;
    const pw2 = inputPw2.value;

    if (pw1 !== pw2 || pw1.length === 0 || pw2.length === 0) {
      setCheckStatus(equal, false);
      setCheckStatus(numbers, false);
      setCheckStatus(lowerCase, false);
      setCheckStatus(upperCase, false);
      setCheckStatus(length, false);
      return;
    }
    setCheckStatus(equal, arePasswordsEqual(pw1, pw2));
    setCheckStatus(numbers, containsNumbers(pw1));
    setCheckStatus(lowerCase, hasLowerCaseLetters(pw1));
    setCheckStatus(upperCase, hasUpperCaseLetters(pw1));
    setCheckStatus(length, isLongEnough(pw1));
  }
  inputPw1.addEventListener("keyup", checkPasswords);
  inputPw2.addEventListener("keyup", checkPasswords);
  checkPasswords();
}
