import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}
