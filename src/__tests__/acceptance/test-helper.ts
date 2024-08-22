import {
  Client,
  createRestAppClient,
  givenHttpServerConfig,
} from '@loopback/testlab';
import {SettingApplication} from '../..';

export async function setupApplication(): Promise<AppWithClient> {
  const RESTCONFIG = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const APP = new SettingApplication({
    rest: RESTCONFIG,
  });

  await APP.boot();
  await APP.start();

  const CLIENT = createRestAppClient(APP);

  return {APP, CLIENT};
}

export interface AppWithClient {
  APP: SettingApplication;
  CLIENT: Client;
}
