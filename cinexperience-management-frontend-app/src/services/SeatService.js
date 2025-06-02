// src/services/SeatService.js
import axios from 'axios';

const API_BASE = 'http://localhost:9000/api/seats';

const SeatService = {
    reserveSeat: (id) => axios.put(`${API_BASE}/reserve/${id}`)
};

export default SeatService;