import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const createUserSchema = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(6).max(32),
});

export class CreateUserDto extends createZodDto(createUserSchema) {}
