import { MatrixService } from './matrix.service';
import { ComputeMatrixDto } from './dto/compute-matrix.dto';

describe('MatrixService', () => {
  let matrixService: MatrixService;
  let knexMock;

  beforeEach(() => {
    knexMock = jest.fn();
    knexMock.mockReturnValue({
      max: jest.fn().mockReturnValue({
        first: jest.fn().mockReturnValue({ max_id: 0 }),
      }),
      insert: jest.fn(),
    });

    matrixService = new MatrixService(knexMock as any);
  });

  describe('computeMatrix', () => {
    it('should return the position of the target in the matrix', async () => {
      const expectedResult = [1, 1];
      matrixService.MatrixSearchBinary = jest.fn().mockReturnValue(expectedResult);

      const computeMatrixDto: ComputeMatrixDto = {
        matrix: JSON.stringify([
          [1, 2, 3],
          [4, 5, 6],
        ]),
        target: 5,
      };

      const result = await matrixService.computeMatrix(computeMatrixDto);

      expect(result).toEqual(expectedResult);
      expect(knexMock().insert).toHaveBeenCalledWith(
        [
          { matrix_id: 1, row: 1, col: 1, value: 1 },
          { matrix_id: 1, row: 1, col: 2, value: 2 },
          { matrix_id: 1, row: 1, col: 3, value: 3 },
          { matrix_id: 1, row: 2, col: 1, value: 4 },
          { matrix_id: 1, row: 2, col: 2, value: 5 },
          { matrix_id: 1, row: 2, col: 3, value: 6 },
        ],
      );
    });

    it('should return false when the target is not found in the matrix', async () => {
      matrixService.MatrixSearchBinary = jest.fn().mockReturnValue(false);

      const computeMatrixDto: ComputeMatrixDto = {
        matrix: JSON.stringify([
          [1, 2, 3],
          [4, 5, 6],
        ]),
        target: 10,
      };

      const result = await matrixService.computeMatrix(computeMatrixDto);

      expect(result).toBe(false);
    });

    it('should return an error message when there is an error parsing the matrix string', async () => {
      const expectedError = new Error('test error');
      JSON.parse = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      const computeMatrixDto: ComputeMatrixDto = {
        matrix: 'invalid matrix string',
        target: 10,
      };

      const result = await matrixService.computeMatrix(computeMatrixDto);

      expect(result).toEqual({
        statusCode: 400,
        message: expectedError.message,
      });
    });

  });
});
