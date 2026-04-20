import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { createCache } from 'cache-manager';
import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CacheService } from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
        return {
          stores: [
            createCache({
              stores: [new Keyv({ store: new KeyvRedis(redisUrl) })]
            }),
          ],
        };
      },
    }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    ReviewsModule,
    WishlistModule,
  ],
  controllers: [],
  providers: [CacheService],
  exports: [CacheService],
})
export class AppModule {}