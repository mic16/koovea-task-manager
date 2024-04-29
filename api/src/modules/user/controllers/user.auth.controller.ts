import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { UserAuthService } from 'src/modules/user/services/user.auth.service';
import { LoginUserDto } from 'src/modules/user/dtos/login-user.dto';
import { LoggedUserDto } from 'src/modules/user/dtos/logged-user.dto';
import { RegisterUserDto } from 'src/modules/user/dtos/register-user.dto';

@Controller('user/auth')
@ApiTags('user')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @ApiOperation({ description: 'Create a new user account' })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiResponse({ type: LoggedUserDto })
  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<LoggedUserDto> {
    const accessToken = await this.userAuthService.register(dto);
    return new LoggedUserDto(accessToken);
  }

  @ApiOperation({ description: 'Login with an influencer account' })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiResponse({ type: LoggedUserDto })
  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<LoggedUserDto> {
    const accessToken = await this.userAuthService.login(dto);
    return new LoggedUserDto(accessToken);
  }
}
