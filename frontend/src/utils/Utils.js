// Function to convert a timestamp to a formatted date
export function convertDate(timestamp) {
    if (timestamp) {
        var date = new Date(timestamp);
        return date.toLocaleDateString('en-GB')
    }
    return "No date";
};

// Function to calculate XP from an action based on :
// Habit XP = ((5 / Importance) * (5 / Frequency) * (1 / Difficulty)) * (Duration Ratio))
// Duration Ratio = max(Actual Duration / Intended Duration, 2)
export function calculateBitXP(action) {
    const importance = 5 / action.importance;
    const frequency = 5 / action.frequency;
    const difficulty = 1 / action.difficulty;
    var actual_duration = action.realDuration;

    if (isNaN(actual_duration) || actual_duration === null || !isFinite(actual_duration)) {
        actual_duration = 1;
    }

    const intended_duration = action.intendedDuration;
    let duration_ratio = Math.max(actual_duration / intended_duration, 2);

    let gained_xp = (importance * frequency * (1 / difficulty)) * duration_ratio;
    console.log("XP = (", importance, " * ", frequency, " * (1 / ", difficulty, ")) * ", duration_ratio);

    return gained_xp;
}