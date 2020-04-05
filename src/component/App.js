import React, { Component } from 'react';
import ContactForm from './contactForm/contactForm';
import ContactList from './contactList/ContactList ';
import Filter from './filter/filter';
import shortId from 'shortid';

import { CSSTransition } from 'react-transition-group'
import styles from './app.module.css';
import forTitle from './transitions/forTitle.module.css';
import Already from './already/Already';
import ForAlready from './transitions/ForWarnings.module.css';
import Nothing from './nothing/Nothing';
import ForNothing from './transitions/ForWarnings.module.css'
import ForFilter from './transitions/ForFilter.module.css';



const filterContacts = (contacts, filter) => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
};

export default class App extends Component {

    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
        isOpen: false,
        isAlready: false,
        isNothing: false
    }

    componentDidMount() {
        this.setState({ isOpen: true })
    }

    changeFilter = e => {
        this.setState({ filter: e.target.value })
    }

    addListWithContactForm = task => {

        const searchSameName = this.state.contacts.map(cont => cont.name).includes(task.name)

        if (searchSameName) {
            this.setState({ isAlready: true })
            setTimeout(() => {
                this.setState({ isAlready: false });
            }, 2000);
        } else if (task.name.length === 0) {
            this.setState({ isNothing: true });
            setTimeout(() => {
                this.setState({ isNothing: false });
            }, 2000);

        } else {
            const contactToAdd = {
                ...task,
                id: shortId.generate(),
            };

            this.setState(state => ({
                contacts: [contactToAdd, ...state.contacts],
            }));
        }
    };

    deleteContact = id => {
        this.setState(state => ({
            contacts: state.contacts.filter(cont => cont.id !== id)
        }));
    };

    contactsLength = () => {
        const { contacts } = this.state;
        return contacts.length >= 2;
    }

    render() {
        const { contacts, filter, isOpen, isAlready, isNothing } = this.state;
        const filteredContacts = filterContacts(contacts, filter)
        const boolForFilter = this.contactsLength()

        return (
            <div className={styles.wrapper}>
                <CSSTransition in={isOpen} timeout={500} unmountOnExit classNames={forTitle}>
                    <h1 className={styles.text}>Phonebook</h1>
                </CSSTransition>
                <CSSTransition in={isAlready} timeout={250} unmountOnExit classNames={ForAlready}>
                    <Already />
                </CSSTransition>
                <CSSTransition in={isNothing} timeout={250} unmountOnExit classNames={ForNothing}>
                    <Nothing />
                </CSSTransition>
                <ContactForm propContacts={contacts} onAddContact={this.addListWithContactForm} />
                <CSSTransition in={boolForFilter} timeout={250} unmountOnExit classNames={ForFilter}>
                    < Filter value={filter} onchangeFilter={this.changeFilter} />
                </CSSTransition>
                <ContactList listContacts={filteredContacts} onDeleteContact={this.deleteContact} />
            </div>
        )
    }
}
