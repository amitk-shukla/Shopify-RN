// This class will be used for validating inputs
export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;

  return re.test(password);
}
export function validateIsEmpty(text) {
  var result = false;
  if (text == '' || text == undefined) {
    result = true;
  }
  return result;
}
export function validateName(text) {
  var re = /^[a-zA-Z ]*$/;
  return re.test(text);
}
export function validateNumber(text) {
  var re = /^[0-9]*$/;
  return re.test(text);
}
