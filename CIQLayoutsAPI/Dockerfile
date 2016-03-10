FROM mhart/alpine-node:5.6.0

# Install (global) NPM packages/dependencies
# RUN npm install -g \
#  node-gyp

# Switch to directory with sources
WORKDIR /src

# Copy package json and install dependencies
COPY package.json .

# Install (local) NPM and Bower packages/dependencies
RUN npm install

# Copy required stuff
ADD . .

# Expose API ports
EXPOSE 3041

# Specify default CMD
CMD ["node", "app.js"]
