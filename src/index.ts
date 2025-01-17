import {ApplicationConfig, SettingApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const APP = new SettingApplication(options);
  await APP.boot();
  await APP.start();

  const URL = APP.restServer.url;
  console.log(`Server is running at ${URL}`);
  console.log(`Try ${URL}/ping`);

  return APP;
}

if (require.main === module) {
  // Run the application
  const CONFIG = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? '127.0.0.1',
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(CONFIG).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
