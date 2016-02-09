'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 8000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
    	debugger;
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, (err) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

// server.start(() => {
//     console.log('Server running at:', server.info.uri);
// });

// server.register(require('inert'), (err) => {
//     if (err) {
//         throw err;
//     }

//     server.route({
//         method: 'GET',
//         path: '/hello',
//         handler: function (request, reply) {
//             reply.file('./public/hello.html');
//         }
//     });
// });
