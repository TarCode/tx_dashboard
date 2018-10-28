export const setUser = (user, token) => {
	localStorage.setItem("user", JSON.stringify(user));
	localStorage.setItem("token", token)

	const companies = JSON.parse(localStorage.getItem('companies'))

	if (companies && companies.length > 0) {
		if (companies.indexOf(user.company) < 0) {
			companies.push(user.company)
		}
		localStorage.setItem('companies', JSON.stringify(companies))
	} else {
		localStorage.setItem('companies', JSON.stringify([user.company]))
	}
	window.location = '/';
}

export const removeUser = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("token");

	window.location = '/';
}