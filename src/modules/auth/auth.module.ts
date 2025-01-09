import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/passport/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:
        '26143cdfaaaa1e7b339134c3ae0844326a31de2b84674aac4e2685aa31e9908d',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
