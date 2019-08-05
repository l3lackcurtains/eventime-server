#!/bin/bash

# TODO: environment config
if [ "$NODE_ENV" == "production" ] ; then
  yarn prod
else
  yarn start
fi