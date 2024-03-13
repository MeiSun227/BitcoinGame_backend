# Bitcoin game backend

Backend for job interview assignement for bitcoin price prediction game.

This solution is an express backend that stores users bitcoin price prediction score together with each players uid. Both uid and score are kept in DynamoDB for persistence. Backend is at the moment hosted with AWS Lightsail

## Run in development mode

- Create a AWS DynamoDB with your favorite cloud tools
- Make sure you have .env file that contains values for all the variables mentioned in .env-example file.
- Run:

```
npm run dev
```

## Testing

You can VS Code rest plugin together with example files under `request` directory to test backend apis during development, or use those files as a model for curl/postman/other testing.

There's no automated tests at the moment, sorry.

## Deploy

Create your own lightsail instance with your favorite cloud tools and run following commands:

```
$ brew install aws/tap/lightsailctl
$ docker build -t bitcoin-server .
$ aws lightsail push-container-image --service-name <my-service> --label bitcoin-backend --image bitcoin-server
```

## Example app

Example app is running at: https://bitcoinguessgame.netlify.app/
