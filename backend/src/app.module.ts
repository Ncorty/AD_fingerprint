import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./entity/user_entity";
import { Scan } from "./entity/scan_entity";

@Module({
    controllers:[],
    providers:[],
    imports:[
        ConfigModule.forRoot({
            envFilePath:'.env'
        }),
        TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [User, Scan],
        synchronize: true,
        autoLoadEntities: true
    }),
    UserModule
    ]
})
export class AppModule {}