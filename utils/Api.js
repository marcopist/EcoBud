import config from "../config";

export function login(username, password) {
	url = config.baseUrl + "/login";
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({username: username, password: password})
	});
}
