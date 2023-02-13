import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    validateLogin: jest.fn((loginDto: LoginDto) => {
      return {statusCode: 400, message: 'Unauthorized'};
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
    .overrideProvider(AuthService)
    .useValue(mockAuthService)
    .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('it should return a 400 status code if no user is found', async () => {
    expect(controller.login({username: 'test', password: 'test'})).resolves.toEqual({"statusCode": 400,
    "message": "Unauthorized",});
  });
});
