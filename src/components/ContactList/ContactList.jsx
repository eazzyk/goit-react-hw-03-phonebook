import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.contactItem} key={id}>
          <p>
            {name}: {number}
          </p>
          <button
            className={css.contactDeleteBtn}
            type="button"
            onClick={() => onRemoveContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;
