import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList';
import Filter from './Filter';
import ContactForm from './ContactForm';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const saveContact = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(saveContact);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const isExist = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (isExist) {
      alert(`${number} is already in contacts.`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  removeContact = ContId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== ContId),
      };
    });
  };

  getFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getListContacts = () => {
    const { contacts, filter } = this.state;
    const contactsLowCase = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(contactsLowCase));
  };

  render() {
    const { filter, contacts } = this.state;
    const listContacts = this.getListContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2 className={css.title}>Contacts</h2>
        {contacts.length > 1 && <Filter value={filter} onChange={this.getFilter} />}
        {contacts.length > 0 ? (
          <ContactList contacts={listContacts} onRemoveContact={this.removeContact} />
        ) : (
          <p>Your phonebook is empty. Please add contact.</p>
        )}
      </div>
    );
  }
}
