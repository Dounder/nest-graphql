import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsPositive()
  @Min(1)
  id: number;

  @Field(() => String, {
    description: 'Whats needs to be done',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, {
    nullable: true,
  })
  @IsOptional()
  done?: boolean;
}
