import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const getAll = async () => {
  const res = await axios.get(`${baseURL}/anecdotes`);
  return res.data;
};

export const postNote = async (notes) => {
  const res = await axios.post(`${baseURL}/anecdotes`, notes);
  return res;
};

export const deleteNote = async (id) => {
  const res = await axios.delete(`${baseURL}/${id}`);
  return res;
};
