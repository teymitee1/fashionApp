

let firstname = document.forms["myForm"]["firstname"].value,
    lastname = document.forms["myForm"]["lastname"].value,
    phone = document.forms["myForm"]["phone"].value,
    age = document.forms["myForm"]["age"].value,
    gender = document.querySelectorAll("#gender"),
    email = document.forms["myForm"]["email"].value,
    course = document.querySelectorAll('input[type=checkbox]'),
    field1 = document.getElementById("field1"),
    field2 = document.getElementById("field2"),
    field3 = document.getElementById("field3"),
    field4 = document.getElementById("field4"),
    field5 = document.getElementById("field5"),
    field6 = document.getElementById("field6"),
    field7 = document.getElementById("field7");

function validateForm() {

    if (firstname == null || firstname == "") {
        field1.innerHTML = "first name is required";
        return false;
    } else if (!(/^\S{3,}$/.test(firstname))) {
        field1.innerHTML = "whitespace not allowed";
        return false;
    }
    if (lastname == null || lastname == "") {
        field2.innerHTML = "last name required";
        return false;
    } else if (!(/^\S{3,}$/.test(lastname))) {
        field2.innerHTML = "whitespace not allowed";
        return false;
    }
    if (phone == null || phone == "") {
        field3.innerHTML = "phone number required";
        return false;
    } else if (!(/^\S{3,}$/.test(lastname))) {
        field3.innerHTML = "whitespace not allowed";
        return false;
    } else if (phone.length < 11 || phone.length > 11) {
        field3.innerHTML = "invalid input";
        return false;
    }
    if (age == null || age == "") {
        field4.innerHTML = "age required";
        return false;
    } else if (age.length > 2) {
        field4.innerHTML = "enter valid age";
        return false;
    }

    if (gender[0].checked == true || gender[1].checked == true) {
    } else if (!gender.checked) {
        field5.innerHTML = "gender is required";
        return false;
    }

    if (email == null || email == "") {
        field6.innerHTML = "email is required e.g sombody@mail.com";
        return false;
    } else {
        document.getElementById("#field6").innerHTML = "";
    }


let num = document.querySelectorAll('input[type="checkbox"]:checked').length;
if (num > 2) {
    field7.innerHTML = "select 2 courses max";
    return false;
} 

}
