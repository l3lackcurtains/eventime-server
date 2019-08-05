#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
  yarn prod
else
  yarn start
fi