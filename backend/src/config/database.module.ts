import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb+srv://mohamedhawas123:9aBVa0d3NE3BlJP8@cluster0.ncq4p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
