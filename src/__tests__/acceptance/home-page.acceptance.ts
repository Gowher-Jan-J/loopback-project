import {Client} from '@loopback/testlab';
import {SettingApplication} from '../..';
import {setupApplication} from './test-helper';

describe('HomePage', () => {
  let APP: SettingApplication;
  let CLIENT: Client;

  before('setupApplication', async () => {
    ({APP, CLIENT} = await setupApplication());
  });

  after(async () => {
    await APP.stop();
  });

  it('exposes a default home page', async () => {
    await CLIENT
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  });

  it('exposes self-hosted explorer', async () => {
    await CLIENT
      .get('/explorer/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/);
  });
});
