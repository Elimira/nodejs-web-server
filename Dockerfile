FROM node:16-alpine as build
# We compile typescript in first stage

RUN echo -e

# install git and node-gyp dependencies
RUN apk update && \
  apk add --no-cache make gcc g++ curl py-pip git

# create web service directories
RUN mkdir -p /app/web-service


RUN cd /app/web-service 

# install backendservicepackage.json build dependencies
COPY package.json /app/web-service/
RUN cd /app/web-service && yarn

# compile and build project code
COPY . /app/web-service/
RUN cd /app/web-service && \
  yarn build

RUN cd /app/web-service && \
  rm -rf node_modules && \
  yarn install 

#######################   Production App   ##########################
FROM node:16-alpine
# next stage: prepare production environment
ENV NODE_ENV=development
ENV PORT=3333

# Add tiny init process to wrap main app in production
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

RUN mkdir -p /app/current && \
  chown -R node:node /app

RUN mkdir -p /app/current/node_modules && \
  mkdir -p /app/current/src

COPY --chown=node:node --from=build /app/web-service/node_modules/ /app/current/node_modules

COPY --chown=node:node --from=build /app/web-service/dist /app/current/src

WORKDIR /app/current
USER node

EXPOSE 3333
CMD [ "node", "src/main.js" ]
