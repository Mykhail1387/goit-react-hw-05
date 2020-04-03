import React, { Component } from 'react';
import ContactForm from './contactForm/contactForm';
import ContactList from './contactList/ContactList ';
import Filter from './filter/filter';
import shortId from 'shortid';

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
    }

    componentDidMount() {
        const haveLocalStorage = localStorage.getItem('contacts')

        if (haveLocalStorage) {
            this.setState({ contacts: JSON.parse(haveLocalStorage) })
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.contacts !== this.state.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
        }
    }

    changeFilter = e => {
        this.setState({ filter: e.target.value })
    }

    addListWithContactForm = task => {

        const searchSameName = this.state.contacts.map(cont => cont.name).includes(task.name)

        if (searchSameName) {
            alert(`${task.name} is already in contacts`)
        } else if (task.name.length === 0) {
            alert('Fields must be filled!')
        } else {
            const contactToAdd = {
                ...task,
                id: shortId.generate(),
            };

            this.setState(state => ({
                contacts: [...state.contacts, contactToAdd],
            }));
        }
    };

    deleteContact = id => {
        this.setState(state => ({
            contacts: state.contacts.filter(cont => cont.id !== id)
        }));
    };

    render() {
        const { contacts, filter } = this.state;
        const filteredContacts = filterContacts(contacts, filter)

        return (
            <div>
                <h1>Phonebook</h1>
                <ContactForm propContacts={contacts} onAddContact={this.addListWithContactForm} />
                <h2>Contacts</h2>
                {contacts.length >= 2 ? < Filter value={filter} onchangeFilter={this.changeFilter} /> : null}
                <ContactList listContacts={filteredContacts} onDeleteContact={this.deleteContact} />
            </div>
        )
    }
}