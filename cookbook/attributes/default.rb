#
# Cookbook Name:: faas
# Attributes:: default
#
# Copyright (C) 2014 John Manero <john.manero@gmail.com>
#
# Do What the Fuck You Want to Public License
#

## Source Deployment
default['faas']['version'] = FAAS::Deploy.version(run_context)
default['faas']['source'] = '/usr/local/faas'

default['datadog']['nginx']['instances'] = [{
  'nginx_status_url' => 'http://localhost:80/nginx_status/'
}]
