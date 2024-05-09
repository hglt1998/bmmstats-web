export const diffHours = (repertorios) => {
	const toDateParts = repertorios
		.filter((item) => !item.url)[0]
		.time?.split(", ")[0]
		.split("/");
	const toTimeParts = repertorios
		.filter((item) => !item.url)[0]
		.time?.split(", ")[1]
		.split(":");

	var toDate = new Date(toDateParts[2], toDateParts[1] - 1, toDateParts[0], toTimeParts[0], toTimeParts[1], toTimeParts[2]).getTime();

	const fromDateParts = repertorios
		.filter((item) => !item.url)
		[repertorios.filter((item) => !item.url).length - 1].time?.split(", ")[0]
		.split("/");
	const fromTimeParts = repertorios
		.filter((item) => !item.url)
		[repertorios.filter((item) => !item.url).length - 1].time?.split(", ")[1]
		.split(":");
	var fromDate = new Date(fromDateParts[2], fromDateParts[1] - 1, fromDateParts[0], fromTimeParts[0], fromTimeParts[1], fromTimeParts[2]).getTime();

	const DATE_UNITS = {
		// in seconds
		year: 31536000,
		month: 2629800,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1
	};

	const languageCode = "es"; // English

	const rtf = new Intl.NumberFormat(languageCode, { numeric: "auto" });

	const elapsed = (fromDate - toDate) / 1000;

	for (const unit in DATE_UNITS) {
		if (Math.abs(elapsed) > DATE_UNITS[unit]) {
			return rtf.format(Math.round(elapsed / DATE_UNITS[unit]), unit);
		}
	}
	return rtf.format(0, "second");
};
