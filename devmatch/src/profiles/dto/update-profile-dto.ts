import { IsString, MinLength } from "class-validator";

export class updateProfileDto {
    @IsString()
    @MinLength(3)
    readonly name: string;
    
    @IsString()
    readonly description: string;
}