import {Model, model, property} from '@loopback/repository';
import {ValueStatusModel} from './valuestatusmodel.model';

@model()
export class Voltage extends Model {
  @property({
    description: 'voltage 12',
    type: ValueStatusModel,
  })
  voltage_12: ValueStatusModel;

  @property({
    description: 'voltage 5',
    type: ValueStatusModel,
  })
  voltage_5: ValueStatusModel;

  @property({
    description: 'battery',
    type: ValueStatusModel,
  })
  battery: ValueStatusModel;

  @property({
    description: 'lbc',
    type: ValueStatusModel,
  })
  lbc: ValueStatusModel;

  @property({
    description: 'voltage 33',
    type: ValueStatusModel,
  })
  voltage_33: ValueStatusModel;

  @property({
    description: 'ebyte_voltage',
    type: ValueStatusModel,
    postgresql: {
      dataType: 'jsonb',
    }
  })
  ebyte: ValueStatusModel;

  constructor(data?: Partial<Voltage>) {
    super(data);
  }

}

export interface VoltageRelations {
  // describe navigational properties here
}

export type VoltageWithRelations = Voltage & VoltageRelations;
