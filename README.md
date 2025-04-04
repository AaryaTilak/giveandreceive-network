
# Community Aid Platform

## Project Setup

### Frontend
1. Install dependencies: `npm install`
2. Run the frontend: `npm run dev`

### Backend
1. Navigate to server directory: `cd server`
2. Install dependencies: `npm install`
3. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Update the connection string in `server/.env`
4. Start the server: `npm run dev`

## Environment Variables

Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/communityaid
```

Replace the MongoDB URI with your connection string if using MongoDB Atlas.
