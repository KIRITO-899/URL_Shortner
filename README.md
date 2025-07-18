# Mini URL Shortener

A simple URL shortener web application built with Node.js, Express.js, and EJS templating engine. This application allows users to create short URLs for long web addresses and stores the mappings in a local JSON file.

## Features

- **URL Submission Form**: Users can submit long URLs through a simple web form
- **Short URL Generation**: Generates unique 6-character alphanumeric short IDs
- **Data Persistence**: Stores URL mappings in a local `urls.json` file using Node.js `fs` module
- **URL Display**: Shows all existing shortened URLs on the homepage with clickable links
- **Redirection**: Redirects users to original URLs when they visit short links
- **Click Tracking**: Tracks how many times each short URL has been clicked
- **Error Handling**: Gracefully handles missing URLs and invalid inputs

## Technology Stack

- **Backend**: Node.js with Express.js framework
- **View Engine**: EJS (Embedded JavaScript Templates)
- **Data Storage**: JSON file with Node.js `fs` module
- **Styling**: Inline CSS for responsive design

## Project Structure

```
url-shortener/
├── app.js              # Main server file
├── package.json        # Project dependencies and scripts
├── views/              # EJS templates
│   ├── index.ejs       # Homepage with form and URL list
│   └── error.ejs       # Error page for invalid short URLs
├── public/             # Static assets served by Express
│   └── css/            # Stylesheets
│       ├── homepage.css # Homepage styles
│       └── error.css   # Error page styles
├── data/               # Data storage
│   └── urls.json       # JSON file storing URL mappings
└── README.md          # This file
```

## Installation & Setup

1. **Clone or download this project**
   ```bash
   git clone https://github.com/KIRITO-899/URL_Shortner.git
   cd URL_Shortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## How to Use

1. **Shorten a URL**:
   - Open the application in your browser
   - Enter a long URL in the form (e.g., `https://www.example.com/very/long/path`)
   - Click "Shorten URL"
   - The short URL will be generated and displayed

2. **Use the short URL**:
   - Click on any generated short URL to be redirected to the original URL
   - Share the short URL with others

3. **View statistics**:
   - The homepage shows all your shortened URLs
   - Each URL displays creation date and click count

## API Endpoints

- `GET /` - Homepage with form and URL list
- `POST /shorten` - Create a new short URL
- `GET /:shortId` - Redirect to original URL

## Data Format

The `urls.json` file stores URL mappings in the following format:

```json
{
  "abc123": {
    "originalUrl": "https://example.com/very/long/url",
    "shortId": "abc123",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "clicks": 5
  }
}
```

## Error Handling

- **Invalid URLs**: Shows error message for malformed URLs
- **Missing short URLs**: Displays 404 error page for non-existent short IDs
- **File system errors**: Gracefully handles read/write errors to the JSON file

## Customization

- **Port**: Change the port by setting the `PORT` environment variable
- **Short ID length**: Modify the `generateShortId()` function in `app.js`
- **Styling**: Update the CSS in the EJS templates for custom appearance

## Development Notes

- The application creates the `data` directory and `urls.json` file automatically if they don't exist
- Short IDs are generated randomly and checked for uniqueness
- The application uses Express built-in middleware for parsing form data
- All timestamps are stored in ISO format for consistency

## Requirements Met

✅ URL submission form  
✅ Short URL generation (6-character alphanumeric)  
✅ Data persistence with fs module  
✅ URL display on homepage  
✅ Redirection functionality  
✅ Error handling for missing URLs  
✅ Express.js routing  
✅ EJS templating  
✅ JSON file storage  

## License

This project is open source and available under the MIT License.
