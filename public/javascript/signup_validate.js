let submit = document.querySelector('input[type=submit]');
submit.addEventListener('click', (e) => {
    let firstname = document.getElementById("firstname"),
        firstVal = firstname.value;
    if (firstVal.trim() == '') {
        let firstError = document.getElementById("firstError");
        firstError.innerHTML = "*** Firstname is required";
        e.preventDefault();
    }
    let lastname = document.getElementById("lastname"),
        lastVal = lastname.value;
    if (lastVal.trim() == '') {
        let lastError = document.getElementById("lastError");
        lastError.innerHTML = "*** Lastname is required"
        e.preventDefault();
    }
    let phone = document.getElementById("phone"),
        phoneVal = phone.value;
    if (phoneVal.trim() == '') {
        let phoneError = document.getElementById("phoneError");
        phoneError.innerHTML = "*** Phone Number is Required";
        e.preventDefault();
    } 
    // else if (phoneVal.trim() < 11 || phoneVal.trim() > 11) {
        // phoneError = document.getElementById("phoneError");
        // phoneError.innerHTML = "*** Phone Number must be 11 characters long"
        // e.preventDefault();
    // }
    let age = document.getElementById("age"),
        ageVal = age.value;

    if (ageVal.trim() == '') {
        let ageError = document.getElementById("ageError");
        ageError.innerHTML = "*** Age is required"
        e.preventDefault();
    }
    let gender = document.querySelectorAll("#gender");
    for (let i = 0; i < gender.length; i++) {
        if (!gender[0].checked && !gender[1].checked) {
            let genderError = document.getElementById("genderError")
            genderError.innerHTML = "**** it is important we know your gender"
            e.preventDefault();
        }
    }

    let email = document.getElementById("email"),
        emailVal = email.value;

    if (emailVal.trim() == '') {
        var emailError = document.getElementById("emailError");
        emailError.innerHTML = "*** Email is Required"
        e.preventDefault();
    }

    let num = document.querySelectorAll('#course:checked');
    if (num.length < 2 || num.length > 2) {
        let courseError = document.getElementById('courseError');
        courseError.innerHTML = "*** Please select two courses";
    }
})


let login = document.getElementById("login");
login.addEventListener('click', (e) => {
    let username = document.getElementById("username").value;
    if (username.trim() == '') {
        let userError = document.getElementById("userError");
        userError.innerHTML = "*** Username is required";
        e.preventDefault();
    }
    let password = document.getElementById("password").value;
    if (password.trim() == '') {
        let passError = document.getElementById("passError");
        passError.innerHTML = "*** Password is required";
        e.preventDefault();
    }
});
