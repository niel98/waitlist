import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "src/users/user.model";
import { UserFactory } from "./user-factory.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: userSchema
        }])
    ],
    controllers: [UserController],
    providers: [UserFactory, UserService]
})

export class UserServicesModule {}