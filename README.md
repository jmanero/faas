Fucks as a Serivice
===================
For those days when you can't find a single fucks to give...

## I don't give a fuck how it works
This is a simple controller that periodically fetches the latest contents of a
directory in a repository hosted on GitHub via GitHub's API, and returns raw
URLs to a random file therein upon request.

#### I don't care how often
Every 60 minutes. No, it can't be configured. Use the WebHook endpoint.

## API
#### *GET /*
Return a URL to a random fuck that you don't give.

#### *GET /index.json*
Return the index of fucks that you don't give.

#### *GET /status.json*
Return the status of all of the fucks that you don't give.

#### *POST /reindex*
Update the index of fucks that you don't give. Configure as a GitHub WebHook
for your the repo of fucks that you don't give, but want to index anyway for
immediate re-indexes on update.
