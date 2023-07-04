import PropTypes from 'prop-types';
import css from './Filter.module.css';

function Filter({ value, onChange }) {
  return (
    <div className={css.filter_container}>
      <label className={css.label_filter} htmlFor="filter">
        Filter
      </label>
      <input
        name="filter"
        type="text"
        value={value}
        onChange={onChange}
        className={css.input_filter}
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
