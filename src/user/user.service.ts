import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  // Create New User
  async create(createUser: CreateUserDto): Promise<User> {
    let user: User = new User();
    user.email = createUser.email;
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.password = createUser.password;
    user.role = 'NORMAL';

    return this.userRepo.save(user);
  }

  // Find User By Email
  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email: email } });
  }

  // Find all Users
  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  // Remove a User
  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  // Update a User
  async update(id: number, updateUser: UpdateUserDto): Promise<void> {
    await this.userRepo.update(id, updateUser);
  }
}
