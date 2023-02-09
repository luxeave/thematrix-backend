import { Test, TestingModule } from '@nestjs/testing';
import { MatrixController } from './matrix.controller';

describe('MatrixController', () => {
  let controller: MatrixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatrixController],
    }).compile();

    controller = module.get<MatrixController>(MatrixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
