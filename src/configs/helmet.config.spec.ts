import { helmetConfig } from './helmet.config';

describe('helmetConfig', () => {
  it('should return helmet config', async function () {
    const config = helmetConfig();
    expect(config).toEqual({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`, 'fonts.googleapis.com'],
          fontSrc: [`'self'`, 'fonts.gstatic.com'],
          imgSrc: [`'self'`, 'data:'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          blockAllMixedContent: [`true`],
        },
      },
    });
  });
});
