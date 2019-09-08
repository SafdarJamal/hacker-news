import React from 'react';

const Table = props => {
  const { list, pattern, onDismiss } = props;

  return (
    <div>
      {list.map(item => (
        <div key={item.objectID}>
          <hr />
          <span>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </span>
          <br />
          <span>{item.author}</span>
          <br />
          <span>{item.num_comments}</span>
          <br />
          <span>{item.points}</span>
          <br />
          <span>
            <button onClick={() => onDismiss(item.objectID)}>Dismiss</button>
          </span>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Table;
