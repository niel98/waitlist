import { Body, Controller, Get, HttpException, Logger, Post, Query, Res } from "@nestjs/common";
import { query, Response } from "express";
import { AddUserToWaitlistDto } from "src/dto";
import { USER_ROUTE } from "src/lib/routes";
import { UserService } from "./user.service";

@Controller('/api/v1/users')
export class UserController {
    constructor(
        private service: UserService
    )
    {}

    @Post(USER_ROUTE.ADD_TO_WAITLIST)
    async addToWaitlist(@Res() res: Response, @Body() body: AddUserToWaitlistDto) {
        try {

            const response = await this.service.addUserToWaitlist(body)
            return res.status(response.status).json(response)

        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException(error.message, 500)
            return res.status(error.status || 500).json(error)
        }
    }

    @Get(USER_ROUTE.ROUTE)
    async getAllUsers(@Res() res: Response, @Query() query: any) {
        try {
            const response = await this.service.getAllUsers(query)
            return res.status(response.status).json(response)
            
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException(error.message, 500)
            return res.status(error.status || 500).json(error)
        }
    }
}