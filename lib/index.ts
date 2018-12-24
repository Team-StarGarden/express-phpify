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

/**
 * The interface which contains the option of phpifying.
 */
export interface PhpifyOption {
  /**
   * Header Field `X-Powered-By`. (default: `PHP/5.3.3`), false to disable
   */
  headerXPoweredBy?: false | string;
  /**
   * Whether to disable fake PHPSESSID. (default: true), false to disable
   */
  fakePHPSESSID?: boolean;
  /**
   * Redirect to php extension option. (default: redirect), false to disable
   */
  redirection?: false | PhpifyRedirectionOption;
}

/**
 * The interface which contains the redirection option of phpifying.
 */
export interface PhpifyRedirectionOption {
  /**
   * Whether to disable force redirection to php extension if the user requested a file to other extension (like .html, .jsp).
   * set false to disable
   */
  file?: boolean;
  /**
   * Whether to force redirection to php extension if the user requested directory.
   * set false to disable
   */
  directory?: false | DirectoryRedirectionOption;
}

/**
 * The interface which contains the directory redirection option of phpifying.
 */
export interface DirectoryRedirectionOption {
  /**
   * The file name of index.
   * (default: index.php)
   * e.g. /a/ -> /a/index.php
   */
  indexFileName?: string;
}

const easterEggRegex = /=PHP(.+)/;

/**
 * Phpify your app with the option.
 * @param app the express application
 * @param option the phpify option
 */
export function phpify(app: Application, option?: PhpifyOption) {
  app.use(cookieParser());

  app.use((req, res, next) => {
    if (option.headerXPoweredBy !== false) {
      res.setHeader('X-Powered-By', option.headerXPoweredBy || 'PHP/5.3.3');
    }
    if (option.fakePHPSESSID !== false) {
      const cookie = req.cookies.cookieName;
      if (!cookie) {
        res.cookie('PHPSESSID', createFakePHPSESSID());
      }
      if (!cookie.PHPSESSID) {
        res.cookie('PHPSESSID', createFakePHPSESSID());
      }
    }

    if (option.redirection !== false) {
      const dot = req.url.lastIndexOf('.');
      const routeWithoutExtension = req.url.substring(
        0,
        dot < 0 ? req.url.length : dot
      );
      const extension = req.url.substring(dot < 0 ? 0 : dot + 1);
      const isPHP: boolean = extension === 'php';
      const isDir: boolean = req.url.endsWith('/');

      if (option.redirection === null) {
        // Use default value (true for all).
        if (!isPHP) {
          if (isDir) {
            res.redirect(req.url + 'index.php');
          } else {
            res.redirect(routeWithoutExtension + '.php');
          }
        }
      } else {
        if (option.redirection.file !== false && !isDir && !isPHP) {
          res.redirect(routeWithoutExtension + '.php');
        }
        if (option.redirection.directory !== false && isDir) {
          if (option.redirection.directory === null) {
            // Use default value (true).
            res.redirect(
              req.url + 'index.php'
            );
          } else {
            res.redirect(
              req.url +
                (option.redirection.directory.indexFileName || 'index.php')
            );
          }
        }
      }
    }

    const data = req.url.split('?')[1];    

    if (easterEggRegex.test(data)) {
      if (data === '=PHPE9568F36-D428-11d2-A769-00AA001ACF42') {
        console.log('Easteregg Triggered');
      }
      // More EasterEggs Later
    }
    next();
  });
}

import express from 'express';

const app = express();
phpify(app, {
  headerXPoweredBy: 'PHP 5.3.3',
  fakePHPSESSID: true,
  redirection: {
    file: true,
    directory: false
  }
})
