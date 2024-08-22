import {Client, expect} from '@loopback/testlab';
import {SettingApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let APP: SettingApplication;
  let CLIENT: Client;

  before('setupApplication', async () => {
    ({APP, CLIENT} = await setupApplication());
  });

  after(async () => {
    await APP.stop();
  });

  it('invokes GET /ping', async () => {
    const RES = await CLIENT.get('/ping?msg=world').expect(200);
    expect(RES.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
