import { Body, Controller, Post } from '@nestjs/common';
import { ComputeMatrixDto } from './dto/compute-matrix.dto';
import { MatrixService } from './matrix.service';

@Controller('matrix')
export class MatrixController {
    constructor(private matrixService: MatrixService) {}

    @Post()
    async computeMatrix(@Body() computeMatrixDto: ComputeMatrixDto): Promise<any> {
        return await this.matrixService.computeMatrix(computeMatrixDto);
    }
}
