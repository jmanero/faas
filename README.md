Fucks as a Serivice
===================
For those days when you can't find a single fuck to give...

## I don't give a fuck how it works
This is a simple controller that periodically fetches the latest contents of a
directory in a repository hosted on GitHub via GitHub's API, and returns raw
URLs to a random file therein upon request.

#### I don't care how often
Every 60 minutes. No, it can't be configured. Use the WebHook endpoint.

## I don't give a fuck about deploying it
But incase you actually do, go to the
[releases page](https://github.com/jmanero/faas/releases). Each release has a
cookbook bundle. Run it with `chef-solo`:

```
## Install Chef. I don't give a fuck about security...
### https://twitter.com/sadserver/status/529397101705166848
curl -L https://www.opscode.com/chef/install.sh | sudo bash

## Run chef-solo
sudo chef-solo -r https://PATH-YOU-COPPIED-FROM-GITHUB/cookbooks.tar.gz -o 'recipe[faas::default]'
```

## API
#### *GET /*
Return a URL to a random fuck that you don't give.

#### *GET /slack.json*
Slack outgoing-webhook integration endpoint.

#### *GET /index.json*
Return the index of fucks that you don't give.

#### *GET /status.json*
Return the status of all of the fucks that you don't give.

#### *POST /reindex*
Update the index of fucks that you don't give. For immediate re-indexes on content-update, configure as a GitHub WebHook for the repo of fucks that you
don't give, but want to index anyway.

## License
```
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
            Version 2, December 2004

Copyright (C) 2014 John Manero <john.manero@gmail.com>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

    DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.
```
