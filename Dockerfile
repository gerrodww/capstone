# Build Image 1 - using node:18-alpine. Call it 'backend'
FROM --platform=amd64 node:18-alpine as backend
# Create a folder called 'backend' that will take all the following commands
WORKDIR /backend
# Copy our local backend package.json into the backend folder
COPY /backend/package*.json .
# Install node_modules into the backend folder
RUN npm install
# Copy our local backend code into the docker backend folder
COPY /backend .

# -------------------------------

# Build image 2 - using node:18-alpine. Call it 'frontend'
FROM --platform=amd64 node:18-alpine as frontend
# Create a folder called 'frontend' that will take all the following commands
WORKDIR /frontend 
# Copy the local frontend package.json into the frontend folder
COPY /frontend/package*.json .
# Install node_modules into the frontend folder
RUN npm install
# Copy our local frontend code into the frontend folder
COPY /frontend . 
# Build our production level code (npm run build)
RUN npm run build



# -------------------------

# Build image 3 - Production level code. Use node:18-alpine. Call it 'production'
FROM --platform=amd64 node:18-alpine as production
# Create environment variables for everything in the .env.example file (found locally in backend/.env)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG SCHEMA=capstone
ENV SCHEMA=${SCHEMA}

ARG DATABASE_URL=postgres://app_academy_projects_54ib_user:aG39PuS9j26XYvD7RGCBMaXJ64hbkeK5@dpg-clt66q21hbls73eatv00-a.ohio-postgres.render.com/app_academy_projects_54ib
ENV DATABASE_URL=${DATABASE_URL}
# Create an argument for NODE_ENV
# Create an ENV variable for NODE_ENV, use the ARG from the previous line
ARG JWT_SECRET=strongpassword
ENV JWT_SECRET=${JWT_SECRET}

ARG JWT_EXPIRES_IN=604800
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
# Create an argument for SCHEMA
# Create an ENV variable for SCHEMA, use the ARG from the previous line



# Create an argument for DATABASE_URL
# Create an ENV variable for DATABASE_URL, use the ARG from the previous line


# Create an argument for JWT_SECRET
# Create an ENV variable for JWT_SECRET, use the ARG from the previous line


# 1 week JWT. Pre-filled in to avoid having to do this in render

# Create a folder called 'var/www' that will take all the following commands
WORKDIR /var/www 
# copy the backend/package.json into the var/www folder
# copy the backend/sequelizerc file into the var/www folder
COPY /backend/package*.json . 
# Copy the dist from our frontend image into the var/www/frontend/dist folder (HINT: This will also create a folder for us)
COPY /backend/.sequelizerc .
# Run our install, but only the production (will not install and -DEV deps)
COPY --from=frontend frontend/dist ./dist/react-app 
# copy the backend from our backend image, and copy it into our var/www/backend folder (HINT: this will also create a folder for us)
COPY --from=frontend frontend/public ./dist/react-app/public 
# copy the local ROOT package.json into our var/www
RUN npm install
COPY --from=backend . . 
# Expose our port 8000, because that is what our backend will link to
EXPOSE 8000

# Create a start command using npm start
CMD ["npm", "start"]