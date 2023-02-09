import { IsString,  IsNumber } from "class-validator";

export class ComputeMatrixDto {
    @IsString()
    matrix: string;

    @IsNumber()
    target: number;
}