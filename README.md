## Serverless Image Upload to AWS S3

This AWS Lambda function allows for serverless image uploads to an S3 bucket. The function is triggered by an HTTP request and handles the processing and storage of the uploaded image.

## Features

  - Utilizes AWS Lambda for serverless execution.
  - Parses multi-part form data to extract file information and content.
  - Stores the image in an S3 bucket with public read access.
  - Returns a success message and a link to the stored file.

## Technologies

   - AWS Services: AWS Lambda, S3, Cloudformation
   - Node.js Modules: aws-sdk, parse-multipart

## What did I learn? 

Through this project, I gained insights into setting up serverless functions on AWS Lambda.
