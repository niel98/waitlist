import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AddUserToWaitlistDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string
}