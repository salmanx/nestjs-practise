import { JwtPayload } from './jwt-payload.interface';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthDto): Promise<void> {
    return this.userRepository.createUser(authDto);
  }

  async signIn(authDto: AuthDto): Promise<{ acessToken: string }> {
    const username = await this.userRepository.authenticate(authDto);

    if (!username) {
      throw new UnauthorizedException('Credentials is not valid');
    }

    const payload: JwtPayload = { username };
    const acessToken = this.jwtService.sign(payload);

    return { acessToken };
  }
}
