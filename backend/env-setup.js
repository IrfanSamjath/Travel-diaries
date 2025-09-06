require('dotenv').config({ path: __dirname + '/.env' });
console.log('Environment variables loaded from:', __dirname + '/.env');

// Force set MONGODB_URI if not set in .env
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://irfansamjath007_db_user:F1VTUDGEuAKNTpzJ@traveldiaries.wdjllmv.mongodb.net/?retryWrites=true&w=majority&appName=Traveldiaries';
  console.log('MONGODB_URI was not set, defaulting to:', process.env.MONGODB_URI);
}

console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('PORT:', process.env.PORT || 5000);

require('./server');
