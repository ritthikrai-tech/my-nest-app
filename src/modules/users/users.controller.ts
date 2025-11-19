import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Post()
  @ZodResponse({
    type: CreateUserDto,
    status: 201,
  })
  createUser(@Body() body: CreateUserDto): CreateUserDto {
    return body;
  }
}
