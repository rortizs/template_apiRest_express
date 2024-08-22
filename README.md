# API REST NODE EXPRESS WITH MYSQL DATABASE TEMPLATE

first initial project
``
npm init -y
``
update packages
``
ncu -u
``
The first thing is to install the dependencies, for this we will use npm from node.
``

# delete node_modules y package-lock.json

rm -rf node_modules package-lock.json

# Install packages

npm install express http cors bcryptjs jsonwebtoken morgan mysql passport passport-jwt swagger-jsdoc swagger-ui-express
``

## Next step create structed from project
``
mkdir src
touch src/server.js
``

``
npm install dotenv
``
