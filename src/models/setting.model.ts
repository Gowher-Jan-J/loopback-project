import {model, property} from '@loopback/repository';
import {SoftDeleteEntity} from 'loopback4-soft-delete';
import {v4 as uuidv4} from 'uuid';
import {Battery} from "./battery.model";
import {GenericType} from "./enum/generic-type.enum";
import {Pressure} from "./pressure.model";
import {ValueStatusModel} from "./valuestatusmodel.model";
import {Voltage} from "./voltage.model";
@model()
export class Setting extends SoftDeleteEntity {

  @property({
    type: 'string',
    id: true,
    required: true,
    generated: false,
    default: uuidv4,
  })
  id: string;

  @property({
    type: 'date',
    default: Date,
  })
  created_at: string;

  @property({
    type: 'date',
    // default: Date
  })
  updated_at: string;

  @property({
    description: 'Generic Type',
    type: 'number',
    required: true,
    jsonSchema: {
      enum: Object.values(GenericType),
      default: GenericType.MOTOR
    }
  })
  generic_type: number;


  @property({
    description: 'Pressure Limit',
    type: Pressure,
    postgresql: {
      dataType: 'jsonb',
    }
  })
  pressure: Pressure;

  @property({
    description: 'Battery Limit',
    type: Battery,
    postgresql: {
      dataType: 'jsonb',
    }
  })
  battery: Battery;

  @property({
    description: 'Voltage Limit',
    type: Voltage,
    postgresql: {
      dataType: 'jsonb',
    }
  })
  voltage: Voltage;

  @property({
    description: 'Overall Current limit',
    type: ValueStatusModel,
    postgresql: {
      dataType: 'jsonb',
    }
  })
  overall_current: ValueStatusModel;


  constructor(data?: Partial<Setting>) {
    super(data);
  }
}

export interface SettingRelations {
  // describe navigational properties here
}


export type SettingWithRelations = Setting & SettingRelations;
