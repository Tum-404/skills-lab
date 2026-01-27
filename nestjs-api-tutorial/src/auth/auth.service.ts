import { PrismaService } from '@/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async signup(
        email: string,
        firstName: string,
        lastName: string,
        password: string,
    ) {
        const hash = await argon2.hash(password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    hash,
                },
                select: { id: true, email: true, firstName: true, lastName: true, createdAt: true, updatedAt: true },
            });

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
        }
    }

    async signin(
        email: string,
        hashedPassword: string
    ) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        const isPasswordValid = await argon2.verify(user.hash, hashedPassword);

        if (!isPasswordValid) {
            throw new ForbiddenException('Invalid credentials');
        }

        return await this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string
    ) : Promise<{accessToken: string}> {
        const payload = {
            sub: userId,
            email,
        };

        const secret = process.env.JWT_SECRET;

        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });

        return {accessToken};
    }
}