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

export function phpify(app: Application) {
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'PHP 5.3.3');
    const cookie = req.cookies.cookieName;
    if (!cookie) {
      res.cookie('PHPSESSID', createFakePHPSESSID());
    } else if (!cookie.PHPSESSID) {
      res.cookie('PHPSESSID', createFakePHPSESSID());
    }
    if (!req.url.toLowerCase().endsWith('.php') && !req.url.toLowerCase().endsWith('/')) {
        res.redirect(req.url+'.php');
    }
    if (/=PHP(.+)/.test(req.url.split('?')[1])) {
        if (req.url.split('?')[1] === "=PHPE9568F36-D428-11d2-A769-00AA001ACF42") {
            console.log("Easteregg Triggered");
        }
        // More EasterEggs Later
    }
    next();
  });
}
