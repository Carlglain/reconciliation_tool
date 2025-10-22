# Transaction Reconciliation Tool

A Node.js Express application that processes Excel files containing transaction reference IDs and reconciles them against an external API endpoint.

## Features

- 📁 Upload Excel files with transaction reference IDs
- 🔄 Batch processing with rate limiting to respect API limits
- 📊 Generate detailed reconciliation reports
- 🌐 Web interface for easy file upload
- ⚡ Fast processing compared to manual Postman requests

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure API endpoint:**
   Update the `RECONCILIATION_API_URL` in `index.js` with your actual API endpoint:

   ```javascript
   const RECONCILIATION_API_URL = "https://your-api-endpoint.com/reconcile";
   ```

3. **Configure API headers:**
   Add any required authentication headers in the `API_HEADERS` object:

   ```javascript
   const API_HEADERS = {
     "Content-Type": "application/json",
     Authorization: "Bearer your-api-key",
     // Add other required headers
   };
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

5. **Access the web interface:**
   Open your browser and go to `http://localhost:3000`

## Usage

### Web Interface

1. Open `http://localhost:3000` in your browser
2. Upload an Excel file containing transaction reference IDs
3. Wait for processing to complete
4. Download the results file

### API Endpoint

You can also use the API directly:

```bash
curl -X POST -F "excelFile=@your-file.xlsx" http://localhost:3000/reconcile
```

## Excel File Format

Your Excel file should contain a column with reference IDs. The tool will automatically detect columns with names containing:

- "reference"
- "ref"
- "id"

### Sample Excel Structure:

| Reference ID                         | Amount | Description        | Date       |
| ------------------------------------ | ------ | ------------------ | ---------- |
| 42cd33fa-adb2-417b-9ec6-09c7604501d4 | 500    | Test Transaction 1 | 2024-01-15 |
| a1b2c3d4-e5f6-7890-abcd-ef1234567890 | 1000   | Test Transaction 2 | 2024-01-16 |

## Output Format

The tool generates an Excel file with the following columns:

- **Reference ID**: Original reference ID from input
- **Status**: SUCCESS or FAILED
- **API Response Status**: Status from the API response
- **Financial Transaction ID**: Transaction ID from API
- **External ID**: External ID from API
- **Amount**: Transaction amount
- **Currency**: Transaction currency
- **Payer Phone**: Payer phone number
- **Payer Message**: Payer message
- **Payee Note**: Payee note
- **Error Message**: Error details if failed
- **Processed At**: Timestamp of processing
- **All original columns**: Preserved from input file

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)
- `RECONCILIATION_API_URL`: API endpoint URL

### Batch Processing

The tool processes transactions in batches of 5 with a 1-second delay between batches to avoid overwhelming the API.

## API Endpoints

- `POST /reconcile` - Main reconciliation endpoint
- `GET /health` - Health check
- `GET /config` - API configuration info

## Error Handling

The tool includes comprehensive error handling:

- Invalid Excel files
- Missing reference ID columns
- API connection errors
- Network timeouts
- Rate limiting

## Sample Files

Run `node create-sample.js` to generate a sample Excel file for testing.

## Troubleshooting

1. **"No reference ID column found"**: Ensure your Excel file has a column with "reference", "ref", or "id" in the name
2. **API connection errors**: Check your API endpoint URL and authentication headers
3. **Slow processing**: The tool includes rate limiting to be respectful to the API
4. **File upload errors**: Ensure the Excel file is not corrupted and is in .xlsx or .xls format

