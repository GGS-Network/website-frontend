import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const statusService = {
  async getSystemStatus() {
    try {
      const mockData = {
        services: [],
        announcements: [
          {
            id: 1,
            type: "info",
            message: "VelocityDesk wird voraussichtlich am 01.12.2025 um 18:00 Uhr (EU West / CET) veröffentlicht. Wir freuen uns darauf, Ihnen unsere innovativen IT-Infrastruktur-Lösungen präsentieren zu können.",
            startDate: new Date().toISOString(),
            endDate: "2025-12-01T18:00:00+01:00"
          }
        ],
        overall: {
          status: "upcoming",
          lastUpdated: new Date().toISOString()
        }
      };

      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockData;
    } catch (error) {
      console.error('Error fetching system status:', error);
      throw error;
    }
  }
};

export default statusService; 