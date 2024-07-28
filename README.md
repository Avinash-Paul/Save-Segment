Save Segment App
This application allows users to save segments by specifying segment names and schemas. It is built using React and Material-UI.

Features
Create and save segments with a specified name and schema.
Add and remove schemas dynamically.
Save the segment data by sending a POST request to a webhook.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Avinash-Paul/Save-Segment.git
cd save-segment-app
Install the dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Usage
Open your browser and navigate to http://localhost:3000.
Click the "Save segment" button to open the segment-saving popup.
Enter the name of the segment.
Add schemas to the segment by selecting from the dropdown and clicking "Add new schema".
Once all schemas are added, click "Save the segment" to save it.
Handling CORS Issue
The application sends a POST request to a webhook. Due to CORS policy, requests from http://localhost:3000 to external APIs may be blocked. To bypass this, we use the CORS Anywhere proxy.

Running CORS Anywhere
Clone the CORS Anywhere repository:

bash
Copy code
git clone https://github.com/Rob--W/cors-anywhere.git
cd cors-anywhere
Install the dependencies:

bash
Copy code
npm install
Start the CORS Anywhere server:

bash
Copy code
npm start
The server will run on http://localhost:8080.

Modifying the Application
Update the URL in App.js to use the CORS Anywhere proxy. Instead of directly calling the webhook URL, use the following format:

javascript
Copy code
const response = await fetch('http://localhost:8080/https://webhook.site/dd9b0388-d25c-49cf-ba36-6f0ced557d56', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});
This ensures that the request is routed through the CORS Anywhere proxy, bypassing the CORS policy.

Troubleshooting
If you encounter a CORS issue, ensure that the CORS Anywhere server is running on http://localhost:8080.
Ensure all dependencies are installed and the development server is running on http://localhost:3000.
License
This project is licensed under the MIT License. See the LICENSE file for details.