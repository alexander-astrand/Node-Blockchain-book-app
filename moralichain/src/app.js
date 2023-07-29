import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/1/books'; // Update this if the API runs on a different port

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [newBlockData, setNewBlockData] = useState({ title: '', author: '', pages: '' });

  useEffect(() => {
    // Fetch the existing blocks from the API when the component mounts
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const updatedBlocks = response.data.data.map((block, index) => ({
        ...block,
        index: index + 1, // Add 1 to start the index from 1 instead of 0
      }));
      setBlocks(updatedBlocks);
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };

  const handleAddBlock = async () => {
    try {
      const response = await axios.post(API_BASE_URL, newBlockData);
      // After adding the new block, fetch the updated list of blocks from the API
      fetchBlocks();
      setNewBlockData({ title: '', author: '', pages: '' });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding block:', error);
    }
  };

  const checkBlockchainValidity = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/validity`);
      alert(response.data.message);
    } catch (error) {
      console.error('Error checking blockchain validity:', error);
    }
  };

  return (
    <div>
      <h1>Blockchain book archive</h1>
      <div>
        <h2>Books</h2>
        <ul>
          {blocks.map((block) => (
            <li key={block.index}>
              Block {block.index}: <br /> Title: {block.data.title} <br /> Author: {block.data.author} <br /> Pages: {block.data.pages}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add A New Book to the Blockchain</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newBlockData.title}
            onChange={(e) => setNewBlockData({ ...newBlockData, title: e.target.value })}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={newBlockData.author}
            onChange={(e) => setNewBlockData({ ...newBlockData, author: e.target.value })}
          />
        </div>
        <div>
          <label>Pages:</label>
          <input
            type="text"
            value={newBlockData.pages}
            onChange={(e) => setNewBlockData({ ...newBlockData, pages: e.target.value })}
          />
        </div>
        <button onClick={handleAddBlock}>Add Block</button>
        <button onClick={checkBlockchainValidity}>Check Blockchain Validity</button>
      </div>
    </div>
  );
};

export default App;

