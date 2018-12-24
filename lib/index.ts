import cookieParser from 'cookie-parser';
import { Application } from 'express';

const possible =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function createFakePHPSESSID(): string {
  let text = '';

  for (let i = 32; i--; ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export interface PhpifyOption {
  headerXPoweredBy?: string;
  fakePHPSESSID?: boolean;
  forceRedirectToPHPExtension?: boolean;
  allowDirectory?: boolean;
}

export function phpify(app: Application, option?: PhpifyOption) {
  app.use(cookieParser());

  app.use((req, res, next) => {
    if (option.headerXPoweredBy) {
      res.setHeader('X-Powered-By', option.headerXPoweredBy || 'PHP 5.3.3');
    }
    if (option.fakePHPSESSID !== false) {
      const cookie = req.cookies.cookieName;
      if (!cookie || !cookie.PHPSESSID) {
        res.cookie('PHPSESSID', createFakePHPSESSID());
      }
    }

    if (
      !req.url.toLowerCase().endsWith('.php') &&
      (!req.url.toLowerCase().endsWith('/') &&
        option.allowDirectory !== false) &&
      option.forceRedirectToPHPExtension !== false
    ) {
      res.redirect(req.url + '.php');
    }
    if (/=PHP(.+)/.test(req.url.split('?')[1])) {
      if (
        req.url.split('?')[1] === '=PHPE9568F36-D428-11d2-A769-00AA001ACF42'
      ) {
        console.log('Easteregg Triggered');
      }
      // More EasterEggs Later
    }
    next();
  });
}
