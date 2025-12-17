
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const Card = ({ children, className = '', noPadding = false }) => {
  return html`
    <div className=${`bg-white dark:bg-neutral-900 rounded-3xl border border-gray-200 dark:border-neutral-800 overflow-hidden relative group hover:border-gray-300 dark:hover:border-neutral-700 transition-colors duration-300 ${noPadding ? '' : 'p-6'} ${className}`}>
      ${children}
    </div>
  `;
};

export default Card;
