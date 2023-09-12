const base_xp = 500;
const grown_rate = 1.3;

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
    console.log(
        `XP = (${importance} * ${frequency} * (1 / ${difficulty})) * ${duration_ratio} = ${gained_xp}`
    );

    return gained_xp;
}

// Function to calculate level based of total XP from user
// Level = 1 + (Total XP / Base XP)^B
// Base XP (required for the first level) = 500
// B (growth rate) = 1.5 (Modify this value to change the progression difficulty)
export function calculateXPLevel(total_xp) {
    let current_level = 0;
    let next_level_xp = base_xp;

    while (total_xp >= next_level_xp) {
        current_level++;
        next_level_xp = base_xp * (Math.pow(current_level + 1, grown_rate) - 1);
    }

    current_level++;

    console.log(
        `Level = 1 + (${total_xp} /${base_xp})^ ${grown_rate} = ${current_level}`
    );

    return current_level;
}

// Function to calculate current level XP based of total XP from user
// Current Level = 1 + (Total XP / Base XP)^B
// Level XP = Base XP * ((Current Level^B) - 1)
// Base XP (required for the first level) = 500
// B (growth rate) = 1.5 (Modify this value to change the progression difficulty)
export function calculateLevelXP(total_xp) {
    const level = calculateXPLevel(total_xp);
    var level_xp = Math.floor(base_xp * (Math.pow(level, grown_rate) - 1));

    if (level === 1) {
        level_xp = base_xp;
    }

    console.log(
        `Level XP = (${base_xp} * (${level})^ "${grown_rate}") - 1 = ${level_xp}`
    );

    return level_xp;
}

// Function to calculate next level xp needed based of total XP from user
// Next Level XP Needed = (Next Level XP - Total XP)
// Next Level XP = Base XP * ((Current Level^B) - 1)
// Current Level = 1 + (Total XP / Base XP)^B
// Base XP (required for the first level) = 500
// B (growth rate) = 1.5 (Modify this value to change the progression difficulty)
export function calculateNextLevelXP(total_xp) {
    const current_level = calculateXPLevel(total_xp);
    var next_level_xp = calculateLevelXP(total_xp);
    if (next_level_xp <= 0) {
        next_level_xp = 0;
    }

    const xp_needed_next_level = Math.floor(next_level_xp - total_xp);

    console.log(
        `Next Level XP Needed = ((${base_xp} * (${current_level})^ "${grown_rate}") - 1) - ${total_xp} = ${xp_needed_next_level}`
    );

    return xp_needed_next_level;
}