import React from 'react';

const Search = () => {
  return (
    <div className="input-icon mt-3 mb-3">
      <input type="text" value="" className="form-control" placeholder="Search" />
      <span className="input-icon-addon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="10" cy="10" r="7"></circle>
          <line x1="21" y1="21" x2="15" y2="15"></line>
        </svg>
      </span>
    </div>
  );
};

export default Search;
