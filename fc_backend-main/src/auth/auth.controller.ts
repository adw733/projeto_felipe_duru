import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
  @Post('login')
  async create(@Body() authDto: AuthDto) {
    // req.pessoaEmail
    return await this.authService.signIn(
      authDto.email,
      authDto.senha,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
