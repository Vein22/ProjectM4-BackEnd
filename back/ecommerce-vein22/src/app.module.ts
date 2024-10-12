import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config/dist';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { postgresDataSourceConfig } from './config/data-source';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from './categories/category.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderDetail } from './order-details/entities/order-detail.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { FilesModule } from './files/files.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresDataSourceConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({ ...configService.get("data-source"),
      entities: [User, Order, OrderDetail, Product, Category]
    })
  }),
  UsersModule, ProductsModule, AuthModule, CategoriesModule, OrdersModule, FilesModule, JwtModule.register({
    global: true,
    signOptions: { expiresIn: '1h' },
    secret: process.env.JWT_SECRET,
  })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
