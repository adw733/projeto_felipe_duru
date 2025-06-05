import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension';
import { mainSeeder } from './seeds/mainSeeder';

export const configOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres', 
    host: 'localhost', 
    port: 5432, 
    username: 'postgres', 
    password: 'Fer171198@', 
    database: 'fecom', 
    synchronize: false, 
    entities: ['dist/**/*.entity.js'], 
    migrations: ['dist/database/migrations/*.js'], 
    seeds: [mainSeeder]
}

const dataSource = new DataSource(configOptions);
export default dataSource;