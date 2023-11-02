export function formatNumber(num) {
	// Takes a number and returns a string with 2 decimal
	// places and commas for thousands, millions, etc.

	return num ? num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : "";
}

export function formatDate(date) {
	// Takes a date string in ISO format and returns
	// a string in the format "Month, Day"
	const dateObj = new Date(date);
	const month = dateObj.toLocaleString("en", {month: "short"});
	const day = dateObj.getDate();
	return `${month} ${day}`;
}
