import { IsNotEmpty, Length } from "class-validator";

export class ChangePasswordDto {
    @IsNotEmpty()
    @Length(8, 15)
    currentPassword: string;

    @IsNotEmpty()
    @Length(8, 15)
    newPassword: string;
}