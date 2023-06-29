import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rating: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
