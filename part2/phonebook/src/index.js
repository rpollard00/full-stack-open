import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const contacts = [ 
  {
    id: 1,
    name: "Julio Rodriguez",
    phone: "555-219-4200",
  },
  {
    id: 2,
    name: "Jesse Winker",
    phone: "360-867-5309",
  },
  {
    id: 3,
    name: "Ty France",
    phone: "1-800-TYF-RANC",
  },
]

ReactDOM.createRoot(document.getElementById('root')).render(<App contacts={contacts} />);