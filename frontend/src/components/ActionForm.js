import React, { Component } from 'react';
import { actionsApi, objectivesApi } from '../services/api/index';
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
            difficulty: 1,
            intendedDuration: 1,
            selectedObjective: '',
            existingObjectives: [],
        };
    }

    componentDidMount() {
        objectivesApi.getObjectivesForUser('root')
            .then((data) => {
                this.setState({ existingObjectives: data });
            })
            .catch((error) => {
                console.error('Error fetching objectives:', error);
            });
    }

    handleObjectiveChange = (event) => {
        const selectedObjectiveID = event.target.value;
        this.setState({ selectedObjective: selectedObjectiveID });
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

    // Handle form submission
    handleSubmit = async event => {
        event.preventDefault();
        const {
            title,
            description,
            importance,
            daysOfWeek,
            difficulty,
            intendedDuration,
            selectedObjective
        } = this.state;

        // Create a new action object using the input values
        const newAction = {
            title,
            description,
            author: 'root', // To change
            isGood: true, // To change
            importance: parseInt(importance),
            daysOfWeek: JSON.stringify(daysOfWeek),
            difficulty: parseInt(difficulty),
            consistencyStreak: 0,
            intendedDuration: parseInt(intendedDuration),
            linkedObjective: selectedObjective
        };

        try {
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
            difficulty: 1,
            intendedDuration: 1,
            isFormVisible: false,
            selectedObjective: ''
        });
    };

    render() {
        const { isFormVisible } = this.state;
        const { selectedObjective, existingObjectives } = this.state;

        const importanceLabelValues = ['Meh, No Big Deal', '', '', '', 'Seriously Crucial'];
        const difficultyLabelValues = ['A Breeze', '', '', '', 'Quite a Challenge'];

        const convertDate = (timestamp) => {
            if(timestamp) {
                var date = new Date(timestamp);
                return date.toLocaleDateString('en-GB')
            }
            return "No date";
        };

        return (
            <div>
                <button id="create-form-button" onClick={this.toggleForm}>
                    Create New Action
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
                        <label htmlFor="importance">Importance:</label>
                        <DotSlider name="importance" type="importance" onChange={this.handleInputChange} labelValues={importanceLabelValues} /><br />

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

                        <label htmlFor="difficulty">Difficulty:</label>
                        <DotSlider name="difficulty" type="difficulty" onChange={this.handleInputChange} labelValues={difficultyLabelValues} /><br />

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
                        <button type="button" onClick={this.handleSubmit}>Create</button>
                    </form>
                )}
            </div>
        );
    }
}

export default ActionForm;