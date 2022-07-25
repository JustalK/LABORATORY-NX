# LABORATORY-NX


## Create a new application Nest

```bash
$ nx generate @nrwl/nest:application <Name of app/microservice>
```

## Create a new service inside the app todos

```bash
$ nx generate @nrwl/nest:service <Name of service> --project <Name of Project> --directory app
```

## Check the dependency graph

```bash
$ nx dep-graph
```

## Run an application

```bash
$ nx serve <name of the app>
# Example
$ nx serve client
```

## Run the app + microservices associated

```bash
$ nx run-many --parallel --target=serve --projects=client,microservice1,microservice2
```
