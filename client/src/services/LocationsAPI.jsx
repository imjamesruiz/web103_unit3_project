import React from 'react';
import axios from  'axios';

const API_BASE_URL = '/api/locations';

export const fetchLocations = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
}


export const createLocations = async (locationData) => {
    try {
        const response = await axios.post(API_BASE_URL, locationData);
        return response.data;
    } catch (error) {
        console.error('Error creating locations', error);
        throw error;
        
    }
}

export const updateLocations = async (locationId, locationData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${locationId}`, locationData);
        return response.data;
    } catch (error) {
        console.error('Error updating locations', error);
        throw error;
    }
}

export const deleteLocations = async (locationId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting location', error);
        throw error;
    }
}