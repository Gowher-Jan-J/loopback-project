import {repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ResponseSchema} from '../config/types';
import {
  CREATED_FAILIURE,
  CREATED_SUCCESS,
  DELETE_FAILIURE,
  DELETED_SUCCESS,
  FAILED,
  INVALID_GENERIC_TYPE,
  SETTING_ALREADY_EXIST,
  SETTING_NOT_FOUND,
  SUCCESS,
  UPDATED_FAILIURE,
  UPDATED_SUCCESS
} from '../locally/en';
import {
  Error,
  GenericType,
  Meta,
  Pressure,
  Setting,
  ValueStatusModel,
  Voltage
} from '../models';
import {Battery} from '../models/battery.model';
import {SettingRepository} from '../repositories';


export class SettingController {
  constructor(
    @repository(SettingRepository)
    public settingRepository: SettingRepository,
  ) { }



  //create a new setting
  @post('/settings')
  @response(200, {
    description: 'Create a new setting model',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              default: CREATED_SUCCESS,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Setting, {
            title: 'SETTING',
            exclude: [
              'id',
              'created_at',
              'updated_at',
              'deleted',
              'deletedOn',
              'deletedBy',
            ],
          }),
        },
      },
    })
    setting: Omit<Setting, 'id'>,
  ): Promise<Error | ResponseSchema> {

    try {

      // To validate the generic type, If generic type is NONE have to throw error
      if (
        !Object.values(GenericType).includes(setting.generic_type) ||
        setting.generic_type === GenericType.NONE
      ) {
        throw new Error(INVALID_GENERIC_TYPE, 422);
      }

      // To get setting based on the generic type.
      const EXISTING_SETTING = await this.settingRepository.findOne({
        where: {
          generic_type: setting.generic_type,
          deleted: false,
        },
      });
      console.log(EXISTING_SETTING);

      if (EXISTING_SETTING) {
        throw new Error(SETTING_ALREADY_EXIST, 422);
      }

      //creating a new instance
      const SETTING = new Setting();
      SETTING.generic_type = setting.generic_type;


      const BATTERY = new Battery();

      BATTERY.current = new ValueStatusModel()
      BATTERY.current.high_limit = setting.battery.current.high_limit;
      BATTERY.current.low_limit = setting.battery.current.low_limit;

      BATTERY.low_voltage = new ValueStatusModel()

      BATTERY.low_voltage.high_limit = setting.battery.low_voltage.high_limit;
      BATTERY.low_voltage.low_limit = setting.battery.low_voltage.low_limit;
      SETTING.battery = BATTERY;
      console.log(BATTERY);
      const VOLTAGE = new Voltage();
      VOLTAGE.voltage_12 = new ValueStatusModel()
      VOLTAGE.voltage_12.high_limit = setting.voltage.voltage_12.high_limit;
      VOLTAGE.voltage_12.low_limit = setting.voltage.voltage_12.low_limit;
      VOLTAGE.voltage_33 = new ValueStatusModel()
      VOLTAGE.voltage_33.high_limit = setting.voltage.voltage_33.high_limit;
      VOLTAGE.voltage_33.low_limit = setting.voltage.voltage_33.low_limit;
      VOLTAGE.voltage_5 = new ValueStatusModel()
      VOLTAGE.voltage_5.high_limit = setting.voltage.voltage_5.high_limit;
      VOLTAGE.voltage_5.low_limit = setting.voltage.voltage_5.low_limit;
      VOLTAGE.battery = new ValueStatusModel()
      VOLTAGE.battery.high_limit = setting.voltage.battery.high_limit;
      VOLTAGE.battery.low_limit = setting.voltage.battery.low_limit;
      VOLTAGE.lbc = new ValueStatusModel()
      VOLTAGE.lbc.high_limit = setting.voltage.battery.high_limit;
      VOLTAGE.lbc.low_limit = setting.voltage.battery.low_limit;
      VOLTAGE.ebyte = new ValueStatusModel()
      VOLTAGE.ebyte.high_limit = setting.voltage.ebyte.high_limit;
      VOLTAGE.ebyte.low_limit = setting.voltage.ebyte.low_limit;
      SETTING.voltage = VOLTAGE;
      const OVER_ALL_CURRENT = new ValueStatusModel();
      OVER_ALL_CURRENT.high_limit = setting.overall_current.high_limit;
      OVER_ALL_CURRENT.low_limit = setting.overall_current.low_limit;
      OVER_ALL_CURRENT.value = setting.overall_current.value;
      OVER_ALL_CURRENT.status = setting.overall_current.status;
      SETTING.overall_current = OVER_ALL_CURRENT;
      const PRESSURE = new Pressure();
      PRESSURE.pressure_1 = new ValueStatusModel()
      PRESSURE.pressure_1.high_limit = setting.pressure.pressure_1.high_limit;
      PRESSURE.pressure_1.low_limit = setting.pressure.pressure_1.low_limit;
      PRESSURE.pressure_2 = new ValueStatusModel()
      PRESSURE.pressure_2.high_limit = setting.pressure.pressure_2.high_limit;
      PRESSURE.pressure_2.low_limit = setting.pressure.pressure_2.low_limit;
      SETTING.pressure = PRESSURE;

      console.log(SETTING);
      await this.settingRepository.create(SETTING);
      return new Meta(CREATED_SUCCESS);
    } catch (error) {
      console.log(error);
      throw new Error(CREATED_FAILIURE, 400);
    }
  }


  //get a single setting by using generictype
  @get('/settings')
  @response(200, {
    description: 'Get a setting model object',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {type: 'string', default: SUCCESS},
            data: getModelSchemaRef(Setting),
          },
        },
      },
    },
  })
  async find(
    @param.query.number('generic_type') genericType: number,
  ): Promise<Error | ResponseSchema> {
    try {

      //find setting generictype and deleted false
      const SETTING = await this.settingRepository.findOne({
        where: {
          generic_type: genericType,
          deleted: false,
        },
      });

      //if setting generictype mismatches throw the error
      if (!SETTING) {
        throw new Error(SETTING_NOT_FOUND, 404);
      }

      //else return the matched generictype data
      return new Meta(SUCCESS, SETTING);
    } catch (error) {
      console.log(error);
      throw new Error(FAILED, 400);
    }
  }


  //update a single setting by using generictype
  @put('/settings')
  @response(204, {
    description: 'Update a Setting model',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {type: 'string', default: UPDATED_SUCCESS},
          },
        },
      },
    },
  })
  async replaceById(
    @param.query.number('generic_type') generic_type: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Setting, {
            title: 'SettingUpdateBody',
            exclude: [
              'id',
              'created_at',
              'updated_at',
              'deleted',
              'deletedBy',
              'deletedOn',
              'generic_type',
            ],
          }),
        },
      },
    })
    setting: Omit<Setting, 'generic_type'>,
  ): Promise<Error | ResponseSchema> {
    try {

      // To validate the generic type, If generic type is NONE have to throw error
      if (
        !Object.values(GenericType).includes(generic_type) ||
        generic_type === GenericType.NONE
      ) {
        throw new Error(INVALID_GENERIC_TYPE, 422);
      }

      //to find genrictype if deleted false
      const EXISTING_SETTING = await this.settingRepository.findOne({
        where: {
          generic_type: generic_type,
          deleted: false,
        },
      });

      //if existing is null r undefined have to throw error
      if (EXISTING_SETTING === null || EXISTING_SETTING === undefined) {
        throw new Error(SETTING_NOT_FOUND, 404);
      }

      //update the all filed high limit and low limit
      EXISTING_SETTING.updated_at = new Date().toISOString();
      EXISTING_SETTING.pressure.pressure_1.high_limit = setting.pressure.pressure_1.high_limit;
      EXISTING_SETTING.pressure.pressure_1.low_limit = setting.pressure.pressure_1.low_limit;
      EXISTING_SETTING.pressure.pressure_2.high_limit = setting.pressure.pressure_2.high_limit;
      EXISTING_SETTING.pressure.pressure_2.low_limit = setting.pressure.pressure_2.low_limit;

      EXISTING_SETTING.overall_current.high_limit = setting.overall_current.high_limit
      EXISTING_SETTING.overall_current.low_limit = setting.overall_current.low_limit
      EXISTING_SETTING.overall_current.value = setting.overall_current.value;
      EXISTING_SETTING.overall_current.status = setting.overall_current.status


      EXISTING_SETTING.voltage.voltage_12.high_limit = setting.voltage.voltage_12.high_limit
      EXISTING_SETTING.voltage.voltage_12.low_limit = setting.voltage.voltage_12.low_limit
      EXISTING_SETTING.voltage.voltage_33.high_limit = setting.voltage.voltage_33.high_limit
      EXISTING_SETTING.voltage.voltage_33.low_limit = setting.voltage.voltage_33.low_limit
      EXISTING_SETTING.voltage.voltage_5.high_limit = setting.voltage.voltage_5.high_limit
      EXISTING_SETTING.voltage.voltage_5.low_limit = setting.voltage.voltage_5.low_limit
      EXISTING_SETTING.voltage.battery.high_limit = setting.voltage.battery.high_limit
      EXISTING_SETTING.voltage.battery.low_limit = setting.voltage.battery.low_limit
      EXISTING_SETTING.voltage.ebyte.high_limit = setting.voltage.ebyte.high_limit
      EXISTING_SETTING.voltage.ebyte.low_limit = setting.voltage.ebyte.low_limit
      EXISTING_SETTING.voltage.lbc.high_limit = setting.voltage.lbc.high_limit
      EXISTING_SETTING.voltage.lbc.low_limit = setting.voltage.lbc.low_limit


      EXISTING_SETTING.battery.current.high_limit = setting.battery.current.high_limit
      EXISTING_SETTING.battery.current.low_limit = setting.battery.current.low_limit
      EXISTING_SETTING.battery.low_voltage.high_limit = setting.battery.low_voltage.high_limit
      EXISTING_SETTING.battery.low_voltage.low_limit = setting.battery.low_voltage.low_limit


      await this.settingRepository.update(EXISTING_SETTING);
      return new Meta(UPDATED_SUCCESS);
    } catch (error) {
      console.log(error);
      throw new Error(UPDATED_FAILIURE, 400);
    }
  }


  //delete a single setting by using generictype
  @del('/settings')
  @response(204, {
    description: 'Delete a setting model',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {type: 'string', default: DELETED_SUCCESS},
          },
        },
      },
    },
  })
  async deleteById(
    @param.query.number('generic_type') generic_type: number,
  ): Promise<Error | ResponseSchema> {
    try {

      //to find the generictype
      const EXISTING_SETTING = await this.settingRepository.findOne({
        where: {
          generic_type: generic_type,
          deleted: false,
        },
      });

      //if generictype mismatched have to throw the error
      if (!EXISTING_SETTING) {
        throw new Error(SETTING_NOT_FOUND, 404);
      }

      //if existing setting matched with generic type then deleted (using soft delete)
      EXISTING_SETTING.deleted = true;
      EXISTING_SETTING.deletedOn = new Date();
      await this.settingRepository.updateById(
        EXISTING_SETTING.id,
        EXISTING_SETTING,
      );
      console.log(EXISTING_SETTING);
      return new Meta(DELETED_SUCCESS);
    } catch (error) {
      console.log(error);
      throw new Error(DELETE_FAILIURE, 400);
    }
  }
}
