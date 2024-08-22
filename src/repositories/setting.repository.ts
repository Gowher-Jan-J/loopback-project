import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SettingDataSource} from '../datasources';
import {Setting, SettingRelations} from '../models';

export class SettingRepository extends DefaultCrudRepository<
  Setting,
  typeof Setting.prototype.id,
  SettingRelations
> {
  constructor(
    @inject('datasources.setting') dataSource: SettingDataSource,
  ) {
    super(Setting, dataSource);
  }
}
