import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    name: string

    @Prop({ unique: true })
    email: string

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const userSchema = SchemaFactory.createForClass(User)