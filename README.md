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

### Releases

But incase you actually do, go to the
[releases page](https://github.com/jmanero/faas/releases). Each release has a
cookbook bundle. Run it with `chef-solo`:

### Development

Use Vagrant. The included Gemfile will install `vagrant` and required plugins.
Insert the following n `.vagrant/secret.yaml`:

```
aws_key: XXXX
aws_secret: XXXX
key_pair: key
subnet_id: subnet-deadbeef
security_groups:
  - sg-deadbeef
elb: faas

dd_key: XXXX
dd_app: XXXX
```

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

#### *POST /slack.json*

Slack outgoing-webhook integration endpoint.

#### */slack-command.json*

Slack slash-command response.

#### *GET /index.json*

Return the index of fucks that you don't give.

#### *GET /status.json*

Return the status of all of the fucks that you don't give.

#### *POST /update*

Update the index of fucks that you don't give. For immediate re-indexes on
content-update, configure as a GitHub WebHook for the repo of fucks that you
don't give, but want to index anyway.

## License

```
The MIT License (MIT) Copyright (C) 2016 John Manero <john.manero@gmail.com>
```
