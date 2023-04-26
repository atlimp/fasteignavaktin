#!/bin/sh

node /home/node/app/createdb.js
node /home/node/app/index.js --full-sync

/usr/sbin/crond -f -l 0 -c /home/node/app/crontab -L /var/log/cron.log