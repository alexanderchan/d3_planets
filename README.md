[App on heroku](https://sleepy-journey-51543.herokuapp.com/)

### Creating a quick heroku instance

```shell
heroku create
heroku config:set NPM_CONFIG_PRODUCTION=false
git push heroku master
heroku open
```

Also these params are used:

| Parameter         | example                 |
| ---------         | --------                |
| DB_CONNECTION_URL | postgres://.... |
| SHORT_PREFIX      | https://sleepy-journey-51543.herokuapp.com |
restart
