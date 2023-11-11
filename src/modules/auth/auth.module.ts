import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '@modules/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: configService.get('ACCESS_TOKEN_PRIVATE_KEY'),
      signOptions: {
        expiresIn: configService.get('ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
