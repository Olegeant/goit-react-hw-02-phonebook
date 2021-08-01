import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  pattern = {
    name: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
    number:
      '^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$',
  };

  isStringValid = (str, pattern) => {
    const testRegExp = new RegExp(pattern);

    return str === '' || testRegExp.test(str);
  };

  handleInputChange = evt => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { name, number } = this.state;
    this.props.onFormSubmit(name, number);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  makeFieldClass = (value, type) => {
    return [
      styles.field,
      ...(this.isStringValid(value, this.pattern[type])
        ? []
        : [styles.invalid]),
    ].join(' ');
  };

  render() {
    const { name, number } = this.state;
    const { pattern, makeFieldClass, handleInputChange, handleSubmit } = this;

    return (
      <form autoComplete="off" className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          className={makeFieldClass(name, 'name')}
          onChange={handleInputChange}
          pattern={pattern.name}
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />

        <label htmlFor="number" className={styles.label}>
          Number
        </label>
        <input
          type="tel"
          name="number"
          value={number}
          className={makeFieldClass(number, 'number')}
          onChange={handleInputChange}
          pattern={pattern.number}
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />

        <button type="submit" className={styles.submit}>
          Add Contact
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Form;
