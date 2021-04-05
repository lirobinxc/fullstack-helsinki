import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterAction } from '../reducers/filterReducer';

const Filter = () => {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    dispatch(filterAction(filter));
  }, [dispatch, filter]);

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter: <input type="text" onChange={handleChange} value={filter} />
    </div>
  );
};

export default Filter;
