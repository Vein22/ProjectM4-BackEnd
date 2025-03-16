import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from "../users/dto/signup.dto";
import { UserResponseDto } from "../users/dto/response.user.dto";
import { Role } from "./roles/roles.enum";
import { UsersRepository } from "src/users/users.repository";



@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
) {}

    getAuth () {
        return "Get Auth";
    }

    async passwordEncrypter(password: string): Promise<string> {
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!hashedPassword) {
        throw new BadRequestException('Password could not be hashed');
      }
      return hashedPassword;
    }

    async signUp( signUpUser: SignUpDto) {
        const dbUser = await this.usersRepository.findByEmail(signUpUser.email)
        if(dbUser) {
          throw new BadRequestException('Email already exist')
        }
    
        if (signUpUser.password !== signUpUser.confirmPassword) {
          throw new BadRequestException('Passwords do not match');
        }
    
        const hashedPassword = await this.passwordEncrypter(signUpUser.password)
        
          this.usersRepository.createUser({...signUpUser, password: hashedPassword})
          return new UserResponseDto(signUpUser)
      }
        

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        const isPasswordValid = await bcrypt.compare( password, user.password)
        
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = {
              sub: user.id,
              id: user.id,
              email: user.email,
              roles: [ user.isAdmin ? Role.Admin : Role.User]
            };
            
          const token = this.jwtService.sign(payload);
    
        return { success: 'Sign in successfully', token, };
      }
}