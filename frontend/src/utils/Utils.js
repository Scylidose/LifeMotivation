// Function to convert a timestamp to a formatted date
export function convertDate(timestamp) {
    if (timestamp) {
        var date = new Date(timestamp);
        return date.toLocaleDateString('en-GB')
    }
    return "No date";
};