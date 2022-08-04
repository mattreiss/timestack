#!/bin/bash
if [[ $1 == "help" || "$@" == "" ]]; then
  echo "./timelapse.sh -D <directory> -FPS <fps> -S <stack_length>"
  exit 0
fi

if [[ ! -d venv ]];
then
  python3 -m venv venv
  source venv/bin/activate
  pip3 install -r requirements.txt
else
  source venv/bin/activate
fi

python3 timelapse.py "$@"