# LABORATORY-NX


## Create a new application Nest

```bash
$ nx generate @nrwl/nest:application api-usersmicroservice
```

## Create a new service inside the app todos

```bash
$ nx generate @nrwl/nest:service api-usersmicroservice --project todos --directory app
```

## Check the dependency graph

```bash
$ nx dep-graph
```

## Run an application

```bash
$ nx serve todos
```
