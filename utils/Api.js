import config from "../config";

export function login(username, password) {
	const url = config.baseUrl + "/login";
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({username: username, password: password})
	});
}

export function getBankLink() {
	const url = config.baseUrl + "/bank/link";
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export function logout() {
	const url = config.baseUrl + "/logout";
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export function getSingleTransaction(id) {
	const url = config.baseUrl + "/transactions/" + id;
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export function putSingleTransaction(id, transaction) {
	const url = config.baseUrl + "/transactions/" + id;
	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({transaction: transaction})
	});
}

export async function getTransactions() {
	const url = config.baseUrl + "/transactions";
	const response = await fetch(url, {
	  method: "GET",
	  headers: {
		"Content-Type": "application/json"
	  }
	});
  
	if (response.status == 200) {
	  const data = await response.json();
	  let transactions = data.transactions;
	  let ids = transactions.map(transaction => transaction._id);
	  // Check that the ids are unique, otherwise throw an error
	  if (new Set(ids).size !== ids.length) {
		throw new Error("Duplicate ids");
	  } else {
		return transactions;
	  }
	} else {
	  throw new Error("Transactions failed");
	}
}