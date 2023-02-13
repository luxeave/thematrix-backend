import { MatrixController } from './matrix.controller';

describe('MatrixController', () => {
  let matrixController: MatrixController;
  let matrixServiceMock;

  beforeEach(() => {
    matrixServiceMock = {
      computeMatrix: jest.fn().mockResolvedValue({}),
    };

    matrixController = new MatrixController(matrixServiceMock as any);
  });

  describe('computeMatrix', () => {
    it('should call computeMatrix on the MatrixService with the correct parameters', async () => {
      const computeMatrixDto = { matrix: 'test', target: 1 };
      await matrixController.computeMatrix(computeMatrixDto);

      expect(matrixServiceMock.computeMatrix).toHaveBeenCalledWith(computeMatrixDto);
    });

    it('should return the result of the computeMatrix call on the MatrixService', async () => {
      const expectedResult = {};
      matrixServiceMock.computeMatrix.mockResolvedValue(expectedResult);

      const result = await matrixController.computeMatrix({ matrix: 'test', target: 1 });

      expect(result).toBe(expectedResult);
    });
  });
});
