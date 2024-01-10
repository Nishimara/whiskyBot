# Whiskey Bot
Бот для Telegram для выпивания виски. Особой смысловой нагрузки он не несет, и как таковой был написал ради опыта и от скуки :) Тем не менее, мы вложились в него.

## Зависимости
- [bun](https://bun.sh) latest

## Запуск
Для запуска необходимо внести в `.env` следующее: 
```sh
DATABASE_URL="mysql://username:password@ip:port/database_name"
TELEGRAM_TOKEN="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
```

- Запущенная [mariadb](https://mariadb.org/) локально или на хосте с указанием информации о подключении в `.env` как в примере выше. Также, вместо mysql вы можете использовать любую другую датабазу, которую поддерживает [prisma](https://www.prisma.io/docs/orm/reference/supported-databases), в этом случае вы должны отредактировать `DATABASE_URL` в соответствии с [документацией](https://www.prisma.io/docs/orm/reference/connection-urls).
- Токен Telegram бота.


После редактирования .env необходимо выполнить следующую команды, для генерации типов дб:
```sh
bun prisma:generate
```

## Дополнительная информация
Для просмотра diff в bun.lockb необходимо выполнить следующие команды: 
```sh
git config diff.lockb.textconv bun
git config diff.lockb.binary true
```
Это заставит git читать бинарный файл .lockb с помощью самого bun.

## Trello
- Наш [trello](https://trello.com/b/GVG9J3hm/whiskybot).
