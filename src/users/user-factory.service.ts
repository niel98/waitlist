import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/entities/user.entity";
import { OptionalQuery } from "src/types/database";

@Injectable()
export class UserFactory {
    create(data: OptionalQuery<UserEntity>) {
        const user = new UserEntity()
        if (data.email) user.email = data.email
        if (data.name) user.name = data.name
        if (data.createdAt) user.createdAt = data.createdAt
        if (data.updatedAt) user.updatedAt = data.updatedAt


        return user
    }
}