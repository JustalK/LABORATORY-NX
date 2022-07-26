# LABORATORY-NX-TCP

```
Note:
This project has to be compared to the LABORATORY-NX-NATS
https://github.com/JustalK/LABORATORY-NX-NATS
```

![Alt text](Documentation/Graph.png?raw=true "Graph NX")


This project has been created using the libraries **NX** for creating a monorepository of microservices. Each microservices has been built with the CLI of NX as a **Nest.js** microservice. They communicate with the client using the **TCP protocol** and the message pattern of Nest.js.

## Plan of the presentation

I explain with all the details how I build the project and my way of working.

- [Development](#development)
- [NX](#NX)

## Development

There are 3 apps:

- **client:** A nest.js client
- **microservice1:** A nest.js microservice on port 3001
- **microservice2:** A nest.js microservice on port 3002

When the api call one of the endpoint of the api, the service of the `client` is called. Inside the method, a message is sent to the microservices through the transporter TCP. Once the message is received, a response is sent back to the client as a response for the endpoint.

The communication is using the decentralized TCP transporter. A simple image for illustrating what is a decentralized communication:

![Alt text](Documentation/Decentralized.svg?raw=true "Decentralized TCP")

### Client

In the `app.module.ts`, we register the two microservices using the same transporter and port used in the microservices.

```js
ClientsModule.register([
  {
    name: 'MICROSERVICE1',
    transport: Transport.TCP,
    options: {
        port: 3001,
    }
  },
  {
    name: 'MICROSERVICE2',
    transport: Transport.TCP,
    options: {
        port: 3002,
    }
  },
])
```

We inject our microservices using the ClientProxy inside our service `app.service.ts` with their respective name.

```js
constructor(
  @Inject('MICROSERVICE1') private client1: ClientProxy,
  @Inject('MICROSERVICE2') private client2: ClientProxy
){}
```

For sending a message to a particular microservice, we can next using our injected variable.

```js
// Example: sending a message 'greeting' with 'Micro1' as a parameter to microservice1
return this.client1.send({cmd: 'greeting'}, 'Micro1')
```

### Microservices

Register, the app has a Nest.js microservice:

```js
const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  AppModule,
  {
    transport: Transport.TCP,
    options: {
      port: 3001
    }
  },
);
```

In the `app.controler.ts`, we use the decorator `MessagePattern` to indicate that a controller is waiting for a message from the client

```js
@MessagePattern({cmd: 'greeting'})
getGreetingMessage(name: string): string {
  return `[MICROSERVICE 1] Hello ${name}`;
}
```

## NX

### Create a new application Nest

```bash
$ nx generate @nrwl/nest:application <Name of app/microservice>
```

### Create a new service inside the app todos

```bash
$ nx generate @nrwl/nest:service <Name of service> --project <Name of Project> --directory app
```

### Check the dependency graph

```bash
$ nx dep-graph
```

### Run an application

```bash
$ nx serve <name of the app>
# Example
$ nx serve client
```

### Run the app + microservices associated

```bash
$ nx run-many --parallel --target=serve --projects=client,microservice1,microservice2
```
