import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let knexMock;

  beforeEach(() => {
    knexMock = jest.fn();
    knexMock.mockReturnValue({
      select: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(undefined),
        }),
      }),
    });

    authService = new AuthService(knexMock as any);
  });

  describe('validateLogin', () => {
    it('should return status code 400 and message "No user found with this username" when no user is found', async () => {
      knexMock.mockReturnValue({
        select: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            first: jest.fn().mockResolvedValue(undefined),
          }),
        }),
      });

      const loginDto = { username: 'test', password: 'test' };
      const result = await authService.validateLogin(loginDto);

      expect(result).toEqual({
        statusCode: 400,
        message: 'No user found with this username',
      });
    });

    it('should return status code 200 and message "Authentication successful" when the username and password match', async () => {
      knexMock.mockReturnValue({
        select: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            first: jest.fn().mockResolvedValue({ username: 'test', password: 'test' }),
          }),
        }),
      });

      const loginDto = { username: 'test', password: 'test' };
      const result = await authService.validateLogin(loginDto);

      expect(result).toEqual({
        statusCode: 200,
        message: 'Authentication successful',
      });
    });

    it('should return status code 400 and message "Unauthorized" when the username and password do not match', async () => {
      knexMock.mockReturnValue({
        select: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            first: jest.fn().mockResolvedValue({ username: 'test', password: 'password' }),
          }),
        }),
      });

      const loginDto = { username: 'test', password: 'test' };
      const result = await authService.validateLogin(loginDto);

      expect(result).toEqual({
        statusCode: 400,
        message: 'Unauthorized',
      });
    });
  });
});
