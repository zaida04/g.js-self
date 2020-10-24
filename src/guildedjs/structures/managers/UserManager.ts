import Client from '../Client';
import User from '../User';
import BaseManager from './BaseManager';

export default class UserManager extends BaseManager<User> {
    constructor(client: Client) {
        super(client, User);
    }
}
