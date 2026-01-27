import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { SigninDto } from './dto/signin.dto.js';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(
        @Body() dto: SignupDto
    ) {
        return this.authService.signup(dto.email, dto.firstName, dto.lastName, dto.password);
    }

    @Post('signin')
    signin(
        @Body() dto: SigninDto
    ) {
        return this.authService.signin(dto.email, dto.password);
    }
}