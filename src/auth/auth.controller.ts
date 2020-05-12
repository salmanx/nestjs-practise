import { GetUser } from './get-user.decorator';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authDto: AuthDto): Promise<void> {
    return this.authService.signUp(authDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authDto: AuthDto,
  ): Promise<{ acessToken: string }> {
    return this.authService.signIn(authDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  // test(@Req() req) {
  //   console.log(req);
  // }
  test(@GetUser() user: User) {
    console.log(user);
  }
}
