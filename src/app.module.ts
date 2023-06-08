import { Module } from '@nestjs/common';
import { SlonikModule } from 'nestjs-slonik';
import { postgresConnectionUri } from './configs/database.config';
import { UserModule } from './modules/user/user.module';
import { RequestContextModule } from 'nestjs-request-context';

@Module({
  imports: [
    RequestContextModule,
    SlonikModule.forRoot({
      connectionUri: postgresConnectionUri,
    }),

    // Modules
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
