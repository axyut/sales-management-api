import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  // create new order with userId product Id  from createOrderDto
  async create(
    userId: number,
    productId: number,
    order: CreateOrderDto,
  ): Promise<Order> {
    const user = await this.userService.findById(userId);
    const product = await this.productService.findById(productId);
    let newOrder = new Order();
    newOrder.user = user;
    newOrder.product = product;
    newOrder.name = product.name;
    newOrder.quantity = order.quantity;
    newOrder.totalPrice = product.price * order.quantity;
    const saved = await this.orderRepo.save(newOrder);
    if (saved) {
      return saved;
    }
    throw new HttpException('Cannot save order', HttpStatus.NOT_FOUND);
  }

  // find all orders by user id
  async findAll(userId: number): Promise<Order[]> {
    const user = await this.userService.findById(userId);
    const orders = await this.orderRepo.find({ where: { user: user } });
    if (orders) {
      return orders;
    }
    throw new HttpException(
      'Order with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  // find order by id and user id
  async findOne(id: number, userId: number): Promise<Order> {
    const user = await this.userService.findById(userId);
    const order = await this.orderRepo.findOne({
      where: { id: id, user: user },
    });
    if (order) {
      return order;
    }
    throw new HttpException(
      'Order with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  // delete order by id and user id
  async remove(userId: number, id: number): Promise<Order> {
    const user = await this.userService.findById(userId);
    const order = await this.orderRepo.findOne({
      where: { id: id, user: user },
    });
    if (order) {
      console.log(order);

      const deleted = await this.orderRepo.delete(order);
      if (deleted) {
        return order;
      }
    }
    throw new HttpException(
      'Order with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  // delete all orders of particular product
  async removeAllOP(productId: number): Promise<Order[]> {
    const product = await this.productService.findById(productId);
    const orders = await this.orderRepo.find({ where: { product: product } });
    if (orders) {
      const deleted = await this.orderRepo.remove(orders);
      if (deleted) {
        return orders;
      }
    }
    throw new HttpException(
      'Order with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
