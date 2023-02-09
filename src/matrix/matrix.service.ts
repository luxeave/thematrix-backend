import { Injectable } from '@nestjs/common';
import { ComputeMatrixDto } from './dto/compute-matrix.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class MatrixService {

    constructor(
        @InjectKnex() private readonly knex: Knex,
      ) {}

    MatrixSearchBinary(matrix: number[][], searchNumber: number): [number, number] | boolean {
        let start = 0;
        let end = matrix.length - 1;
        while (start <= end) {
          let mid = Math.floor((start + end) / 2);
          let row = matrix[mid];
          if (row[0] <= searchNumber && row[row.length - 1] >= searchNumber) {
            for (let i = 0; i < row.length; i++) {
              if (row[i] === searchNumber) {
                return [mid, i];
              }
            }
          } else if (row[0] > searchNumber) {
            end = mid - 1;
          } else {
            start = mid + 1;
          }
        }
        return false;
    }

    matrixToArrayObject(matrix: number[][], matrix_id: number): object[] {
        const result: object[] = [];
        matrix.forEach((row, rowIndex) => {
          row.forEach((col, colIndex) => {
            result.push({
              matrix_id,
              row: rowIndex + 1,
              col: colIndex + 1,
              value: col
            });
          });
        });
        return result;
      }
  
    async computeMatrix(computeMatrixDto: ComputeMatrixDto): Promise<any> {
        try {
            const matrix = JSON.parse(computeMatrixDto.matrix);
            console.log(matrix);
            const target = computeMatrixDto.target;
            console.log(target);
            const computeResult = this.MatrixSearchBinary(matrix, target);
            console.log(computeResult);
            if (typeof computeResult !== 'boolean'){
                const res = await this.knex('matrices').max('matrix_id as max_id').first();
                await this.knex('matrices').insert(this.matrixToArrayObject(matrix, res.max_id+1));
                return computeResult;
            }
            return computeResult;
        } catch (error) {
            console.log(error);
            return {
                "statusCode": 400,
                "message": error.message,
            };
        }
    }
}
