import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {

    state = {
        name: '',
        number: ''
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onAddContact({ ...this.state })
        this.reset()
    }

    reset = () => {
        this.setState(
            {
                name: '',
                number: ''
            })
    }

    render() {
        const { name, number } = this.state;

        return (
            <>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <span className={styles.spanText}>Name</span>
                    <label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            autoComplete="off"
                            className={styles.input}

                        />
                    </label>

                    <span className={styles.spanText}>Number</span>
                    <label>
                        <input
                            type="text"
                            name="number"
                            value={number}
                            onChange={this.handleChange}
                            autoComplete="off"
                            minLength={5}
                            className={styles.input}
                        />
                    </label>
                    <button className={styles.btn} type="submit">Add contact</button>
                </form>
            </>
        )
    }
}

ContactForm.propTypes = {
    onAddContact: PropTypes.func.isRequired,
}

