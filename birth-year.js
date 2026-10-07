const form = document.querySelector("#birth-year-form");
const ageInput = document.querySelector("#age");
const result = document.querySelector("#result");
const birthYear = document.querySelector("#birth-year");
const resultDetail = document.querySelector("#result-detail");
const ageError = document.querySelector("#age-error");
const birthdayError = document.querySelector("#birthday-error");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  ageError.textContent = "";
  birthdayError.textContent = "";

  const age = Number(ageInput.value);
  const birthdayPassed = new FormData(form).get("birthdayPassed");
  let valid = true;

  if (!Number.isInteger(age) || age < 0 || age > 130) {
    ageError.textContent = "Enter a whole number from 0 to 130.";
    valid = false;
  }

  if (!birthdayPassed) {
    birthdayError.textContent = "Choose one of the two options.";
    valid = false;
  }

  if (!valid) {
    return;
  }

  const currentYear = new Date().getFullYear();
  const calculatedYear = currentYear - age - (birthdayPassed === "no" ? 1 : 0);

  birthYear.textContent = calculatedYear;
  resultDetail.textContent =
    birthdayPassed === "yes"
      ? `Based on age ${age} and a birthday already celebrated in ${currentYear}.`
      : `Based on age ${age} and a birthday still to come in ${currentYear}.`;

  form.hidden = true;
  result.hidden = false;
});

document.querySelector("#start-over").addEventListener("click", () => {
  form.reset();
  result.hidden = true;
  form.hidden = false;
  ageInput.focus();
});
