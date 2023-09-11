const base_xp = 500;
const grown_rate = 1.5;

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
    console.log("XP = (", importance, " * ", frequency, " * (1 / ", difficulty, ")) * ", duration_ratio, " = ", gained_xp);

    return gained_xp;
}

// Function to calculate level based of total XP from user
// Level = 1 + (Total XP / Base XP)^B
// Base XP (required for the first level) = 500
// B (growth rate) = 1.5 (Modify this value to change the progression difficulty)
export function calculateXPLevel(total_xp) {
    const level = Math.floor(1 + Math.pow(total_xp / base_xp, grown_rate));
    console.log("Level = 1 + (", total_xp, " / ", base_xp, ")^ ", grown_rate, " = ", level);

    return level;
}

// Function to calculate next level xp needed based of total XP from user
// Next Level XP Needed = (Next Level XP - Total XP)
// Next Level XP = Base XP * ((Current Level^B) - 1)
// Current Level = 1 + (Total XP / Base XP)^B
// Base XP (required for the first level) = 500
// B (growth rate) = 1.5 (Modify this value to change the progression difficulty)
export function calculateXPNextLevel(total_xp) {
    const current_level = calculateXPLevel(total_xp);

    var next_level = current_level + 1;
    var next_level_xp = base_xp * (Math.pow(next_level, grown_rate) - 1);

    const xp_needed_next_level = Math.floor(next_level_xp - total_xp);

    console.log(
        `Next Level XP Needed = (${base_xp} * (${current_level + 1}^${grown_rate} - 1)) - (${base_xp} * ((${total_xp} / ${base_xp})^${grown_rate} - 1)) = ${xp_needed_next_level}`
    );

    return xp_needed_next_level;
}