# AI-In-Classics Sentiment Analysis Tool

## Local Environment Setup

- Flask supports python versions 3.8+.
- If you don't have npm installed yet, [click here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Follow these steps to set up your local development environment:

### Commands for Linux/macOS

1. **Clone the Repository**

   ```bash
   git clone https://github.com/bmansour1/Disease-Detecting-Doctors.git
   ```
2. **Create venv and Install Packages**

   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
3. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   npm install react-router-dom
   ```

   Make sure you have a valid npm installation
4. **Run the Application**

   ```bash
   npm start
   ```

   If you completed step 4 correctly, Vite and Flask should both start up at the same time.
   The frontend (Vite) will be located at

   ```url
   http://localhost/:5173
   ```

   The backend (Flask) will be located at

   ```url
   http://localhost/:5000
   ```
   or 
     ```url
   http://127.0.0.1:5000/
   ```
