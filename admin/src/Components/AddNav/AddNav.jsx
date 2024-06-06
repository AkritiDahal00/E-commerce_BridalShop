import React from 'react'
import'./AddNav.css'
import { useState, useEffect } from 'react';
import axios from 'axios';


const AddNav = () => {
   
  const [navItems, setNavItems] = useState([]);
  const [text, setText] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    fetchNavItems();
  }, []);

  const fetchNavItems = async () => {
    try {
      const response = await axios.get('http://localhost:4000/navitems');
      setNavItems(response.data);
    } catch (error) {
      console.error('Error fetching navbar items:', error);
    }
  };

  const addNavItem = async () => {
    try {
      const response = await axios.post('http://localhost:4000/addnavitem', { text, link });
      setNavItems([...navItems, response.data]);
      setText('');
      setLink('');
    } catch (error) {
      console.error('Error adding navbar item:', error);
    }
  };

  const deleteNavItem = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deletenavitem/${id}`);
      setNavItems(navItems.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting navbar item:', error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <input
          type="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={addNavItem}>Add Navbar Item</button>
      </div>
      <ul>
        {navItems.map(item => (
          <li key={item._id}>
            {item.text} - {item.link}
            <button onClick={() => deleteNavItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AddNav
