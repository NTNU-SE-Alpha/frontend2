// DropdownWrapper.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropdownWrapper = ({ apiUrl, token, onOptionSelect, selectedOption }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // 獲取選項資料
    const fetchOptions = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { data } = response;
        setOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [apiUrl, token]);

  return (
    <select
      value={selectedOption}
      onChange={(e) => onOptionSelect(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownWrapper;
