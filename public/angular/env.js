(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.busApiUrl = 'api/route/bus/';
    window.__env.routeApiUrl = 'api/route/routes/'

    // Google Map API Key
    window.__env.apiKey = '';
        
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
}(this));
