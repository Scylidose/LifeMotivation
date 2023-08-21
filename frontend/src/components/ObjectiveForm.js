import React, { Component } from 'react';
import { createNewObjective } from '../services/api';
import DotSlider from './DotSlider';

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
            priority: JSON.stringify(priority),
            intendedFinishDateTime: parseInt(intendedFinishDateTime)
        };

        try {
            const createdObjective = await createNewObjective(newObjective);
            console.log('Objective created:', createdObjective);
            window.location.reload();
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
        const complexityLabelValues = ['A Breeze', '', '', '', 'Quite a Challenge'];

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
                        
                        <button type="button" onClick={this.handleSubmit}>Create</button>
                    </form>
                )}
            </div>
        );
    }
}

export default ObjectiveForm;