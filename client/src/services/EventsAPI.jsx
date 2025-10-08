import React from 'react';
import axios from 'axios';

const API_BASE_URL = '/api/events';

export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(API_BASE_URL, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  } 
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${eventId}`, eventData); 
    return response.data;
    } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}