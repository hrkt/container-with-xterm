#!/bin/bash
# turn on bash's job control
set -m
/usr/sbin/sshd  &
NODE_ENV=default npm start 
fg %1
