export default function getMonthDifference(startDate: Date, endDate: Date) {
	return (
		endDate.getMonth() -
		startDate.getMonth() +
		12 * (endDate.getFullYear() - startDate.getFullYear())
	);
}
