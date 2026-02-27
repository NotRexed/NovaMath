#!/bin/bash
cd /var/www/novamath
git reset --hard
git pull origin main
sudo systemctl reload nginx