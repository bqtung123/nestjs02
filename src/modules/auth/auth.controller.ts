import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // url example: http://localhost:3000/auth/register
  @Post('/register')
  register(@Body() userData: any) {
    return this.usersService.createUser(userData);
  }

  // url example: http://localhost:3000/auth/login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }
}
