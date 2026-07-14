# Deploy to Vercel

## Upload to GitHub

1. Create a new GitHub repository named `dlsu-academic-support-hub`.
2. Extract this ZIP file.
3. Upload all files and folders inside the extracted folder to the repository root.
4. Commit the files.

## Import into Vercel

1. Sign in to Vercel using GitHub.
2. Select **Add New**, then **Project**.
3. Import the `dlsu-academic-support-hub` repository.
4. Confirm that Vercel detects **Next.js**.
5. Keep the root directory as `./` and the default build settings.
6. Select **Deploy**.

No environment variables are required.

## Public access

If visitors receive a permission message, open the Vercel project and go to **Settings**, then **Deployment Protection**. Turn off Vercel Authentication for the production deployment.
