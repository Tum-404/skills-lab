import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  private logger = new Logger('User service');


  async create(createUserDto: CreateUserDto) {
    this.logger.log(`Creating a new user with email`);
    const createUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
      },
    });
    return createUser;
  }

  async findAll() {
    this.logger.log(`Retrieving all users`);
    const users = await this.prisma.user.findMany();
    return users;
  }

    async findOne(id: UUID) {
    this.logger.log(`Retrieving user with id: ${id}`);
    const User = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return User;
  }

  update(id: UUID, updateUserDto: UpdateUserDto) {
    const User = this.prisma.user.update({
      where: { id: id },
      data: {
        name: updateUserDto.name,
      },
    });
    return User;
  }

  remove(id: UUID) {
    const User = this.prisma.user.delete({
      where: { id: id },
    });
  }
}
