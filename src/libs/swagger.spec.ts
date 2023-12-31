import { INestApplication } from '@nestjs/common';
import { ConfigSwagger } from './swagger';

const mockSwaggerModuleCreateDocument = jest.fn();
const mockSwaggerModuleSetup = jest.fn();

const mockDocumentBuilder = {
  setTitle: jest.fn(() => ({
    setVersion: jest.fn(() => ({
      build: jest.fn(),
    })),
  })),
};

jest.mock('@nestjs/swagger', () => {
  return {
    __esModule: true,
    ...{
      SwaggerModule: {
        createDocument: jest.fn(() => mockSwaggerModuleCreateDocument()),
        setup: jest.fn(() => mockSwaggerModuleSetup()),
      },
      DocumentBuilder: jest.fn().mockImplementation(() => mockDocumentBuilder),
    },
  };
});

describe('Swagger config class', () => {
  let configSwagger: ConfigSwagger;

  beforeEach(() => {
    configSwagger = new ConfigSwagger({} as unknown as INestApplication);
  });

  it('should have a create document method', () => {
    expect(configSwagger.createDocument).toBeDefined();
  });

  it('should call createDocument method from Swagger module when createDocument method is called', () => {
    configSwagger.createDocument();
    expect(mockSwaggerModuleCreateDocument).toHaveBeenCalled();
  });

  it('should call setup method from Swagger module when createDocument method is called', () => {
    configSwagger.createDocument();
    expect(mockSwaggerModuleSetup).toHaveBeenCalled();
  });
});
