Proof-of-concept Slack Archive Bot
- Bot waits to be mentioned, when it does it starts the archiving process
- Archives are stored on disk as flat files
- TODO: possibly add database support

Stack:
- node
- express
- bolt for Slack event handling

Building:

1. yarn
2. gulp
3. set enviorment variables SLACK_BOT_TOKEN and SLACK_SIGNING_SECRET

set SLACK_BOT_TOKEN=xoxb-[your-token]
set SLACK_SIGNING_SECRET=[your-secret]