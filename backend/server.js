require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Sync models
    try {
      await sequelize.sync(); 
      console.log('Database synced successfully.');
    } catch (syncError) {
      console.error('Database sync failed, but starting server anyway:', syncError);
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('CRITICAL: Unable to start server:', error);
  }
};

startServer();
