# url-shortner

## Description

A serverless URL shortener that uses AWS Lambda, API Gateway, DynamoDB (with TTL), S3, and CloudFront to shorten, redirect, and auto-expire links with a static frontend.

## Live Demo
- Link : [https://d2fqavv8mdh52q.cloudfront.net/](https://d2fqavv8mdh52q.cloudfront.net/)


## Features

*   **URL Shortening:** Generates short URLs for provided long URLs.
*   **Redirection:** Redirects short URLs to their original long URLs.
*   **Auto-Expiration:** Automatically expires short URLs using DynamoDB TTL.
*   **Serverless Architecture:** Built using AWS Lambda, API Gateway, DynamoDB, S3, and CloudFront.
*   **Static Frontend:** Includes a static frontend for easy URL shortening.

## Technologies Used

*   AWS Lambda
*   AWS API Gateway
*   AWS DynamoDB (with TTL)
*   AWS S3
*   AWS CloudFront
*   aws-sdk

## Installation

1.  **Prerequisites:**
    *   AWS Account
    *   AWS CLI installed and configured
    *   Node.js and npm installed (if deploying frontend)

2.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd url-shortner
    ```

4.  **Deploy the backend infrastructure (Lambda, API Gateway, DynamoDB, S3, CloudFront)**


5.  **Configure the frontend:**

    *   Update the API endpoint in the frontend code to point to your API Gateway endpoint.
    *   Upload the frontend files to your S3 bucket.
    *   Configure CloudFront to serve the static website from S3.

## Usage

1.  **Access the frontend:**

    *   Open your CloudFront distribution URL in a web browser.

2.  **Shorten a URL:**

    *   Enter the long URL in the input field.
    *   Click the "Shorten" button.

3.  **Use the short URL:**

    *   Copy the generated short URL.
    *   Paste the short URL into a web browser to be redirected to the original long URL.

## License

MIT License
```