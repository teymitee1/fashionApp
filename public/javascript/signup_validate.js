let course = document.querySelectorAll("#course");

for(var i = 0; i < course.length; i++){
	course[i].addEventListener('click', function(){
		let checkedbox = document.querySelectorAll("#course:checked");
		if(checkedbox.length == 2){
			let unchecked = document.querySelectorAll("#course:not(:checked)");
			unchecked.forEach(function (checkbox){
				checkbox.disabled = true;
			})
		}else if(checkedbox.length < 2) {
			let disabled = document.querySelectorAll("#course:disabled");
			disabled.forEach(function(disabled){
				disabled.disabled = false;
			})
		}
	})
}





let submit = document.getElementById('signUp');
submit.addEventListener('click', function (e) {
	let firstname = document.getElementById("firstname"),
		firstVal = firstname.value;
	if (firstVal.trim() == '') {
		let firstError = document.getElementById("firstError");
		firstError.innerHTML = "*** Firstname is required";
		e.preventDefault();
		firstname.addEventListener('input', function () {
			firstError.innerHTML = "";
		})
	}
	let lastname = document.getElementById("lastname"),
		lastVal = lastname.value;
	if (lastVal.trim() == '') {
		let lastError = document.getElementById("lastError");
		lastError.innerHTML = "*** Lastname is required";
		e.preventDefault();
		lastname.addEventListener('input', function () {
			lastError.innerHTML = "";
		})
	}

	let phone = document.getElementById("phone"),
		phoneVal = phone.value;
	if (phoneVal.trim() == '') {
		let phoneError = document.getElementById("phoneError");
		phoneError.innerHTML = "*** Phone number required";
		e.preventDefault();
		phone.addEventListener('input', function () {
			phoneError.innerHTML = "";
		})
	} else if (phoneVal.length != 11) {
		phoneError.innerHTML = "*** Phone must be 11 numbers long";
		e.preventDefault();
	}

	let email = document.getElementById("email"),
		emailVal = email.value;
	if (emailVal.trim() == '') {
		var emailError = document.getElementById("emailError");
		emailError.innerHTML = "*** Email is required"
		e.preventDefault();
		email.addEventListener('input', () => {
			emailError.innerHTML = "";
		})
	}

	let dob = document.getElementById("dob"),
		dobVal = dob.value;
	if (dobVal.trim() == '') {
		let dobError = document.getElementById("dobError");
		dobError.innerHTML = "*** Age is required"
		e.preventDefault();
		dob.addEventListener('input', () => {
			dobError.innerHTML = "";
		})
	}

	let gender = document.querySelectorAll("#gender");
	for (let i = 0; i < gender.length; i++) {
		if (!gender[0].checked && !gender[1].checked) {
			let genderError = document.getElementById("genderError")
			genderError.innerHTML = "**** it is important we know your gender"
			e.preventDefault();
			gender[i].addEventListener('click', () => {
				genderError.innerHTML = "";
			})
		}
	}
	let state = document.getElementById("state"),
		stateVal = state.value;
	if (stateVal === 'select') {
		let stateError = document.getElementById("stateError");
		stateError.innerHTML = "*** State is required"
		e.preventDefault();
		state.addEventListener('input', function () {
			stateError.innerHTML = "";
		})
	}

	let occupation = document.getElementById("occupation"),
		occupationVal = occupation.value;
	if (occupationVal === 'select') {
		let occupationError = document.getElementById("occupationError");
		occupationError.innerHTML = "*** Occupation is required"
		e.preventDefault();
		occupation.addEventListener('input', function () {
			occupationError.innerHTML = "";
		})
	}

	let business = document.getElementById("business"),
		businessVal = business.value;
	if (businessVal.trim() == '') {
		business.value = "Nil";
	}

	let checkedbox = document.querySelectorAll("#course:checked");
	if(checkedbox.length < 2){
		let courseError = document.getElementById("courseError");
		courseError.innerHTML = "*** Please select two masterclasses";
		e.preventDefault();
		
	}
	setTimeout(clearAllErr, 10000)
})

function clearAllErr() {
	let num = document.querySelectorAll('.fieldErr')
	for (i = 0; i < num.length; i++) {
		num[i].innerHTML = '';
	}
}




	// let firstcourse = document.getElementById("firstchoice"),
	// 	firstcourseVal = firstcourse.value;
	// if (firstcourseVal === 'select') {
	// 	let firstchoiceError = document.getElementById("firstchoiceError");
	// 	firstchoiceError.innerHTML = "*** Choose a course"
	// 	e.preventDefault();
	// 	firstcourse.addEventListener('input', function () {
	// 		firstchoiceError.innerHTML = "";
	// 	})
	// }

	// let secondcourse = document.getElementById("secondchoice"),
	// 	secondcourseVal = secondcourse.value;
	// if (secondcourseVal === 'select') {
	// 	let secondchoiceError = document.getElementById("secondchoiceError");
	// 	secondchoiceError.innerHTML = "*** Choose a course"
	// 	e.preventDefault();
	// 	secondcourse.addEventListener('input', function () {
	// 		secondchoiceError.innerHTML = "";

	// 	})
	// }