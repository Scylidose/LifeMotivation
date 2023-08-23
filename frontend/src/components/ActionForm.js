import React, { Component } from 'react';
import { actionsApi, objectivesApi } from '../services/api/index';
import { convertDate } from '../utils/Utils';

import DotSlider from './DotSlider';

class ActionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false,
            title: '',
            description: '',
            isGood: true,
            importance: 1,
            daysOfWeek: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
            },
            frequency: 1,
            difficulty: 1,
            intendedDuration: 1,
            selectedObjective: '',
            existingObjectives: [],
        };
    }

    componentDidMount() {
        // Fetch existing objectives when the component mounts
        objectivesApi.getObjectivesForUser('root')
            .then((data) => {
                this.setState({ existingObjectives: data });
            })
            .catch((error) => {
                console.error('Error fetching objectives:', error);
            });
    }

    // Function to toggle between "Good" and "Bad" action forms
    toggleActionType = () => {
        this.setState((prevState) => ({
            isGood: !prevState.isGood,
        }));
    };

    // Toggle form visibility
    toggleForm = () => {
        this.setState(prevState => ({
            isFormVisible: !prevState.isFormVisible
        }));
    };

    // Handle form input changes
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    // Handle slider input changes
    handleSliderChange = (type, value) => {
        this.setState({ [type]: value });
    };

    // Handle select day of the week
    handleDayOfWeekChange = (event) => {
        const { name, checked } = event.target;
        this.setState((prevState) => ({
            daysOfWeek: {
                ...prevState.daysOfWeek,
                [name]: checked,
            },
        }));
    };

    // Handle changes in the selected objective
    handleObjectiveChange = (event) => {
        const selectedObjectiveID = event.target.value;
        this.setState({ selectedObjective: selectedObjectiveID });
    };

    // Handle form submission for a good action
    handleSubmit = async event => {
        event.preventDefault();
        const {
            title,
            description,
            importance,
            isGood,
            daysOfWeek,
            frequency,
            difficulty,
            intendedDuration,
            selectedObjective
        } = this.state;

        // Create a new action object using the input values
        const newAction = {
            title,
            description,
            author: 'root', // To change
            isGood: isGood,
            importance: parseInt(importance),
            daysOfWeek: JSON.stringify(daysOfWeek),
            frequency: parseInt(frequency),
            difficulty: parseInt(difficulty),
            consistencyStreak: 0,
            intendedDuration: parseInt(intendedDuration),
            linkedObjective: selectedObjective
        };

        try {
            // Create the action using the API
            const createdAction = await actionsApi.createNewAction(newAction);
            console.log('Action created:', createdAction);
            window.location.reload();
        } catch (error) {
            console.error('Error creating action:', error);
        }

        // Reset form values and hide the form
        this.setState({
            title: '',
            description: '',
            isGood: true,
            importance: 1,
            daysOfWeek: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
            },
            frequency: 1,
            difficulty: 1,
            intendedDuration: 1,
            isFormVisible: false,
            selectedObjective: ''
        });
    };

    render() {
        const { isFormVisible, selectedObjective, existingObjectives, isGood } = this.state;

        // Label values for importance, frequency and difficulty sliders
        const importanceLabelValues = ['Meh, No Big Deal', '', 'Moderately Important', '', 'Seriously Crucial'];
        const difficultyLabelValues = ['A Breeze', '', 'Moderately Challenging', '', 'Quite a Challenge'];
        const frequencyLabelValues = ['Once in a Blue Moon', '', 'Occasionally', '', 'All the Time'];

        const detrimentalImpactLabelValues = ['Minimal Impact', '', 'Moderate Impact', '', 'Severe Impact'];
        const difficultyBreakLabelValues = ['Easy to Break', '', 'Moderately Challenging', '', 'Extremely Difficult'];

        return (
            <div>
                <button id="create-form-button" onClick={this.toggleForm}>
                    Create New Action
                </button>

                <button onClick={this.toggleActionType}>
                    Switch to {isGood ? 'Bad' : 'Good'} Action
                </button>

                {isFormVisible && (

                    <form id="form-card">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            required
                        /><br />

                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            required
                        /><br />

                        {isGood ? (
                            <div>
                                <label htmlFor="importance">Importance:</label>
                                <DotSlider name="importance" type="importance" onChange={this.handleSliderChange} labelValues={importanceLabelValues} /><br />

                                <label htmlFor="difficulty">Difficulty:</label>
                                <DotSlider name="difficulty" type="difficulty" onChange={this.handleSliderChange} labelValues={difficultyLabelValues} /><br />

                                <label htmlFor="frequency">Frequency:</label>
                                <DotSlider name="frequency" type="frequency" onChange={this.handleSliderChange} labelValues={frequencyLabelValues} /><br />

                                <div>
                                    <label>Days of the Week:</label>
                                    <div className="day-checkboxes">

                                        {Object.keys(this.state.daysOfWeek).map((day) => (
                                            <div key={day} className={this.state.daysOfWeek[day] ? 'selected-day' : ''}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name={day}
                                                        checked={this.state.daysOfWeek[day]}
                                                        onChange={this.handleDayOfWeekChange}
                                                    />
                                                    <span className="day-label-span">{day.charAt(0).toUpperCase() + day.charAt(1)}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {existingObjectives.length > 0 && (
                                    <div>
                                        <label htmlFor="linkedObjective">Link an objective</label>
                                        <select
                                            id="objective"
                                            name="objective"
                                            value={selectedObjective}
                                            onChange={this.handleObjectiveChange}
                                        >
                                            <option value="">Select an Objective</option>
                                            {existingObjectives.map((objective) => (
                                                <option key={objective.id} value={objective.id}>
                                                    {objective.title} - P{objective.priority} - ENDS: {convertDate(objective.intendedFinishDateTime)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <label htmlFor="intendedDuration">Intended Duration (minutes):</label>
                                <input
                                    type="number"
                                    id="intended-duration"
                                    name="intendedDuration"
                                    min="1"
                                    max="1440"
                                    value={this.state.intendedDuration}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="detrimentalImpact">Detrimental Impact:</label>
                                <DotSlider name="detrimentalImpact" type="detrimentalImpact" onChange={this.handleSliderChange} labelValues={detrimentalImpactLabelValues} /><br />

                                <label htmlFor="difficultyBreak">Difficulty to break:</label>
                                <DotSlider name="difficultyBreak" type="difficultyBreak" onChange={this.handleSliderChange} labelValues={difficultyBreakLabelValues} /><br />

                                <label htmlFor="frequency">Frequency:</label>
                                <DotSlider name="frequency" type="frequency" onChange={this.handleSliderChange} labelValues={frequencyLabelValues} /><br />

                                <div>
                                    <label>Days of the Week:</label>
                                    <div className="day-checkboxes">

                                        {Object.keys(this.state.daysOfWeek).map((day) => (
                                            <div key={day} className={this.state.daysOfWeek[day] ? 'selected-day' : ''}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name={day}
                                                        checked={this.state.daysOfWeek[day]}
                                                        onChange={this.handleDayOfWeekChange}
                                                    />
                                                    <span className="day-label-span">{day.charAt(0).toUpperCase() + day.charAt(1)}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <label htmlFor="intendedDuration">How much time in average you spend on your bad Bit (minutes):</label>
                                <input
                                    type="number"
                                    id="intended-duration"
                                    name="intendedDuration"
                                    min="1"
                                    max="1440"
                                    value={this.state.intendedDuration}
                                    onChange={this.handleInputChange}
                                />

                            </div>
                        )}
                        <button type="button" onClick={this.handleSubmit}>Create {isGood ? 'Good' : 'Bad'} Action</button>
                    </form>
                )}
            </div>
        );
    }
}

export default ActionForm;