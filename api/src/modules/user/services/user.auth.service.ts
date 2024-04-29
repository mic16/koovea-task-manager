import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { RegisterUserDto } from '../dtos/register-user.dto';
import * as argon2 from 'argon2';
import { UserAlreadyExistException } from 'src/commons/errors/user/user-already-exist';
import { LoginUserDto } from 'src/modules/user/dtos/login-user.dto';
import { UserNotFoundException } from 'src/commons/errors/user/user-not-found';
import { InvalidPasswordException } from 'src/commons/errors/user/invalid-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<string> {
    const isNameTaken = await this.userModel.exists({
      name: registerUserDto.name,
    });
    if (isNameTaken) {
      throw new UserAlreadyExistException();
    }
    const createdUser = new this.userModel({
      name: registerUserDto.name,
      passwordHash: await argon2.hash(registerUserDto.password),
    });
    await createdUser.save();
    return await this.jwtService.signAsync({ id: createdUser._id });
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.userModel.findOne({ name: loginUserDto.name });
    if (!user) {
      throw new UserNotFoundException();
    }
    const match = await argon2.verify(user.passwordHash, loginUserDto.password);
    if (!match) {
      throw new InvalidPasswordException();
    }
    return await this.jwtService.signAsync({ id: user._id.toString() });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
