import { Controller } from '@nestjs/common';
import { User } from '../models/user.entity';

@Controller('auth')
export class AuthController {




    public async login() {
        User
        return {
            message: "Login successful"
        }
    }
}
