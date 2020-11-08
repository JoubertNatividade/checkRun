import { List } from './List';

export class User {

    public id: number = null;
    public name: string = null;
    public email: string = null;
    public password: string = null;
    public confirmPassword: string = null;

    public listqs: List[] = new Array<List>();
}