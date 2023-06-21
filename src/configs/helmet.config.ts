import { HelmetOptions } from 'helmet';

export function helmetConfig(): HelmetOptions {
  return {
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
  };
}
