import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  variantId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
