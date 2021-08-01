import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

function Filter({ value, onSearch }) {
  return (
    <div className={styles.filterContainer}>
      <label htmlFor="name" className={styles.label}>
        Find contacts by name
      </label>
      <input
        type="text"
        name="filter"
        className={styles.filter}
        value={value}
        onChange={onSearch}
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default Filter;
