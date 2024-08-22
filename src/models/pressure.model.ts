import {Model, model, property} from '@loopback/repository';
import {ValueStatusModel} from "./valuestatusmodel.model";

@model()
export class Pressure extends Model {
  @property({
    description: 'pressure 1',
    type: ValueStatusModel,
  })
  pressure_1: ValueStatusModel;

  @property({
    description: 'pressure 2',
    type: ValueStatusModel,
  })
  pressure_2: ValueStatusModel;



  constructor(data?: Partial<Pressure>) {
    super(data);
  }
}

export interface PressureRelations {
  // describe navigational properties here
}

export type PressureWithRelations = Pressure & PressureRelations;
