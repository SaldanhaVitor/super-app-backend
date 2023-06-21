import { appConfig } from './app.config';

describe('appConfig', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should return app config default', async function () {
    const config = appConfig();
    expect(config).toEqual({
      port: process.env.PORT || process.env.APP_PORT || 3000,
    });
  });

  it('should return app config with process.env.PORT', async function () {
    process.env.PORT = '3000';
    const config = appConfig();
    expect(config).toEqual({
      port: process.env.PORT || process.env.APP_PORT || 3000,
    });
  });
  it('should return app config with process.env.APP_PORT', async function () {
    process.env.APP_PORT = '3000';
    const config = appConfig();
    expect(config).toEqual({
      port: process.env.PORT || process.env.APP_PORT || 3000,
    });
  });
});
