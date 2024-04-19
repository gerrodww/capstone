FROM --platform=amd64 node:18-alpine as backend
WORKDIR /backend
COPY /backend/package*.json .
RUN npm install
COPY backend .

# # -------------------------------

FROM --platform=amd64 node:18-alpine as frontend
WORKDIR /frontend
COPY /frontend/package*.json .
RUN npm install
COPY frontend .
RUN npm run build

# -------------------------
FROM --platform=amd64 node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG SCHEMA=capstone
ENV SCHEMA=${SCHEMA}

ARG DATABASE_URL=postgres://app_academy_projects_diwm_user:JvQ9X90AGfsN0Ac8nukMALGtu2RyCt1M@dpg-cnojev7jbltc73fj49vg-a.ohio-postgres.render.com/app_academy_projects_diwm
ENV DATABASE_URL=${DATABASE_URL}
ARG JWT_SECRET=strongpassword
ENV JWT_SECRET=${JWT_SECRET}

ARG JWT_EXPIRES_IN=604800
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

WORKDIR /var/www

COPY --from=backend . .
COPY --from=frontend . .
COPY package*.json .

EXPOSE 8000

CMD ["npm", "start"]