import {Model, model, property} from '@loopback/repository';


@model()
export class ValueStatusModel extends Model {
  @property({
    description: 'value',
    type: 'number',
  })
  value: number;

  @property({
    description: 'status',
    type: 'boolean',
  })
  status: boolean;

  @property({
    description: 'Low limit',
    type: 'number'
  })
  low_limit: number;

  @property({
    description: 'High limit',
    type: 'number'
  })
  high_limit: number;


  constructor(data?: Partial<ValueStatusModel>) {
    super(data);
  }
}

export interface ValuestatusmodelRelations {
  // describe navigational properties here
}

export type ValuestatusmodelWithRelations = ValueStatusModel & ValuestatusmodelRelations;
