import {Model, model, property} from '@loopback/repository';
import {ValueStatusModel} from "./valuestatusmodel.model";

@model()
export class Battery extends Model {
  @property({
    description: 'current',
    type: ValueStatusModel,


  })
  current: ValueStatusModel;

  @property({
    description: 'low_voltage',
    type: ValueStatusModel,

  })
  low_voltage: ValueStatusModel;


  constructor(data?: Partial<Battery>) {
    super(data);
  }
}

export interface BatteryRelations {
  // describe navigational properties here
}

export type BatteryWithRelations = Battery & BatteryRelations;
