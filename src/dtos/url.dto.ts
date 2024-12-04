import { IsNotEmpty, IsString } from "class-validator";

export class shortenUrlDto {

    @IsString()
    @IsNotEmpty()
    longUrl: string
}