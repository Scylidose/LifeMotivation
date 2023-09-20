.PHONY: install-all

# Install dependencies for the frontend
install-frontend:
	cd frontend && npm install

# Install dependencies for the Node.js backend
install-backend-nodejs:
	cd backend/nodejs && npm install

# Create a virtual environment and install dependencies for the Python backend
install-backend-python: 
	cd backend/python && python3 -m venv venv
	cd backend/python && source venv/bin/activate && pip install -r requirements.txt

# Run the frontend
run-frontend: install-frontend
	cd frontend && npm start

# Run the Node.js backend
run-backend-nodejs: install-backend-nodejs
	cd backend/nodejs && npm start

# Run the Python backend
run-backend-python: install-backend-python
	cd backend/python && source venv/bin/activate && python3 app.py

# Install all project dependencies
install-all: install-backend-python
