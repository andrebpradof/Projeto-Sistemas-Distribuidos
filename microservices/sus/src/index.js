const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const implementation = require('./implementation');

require('./database');

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'pb', 'sus.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(proto.SusService.service, implementation);
server.bind('0.0.0.0:30335', grpc.ServerCredentials.createInsecure());
server.start();