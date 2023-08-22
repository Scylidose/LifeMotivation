import React, { Component } from 'react';
import { objectivesApi } from '../services/api/index';
import DotSlider from './DotSlider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ObjectiveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false,
            title: '',
            description: '',
            complexity: 1,
            priority: 1,
            intendedFinishDateTime: null
        };
    }

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

    // Convert a selected date into a timestamp and log it
    saveTimestamp = (selectedDate) => {
        if (selectedDate) {
            const timestamp = selectedDate.getTime();
            return timestamp;
        } else {
            console.log('No date selected.');
            return null;
        }
    };

    // Handle date picker changes and set the intended finish date and time
    handleDateChange = (date) => {
        this.setState({ intendedFinishDateTime: this.saveTimestamp(date) });
    };

    // Handle form submission
    handleSubmit = async event => {
        event.preventDefault();
        const {
            title,
            description,
            complexity,
            priority,
            intendedFinishDateTime
        } = this.state;

        // Create a new objective object using the input values
        const newObjective = {
            title,
            description,
            author: 'root', // To change
            complexity: parseInt(complexity),
            priority: parseInt(priority),
            intendedFinishDateTime: intendedFinishDateTime
        };

        try {
            const createdObjective = await objectivesApi.createNewObjective(newObjective);
            console.log('Objective created:', createdObjective);
            window.location.reload(); // Reload the page after creating the objective
        } catch (error) {
            console.error('Error creating objective:', error);
        }

        // Reset form values and hide the form
        this.setState({
            isFormVisible: false,
            title: '',
            description: '',
            complexity: 1,
            priority: 1,
            intendedFinishDateTime: null
        });
    };

    render() {
        const { isFormVisible } = this.state;
        const complexityLabelValues = ['A Breeze', '', 'Moderate', '', 'Quite a Challenge'];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow

        return (
            <div>
                <button id="create-form-button" onClick={this.toggleForm}>
                    Create New Objective
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
                        <label htmlFor="complexity">Complexity:</label>
                        <DotSlider name="complexity" type="complexity" onChange={this.handleInputChange} labelValues={complexityLabelValues} /><br />

                        <label htmlFor="difficulty">Priority:</label>
                        <input
                            type="number"
                            id="priority"
                            name="priority"
                            min="1"
                            value={this.state.priority}
                            onChange={this.handleInputChange}
                        />

                        <label htmlFor="intendedFinishDateTime">Intended Duration (minutes):</label>
                        <div className="calendar">
                            <DatePicker
                                selected={this.state.intendedFinishDateTime}
                                onChange={this.handleDateChange}
                                dateFormat="MMMM d, yyyy"
                                minDate={tomorrow}
                                inline
                            />
                        </div>

                        <button type="button" onClick={this.handleSubmit}>Create</button>
                    </form>
                )}
            </div>
        );
    }
}

export default ObjectiveForm;