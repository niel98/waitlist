import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddUserToWaitlistDto } from "src/dto";
import { search } from "src/lib/helper";
import { User, UserDocument } from "src/users/user.model";
import { UserFactory } from "./user-factory.service";
import { PaginateModel, PaginateResult, PaginateOptions } from "mongoose";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private UserData: PaginateModel<UserDocument>,
        private userFactory: UserFactory
        )
    {}

    async addUserToWaitlist(payload: AddUserToWaitlistDto) {
        try {
            const { email } = payload

            const user = await this.UserData.findOne({ email })
            if (user) return Promise.reject({
                status: HttpStatus.CONFLICT,
                message: 'User already exists!',
                error: null,
            })

            const factory = this.userFactory.create({
                ...payload,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            const data = await this.UserData.create(factory)

            return {
                message: 'User added successfully',
                data,
                status: HttpStatus.CREATED,
            }
        } catch (error) {
            Logger.error(error)
            throw new HttpException('Internal server error', 500)
        }
    }

    async getAllUsers(query: any){
        try {
            const filter = await search(query)
            const options: PaginateOptions = {
                page: !query.page ? 1 : parseInt(query.page),
                limit: !query.limit ? 10 : parseInt(query.limit),
            };
            // const data = await this.UserData.find(filter)

            // return {
            //     message: 'Users retrieved successfully',
            //     data,
            //     status: HttpStatus.OK,
            // }
            const data = await this.UserData.paginate(filter, options)
            return {
                message: 'Users retrieved successfully',
                data,
                status: HttpStatus.OK,
            }
            
        } catch (error) {
            Logger.error(error)
            throw new HttpException('Internal server error', 500)
        }
    }
}