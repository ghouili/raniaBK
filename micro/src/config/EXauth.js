const Keycloak = require('keycloak-connect');
const session = require('express-session');

const setupAuth = (app, routes) => {
    var memoryStore = new session.MemoryStore();
    var keycloak = new Keycloak({ store: memoryStore });

    app.use(session({
        secret: '<RANDOM GENERATED TOKEN>',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    }));

    app.use(keycloak.middleware());

    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, keycloak.protect(), function (req, res, next) {
                extractUserDetails(req, res, () => {
                    next();
                });
            });
        }
    });
}

// Middleware to extract user details and manage roles
function extractUserDetails(req, res, next) {
    // Access token details
    const token = req.kauth.grant.access_token;

    // Extract user details
    const userId = token.content.sub;
    const username = token.content.preferred_username;
    const email = token.content.email;

    // Extract user roles
    const roles = token.content.realm_access.roles;

    // Manage roles as per your requirements (e.g., check for specific roles, perform role-based authorization, etc.)

    // Add user details and roles to the request object for later use
    req.user = {
        userId,
        username,
        email,
        roles
    };

    next();
}


exports.setupAuth = setupAuth