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
	} else if (phoneVal.trim().length != 11) {
		phoneError.innerHTML = "*** Phone must be 11 numbers long";
		e.preventDefault();
	}

	let email = document.getElementById("email"),
		emailVal = email.value;
	if (emailVal.trim() == '') {
		var emailError = document.getElementById("emailError");
		emailError.innerHTML = "*** Email is Required"
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

	let facilitator = document.getElementById("facilitator"),
	facilitatorVal = facilitator.value;
	if (facilitatorVal === 'select') {
		let facilitatorError = document.getElementById("facilitatorError");
		facilitatorError.innerHTML = "*** Choose a facilitator please"
		e.preventDefault();
		facilitator.addEventListener('input', function () {
			facilitatorError.innerHTML = "";
		})
	}

	let firstcourse = document.getElementById("firstchoice"),
	firstcourseVal = firstcourse.value;
	if (firstcourseVal === 'select') {
		let firstchoiceError = document.getElementById("firstchoiceError");
		firstchoiceError.innerHTML = "*** Choose a course"
		e.preventDefault();
		firstcourse.addEventListener('input', function () {
			firstchoiceError.innerHTML = "";
		})
	}

	let secondcourse = document.getElementById("secondchoice"),
	secondcourseVal = secondcourse.value;
	if (secondcourseVal === 'select') {
		let secondchoiceError = document.getElementById("secondchoiceError");
		secondchoiceError.innerHTML = "*** Choose a course"
		e.preventDefault();
		secondcourse.addEventListener('input', function () {
			secondchoiceError.innerHTML = "";
		})
	}


})