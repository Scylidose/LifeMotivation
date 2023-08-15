import React, { Component } from 'react';
import { createNewAction } from './services/api';

class ActionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false,
            title: '',
            description: '',
            importance: 1,
            frequency: 1,
            difficulty: 1,
            intendedDuration: 1
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

    // Handle form submission
    handleSubmit = async event => {
        event.preventDefault();
        const {
            title,
            description,
            importance,
            frequency,
            difficulty,
            intendedDuration
        } = this.state;

        // Create a new action object using the input values
        const newAction = {
            title,
            description,
            author: '1',
            importance: parseInt(importance),
            frequency: parseInt(frequency),
            difficulty: parseInt(difficulty),
            consistencyStreak: 0,
            intendedDuration: parseInt(intendedDuration)
        };

        console.log(newAction);

        try {
            const createdAction = await createNewAction(newActionData);
            console.log('Action created:', createdAction);
        } catch (error) {
            console.error('Error creating action:', error);
        }

        // Reset form values and hide the form
        this.setState({
            title: '',
            description: '',
            importance: 1,
            frequency: 1,
            difficulty: 1,
            intendedDuration: 1,
            isFormVisible: false
        });
    };


    render() {
        const { isFormVisible } = this.state;

        return (
            <div>
                <button id="create-action-button" onClick={this.toggleForm}>
                    Create New Action
                </button>

                {isFormVisible && (
                    <form id="action-form" style={{ display: 'none' }}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            required
                        />

                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            required
                        />

                        <label htmlFor="importance">Importance:</label>
                        <input
                            type="range"
                            id="importance"
                            name="importance"
                            min="1"
                            max="5"
                            value={this.state.importance}
                            onChange={this.handleInputChange}
                        />

                        <label htmlFor="frequency">Frequency:</label>
                        <input
                            type="range"
                            id="frequency"
                            name="frequency"
                            min="1"
                            max="5"
                            value={this.state.frequency}
                            onChange={this.handleInputChange}
                        />

                        <label htmlFor="difficulty">Difficulty:</label>
                        <input
                            type="range"
                            id="difficulty"
                            name="difficulty"
                            min="1"
                            max="5"
                            value={this.state.difficulty}
                            onChange={this.handleInputChange}
                        />

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
                        <button type="submit">Create</button>
                    </form>
                )}
            </div>
        );
    }
}

export default ActionForm;