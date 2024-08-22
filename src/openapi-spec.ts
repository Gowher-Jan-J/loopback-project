import {ApplicationConfig} from '@loopback/core';
import {SettingApplication} from './application';

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const CONFIG: ApplicationConfig = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? 'localhost',
    },
  };
  const OUTFILE = process.argv[2] ?? '';
  const APP = new SettingApplication(CONFIG);
  await APP.boot();
  await APP.exportOpenApiSpec(OUTFILE);
}

exportOpenApiSpec().catch(err => {
  console.error('Fail to export OpenAPI spec from the application.', err);
  process.exit(1);
});
