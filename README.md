# express-phpify

Express, (literally) Redefined.
**NOW WITH OPTIONS**

## Getting Started

### Installing

Install this package to run following command.

```
npm install express-phpify // or else you can use `yarn add express-phpify`.
```

And just add below code to your app (if you don't need to configure something).

```js
// `app` is your existing express application.
phpify(app);
```

OR use the options to match your needs! (v.1.1.0 or higher)

```js
// `app` is your existing express application.
phpify(app, {
  // (Optional) What should it set the header value to? default: PHP/5.3.3, set false to disable
  headerXPoweredBy: 'PHP/5.3.3',
  // Should it fake PHPSESSID? default: true, set false to disable
  fakePHPSESSID: true,
  // Redirection setup. This is the default, set false to disable
  redirection: {
    // add .php at end of the file, e.g. /a -> /a.php, default: true
    file: true,
    // should we redirect directory? set false to disable
    directory: {
      // (Optional) set the indexFileName e.g. /a/ -> /a/index.php
      indexFileName: 'index.php'
    }
  }
})
```

### READ THIS!!

This library will only allow accessing to paths that end with / or with .php extension,  
If you don't want it, Set the option `redirection` to `false` (default: true)

## Built With

* [Express](https://www.npmjs.com/package/express) - The web framework used
* [TypeScript](https://typescriptlang.org/) - The Best language on NodeJS
* [PHP](https://secure.php.net/) - The *BADDEST* language ever

## Authors

* **Alex Park** - *Maintainer* - [Alex4386](https://github.com/Alex4386)
* **Ranol** - *Contributor* - [RanolP](https://github.com/RanolP)

See also the list of [contributors](https://github.com/Team-StarGarden/express-phpify/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Team-StarGarden/express-phpify/blob/master/LICENSE.md) file for details

## Acknowledgments

* Why do you need this project?
* Inspired by [this tweet\(Korean\)](https://twitter.com/gaeulbyul/status/1051011599350124544), ([Github profile](https://github.com/gaeulbyul))
* This library **IS NOT** guaranteed to be recognized as PHP.
* If this library does not correctly mock the express to PHP, and if you know how to fix it in the source code, Feel free to give us a PR. It always will be welcomed.

## TODO

1. Force .php extension to every routes. (DONE)
2. stacktraces everywhere, just like PHP does.
3. create user response to easteregg (just a POC code was implemented)
