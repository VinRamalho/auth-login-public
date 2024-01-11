import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { jwtConstants } from './constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload = { email: user.email, name: user.name };
    return this.jwtService.signAsync(payload, { expiresIn: '1m' });
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const payload = { email: user.email, name: user.name };
    return this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: jwtConstants.secret,
    });
  }

  async refreshTokens(refreshToken: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.secret,
      });

      const user = await this.userService.findOneByEmail(decoded.email);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const accessToken = await this.generateAccessToken(user);
      const newRefreshToken = await this.generateRefreshToken(user);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
