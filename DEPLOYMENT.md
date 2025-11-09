# Deploying ProjectHub

## Quick Deploy Guide

### Frontend (Netlify)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Netlify**
   - Visit https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure build settings:
     ```
     Base directory: project-management-frontend
     Build command: npm run build
     Publish directory: build
     ```
   - Add environment variable:
     ```
     REACT_APP_API_URL = https://your-backend-url.onrender.com/api
     ```
   - Click "Deploy site"

3. **Get your Netlify URL**
   - After deployment, copy your site URL (e.g., `https://your-app.netlify.app`)

### Backend (Render)

1. **Deploy on Render**
   - Visit https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     ```
     Name: projecthub-backend
     Root Directory: project-management-backend
     Runtime: Node
     Build Command: npm install
     Start Command: node server.js
     ```

2. **Add Environment Variables**
   ```
   NODE_ENV = production
   PORT = 5000
   FRONTEND_URL = https://your-app.netlify.app
   ```

3. **Get your Render URL**
   - After deployment, copy your backend URL (e.g., `https://projecthub-backend.onrender.com`)

4. **Update Netlify Environment Variable**
   - Go back to Netlify
   - Navigate to Site settings → Environment variables
   - Update `REACT_APP_API_URL` to: `https://projecthub-backend.onrender.com/api`
   - Trigger redeploy: Deploys → Trigger deploy → Deploy site

## Troubleshooting

### CORS Issues
Make sure your backend's FRONTEND_URL environment variable matches your Netlify URL exactly.

### 404 on Refresh
The `netlify.toml` file handles this with redirects. Make sure it's in the frontend folder.

### Backend Not Responding
- Check Render logs for errors
- Verify environment variables are set
- Free tier may spin down after inactivity (takes ~30 seconds to wake up)

### Frontend Shows Errors
- Check browser console for specific errors
- Verify REACT_APP_API_URL is set correctly in Netlify
- Make sure backend is deployed and running

## Cost

Both Netlify and Render offer free tiers suitable for this project:
- **Netlify Free**: 100GB bandwidth, automatic HTTPS, continuous deployment
- **Render Free**: 750 hours/month, auto-sleep after 15 min inactivity, 512MB RAM

## Production Checklist

- [ ] Environment variables configured on both platforms
- [ ] Backend URL updated in frontend environment variable
- [ ] Frontend URL updated in backend CORS configuration
- [ ] Both services deployed successfully
- [ ] Test all features in production
- [ ] Check browser console for errors
- [ ] Test API endpoints are accessible
