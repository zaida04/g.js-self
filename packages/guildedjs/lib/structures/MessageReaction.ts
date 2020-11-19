import { BaseData } from '../typings/BaseData';
import Base from './Base';
import Client from './Client';

export default class MessageReaction extends Base {
    constructor(client: Client, data: BaseData) {
        super(client, data);
    }

    _patch(data: any): this {
        return this;
    }
}
