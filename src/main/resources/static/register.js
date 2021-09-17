const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const socialSecurityNumberInput = document.querySelector('#socialSecurityNumber');
const streetInput = document.querySelector('#street');
const emailInput = document.querySelector('#email');
let small1 = document.querySelector('#line1');
const formFields = document.querySelector('#registrationForm');
let requiredFields = formFields.querySelectorAll('input');
let notEmptyFields = formFields.querySelectorAll('.toCheck');

document.querySelector('#register').addEventListener('click',
    function (event){
        event.preventDefault();
        small1.textContent = '';

        if(checkAllData()) {
            let formData = new FormData(document.querySelector('#registrationForm'));
            let plainFormData = Object.fromEntries(formData.entries());
            let personalFormDataJsonString = JSON.stringify(plainFormData);
            console.log(personalFormDataJsonString)

            // Stuurt username en password naar de server
            const url = `http://localhost:8080/register`
            const options = {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: personalFormDataJsonString
            }

            // Token komt terug als username & password herkend wordt
            fetch(url,options)
                .then(response => {
                    if (response.ok){
                        response.text();
                        alert('User registered');
                        window.location.assign("http://localhost:8080/index.html")
                    }else if (!response.ok) {
                        console.log('username and/or password are incorrect')
                    }})
                .catch((error) => {
                    console.error('Error ' + error);
                })

        } else {
            console.log('registration failed')
        }



    })


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailFormat.test(email);
}
const isPasswordOK = (password) => {
    const toCheck = new RegExp("^(?=.*[a-z])(?=.{8,})");
    return toCheck.test(password);
}

const showError = (input, message) => {
    input.classList.remove('success');
    input.classList.add('error');
    small1.insertAdjacentText('beforeend',`${message}`);
    small1.append(document.createElement("br"));
}

const showSuccess = (input) => {
    input.classList.remove('error');
    input.classList.add('success');
}

const checkUsername = () => {
    let valid = false;
    const min = 4, max = 25;

    if(!isRequired(usernameInput)) {
        showError(usernameInput, 'Username is required')
    } else if (!isBetween(usernameInput.value.length, min, max)) {
        showError(usernameInput, `Username length must be between ${min} and ${max}`)
    } else {
        showSuccess(usernameInput);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    if (!isRequired(emailInput)) {
        showError(emailInput, 'Email is required')
    } else if(!isEmailValid(emailInput.value)) {
        showError(emailInput, 'Email contains a character which is not allowed')
    } else {
        showSuccess(emailInput);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {
    let valid = false;
    if (!isPasswordOK(passwordInput.value)) {
        showError(passwordInput, 'Password must contain at least 1 lowercase character and a minimum of 8 characters in total')
    } else {
        showSuccess(passwordInput);
        valid = true;
    }
    return valid;
}

const checkSocialSecurityNumber = () => {
    let valid = false;
    let min = 8, max = 9;
    if (!isBetween(socialSecurityNumberInput.value.length,min, max)) {
        showError(socialSecurityNumberInput, 'Social Security Number must be 8 or 9 characters')
    } else {
        showSuccess(socialSecurityNumberInput);
        valid = true;
    }
    return valid;
}
const checkNotEmpty = () => {
    let count = 0;
    notEmptyFields.forEach(e => {
        if (!isRequired(e.value)) {
            showError(e, `${e.id} is required`);
            count++;
        }
    })
    return(count === 0);
}


const checkAllData = () => {
    let isNotEmpty = checkNotEmpty();
    let isUsernameValid = checkUsername();
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();
    let isSocSecNumberValid = checkSocialSecurityNumber();
    return isNotEmpty && isUsernameValid && isEmailValid && isPasswordValid && isSocSecNumberValid;
}
