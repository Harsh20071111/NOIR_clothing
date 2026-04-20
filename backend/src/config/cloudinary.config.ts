import { v2 as cloudinary } from 'cloudinary';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  // Helper method for upload
  async uploadImage(filePath: string, folder: string = 'ecommerce') {
    try {
      return await cloudinary.uploader.upload(filePath, {
        folder,
        use_filename: true,
        unique_filename: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete image by public_id
  async deleteImage(publicId: string) {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw error;
    }
  }
}
