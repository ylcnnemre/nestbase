import { Controller, Post } from '@nestjs/common';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {


    constructor(@InjectRepository(User)  private readonly userRepository: Repository<User>) {

    }

    
    @Post('login')
    @ApiOperation({ summary: 'User login' })
    public async login() {
        
        return {
            message: "Login successful"
        }
    }
}
