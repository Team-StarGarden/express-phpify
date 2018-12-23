# express-phpify

Express, (literally) Redefined.

## Getting Started

### Installing

Install this package to run following command.

```
npm install express-phpify // or else you can use `yarn add express-phpify`.
```

And add below code to your app.

```js
// `app` is your existing express application.
phpify(app);
```

### READ THIS!!

This library will only allow accessing to paths that ends with / or with .php extension,  
Please Make it note, while using this library.

## Built With

* [Express](https://www.npmjs.com/package/express) - The web framework used
* [TypeScript](https://typescriptlang.org/) - The Best language on NodeJS
* [PHP](https://secure.php.net/) - The *BADDEST* language ever

## Authors

* **Alex Park** - *Maintainer* - [Alex4386](https://github.com/Alex4386)
* **Ranol** - *Contributor* - [RanolP](https://github.com/RanolP)

See also the list of [contributors](https://github.com/Team-StarGarden/express-phpify/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://gist.github.com/Team-StarGarden/express-phpify/blob/master/LICENSE.md) file for details

## Acknowledgments

* Why do you need this project?
* Inspired by [this tweet\(Korean\)](https://twitter.com/gaeulbyul/status/1051011599350124544), ([Github profile](https://github.com/gaeulbyul))
* This library **IS NOT** guaranteed to be recognized as PHP.
* If this library does not correctly mock the express to PHP, and if you know how to fix it in the source code, Feel free to give us a PR. It always will be welcomed.

## TODO

1. Force .php extension to every routes. (DONE)
2. stacktraces everywhere, just like PHP does.
3. create user response to easteregg (just a POC code was implemented)