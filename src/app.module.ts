import { Module } from '@nestjs/common';
import { SlonikModule } from 'nestjs-slonik';
import { postgresConnectionUri } from '@config/database.config';
import { UserModule } from '@modules/user/user.module';
import { RequestContextModule } from 'nestjs-request-context';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeModule } from '@modules/types/type.module';
import { HierarchyModule } from '@modules/hierarchy/hierarchy.module';

@Module({
  imports: [
    RequestContextModule,
    SlonikModule.forRoot({
      connectionUri: postgresConnectionUri,
    }),

    // Modules
    UserModule,
    AuthModule,
    TypeModule,
    HierarchyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
