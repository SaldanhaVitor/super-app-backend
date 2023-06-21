import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class ConfigSwagger {
  constructor(private readonly app: INestApplication) {}

  public createDocument() {
    const document = SwaggerModule.createDocument(
      this.app,
      this.getBuildDocument(),
    );
    SwaggerModule.setup('docs', this.app, document);
  }

  private getBuildDocument(): Omit<OpenAPIObject, 'paths'> {
    return new DocumentBuilder()
      .setTitle('super-app-backend')
      .setVersion('1.0.0')
      .build();
  }
}
