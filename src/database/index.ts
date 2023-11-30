import { DataSource, Repository } from "typeorm";

const db = new DataSource({
    type: 'mysql',
    host: '',
    port: 3306,
    username: '',
    password: '',
    database: ''
});