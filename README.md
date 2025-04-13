# Convo2025

Convo2025 is a system designed for college convocations that scans the admit card QR codes of students to grant entry and prevent duplicate admissions.

## Features

- **QR Code Scanning:** Reads and validates admit card QR codes.
- **Duplicate Prevention:** Blocks re-entry using the same card.
- **Real-Time Processing:** Provides instant feedback during entry.

## Tech Stack

- **Frontend:** React Native
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Prerequisites

- **Node.js & npm:** Ensure they are installed.
- **MongoDB:** Running instance (local or cloud).
- **React Native Environment:** Configured for Android and/or iOS.

## Installation

### Clone the Repository

```bash
git clone https://github.com/abhinavpareek655/convo2025.git
```

### Backend Setup

1. **Navigate to the Backend Directory:**  
   ```bash
   cd convo2025/backend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**  
   Create a `.env` file in the `backend` directory with the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```
4. **Start the Backend Server:**
   ```bash
   npm start
   ```
   *Alternatively:*
   ```bash
   node index.js
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory:**  
   *(Assuming the frontend code is in the `frontend` folder)*
   ```bash
   cd convo2025/frontend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run the React Native Application:**

   - For Android:
     ```bash
     npx react-native run-android
     ```
   - For iOS:
     ```bash
     npx react-native run-ios
     ```

## Usage

Once both the backend and frontend are running:

- Launch the mobile application to start scanning admit card QR codes.
- The system validates each QR code and prevents duplicate entry by disallowing reuse of the same QR code.
- Check backend logs for any duplicate scan attempts or errors.

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request for review.

## Related LinkedIn Post

For additional insights and updates on the project, see the related [LinkedIn post](https://www.linkedin.com/posts/abhinavpareek1_techforsecurity-reactnative-mernstack-activity-7297577397413974016-9gRb?utm_source=share&utm_medium=member_desktop&rcm=ACoAADfolR8B6XgS_mzRHgnG_XDCs9A4n0j3Riw) by the creator.

## Contact
email: abhinavpareek655@gmail.com

For further queries or feedback, please contact the repository owner.

---

GitHub Repository: [https://github.com/abhinavpareek655/convo2025.git](https://github.com/abhinavpareek655/convo2025.git)
