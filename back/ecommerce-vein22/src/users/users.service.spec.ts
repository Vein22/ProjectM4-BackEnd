import { Test, TestingModule } from "@nestjs/testing";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service"
import * as bcrypt from "../../node_modules/bcrypt";

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    hash: jest.fn(),
}));

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: UsersRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UsersRepository,
                    useValue: {
                        findById: jest.fn(),
                        updatePassword: jest.fn(),
                    }
                }
            ]
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<UsersRepository>(UsersRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Should change the password successfully when the current password is correct', async () => {
        const mockUser = {
          id: '1',
          password: 'hashedCurrentPassword',
          name: 'Test User',
          email: 'test@example.com',
          phone: 1234567890,
          country: 'Country',
          address: '123 Street',
          city: 'City',
          isAdmin: false,
          orders: []
        };
              
        const newPassword = 'newPassword';
        const hashedNewPassword = 'hashedNewPassword';
    
        userRepository.findById = jest.fn().mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedNewPassword);
        userRepository.updatePassword = jest.fn().mockResolvedValue(mockUser);
    
        const result = await service.changePassword('1', { currentPassword: 'currentPassword', newPassword });
    
        expect(result).toBe('Password changed successfully');
        expect(userRepository.findById).toHaveBeenCalledWith('1');
        expect(bcrypt.compare).toHaveBeenCalledWith('currentPassword', 'hashedCurrentPassword');
        expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
        expect(userRepository.updatePassword).toHaveBeenCalledWith('1', hashedNewPassword);
      });
})