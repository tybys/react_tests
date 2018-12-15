import React, {Component} from 'react';

function filter(props) {
  let categores = props.data.map((item, index) => item.tippred);
  categores = [... new Set(categores)];

  const markup = categores.map((item, index) => {
    return (
      <option value={item} key={index}>{item}</option>
    )
  });

  return (
    <select onSelect={console.log('select')}>
      <option>все</option>
      {markup}
    </select>
  )
}

export default filter
