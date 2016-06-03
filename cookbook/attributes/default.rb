#
# Cookbook Name:: faas
# Attributes:: default
#
# Copyright (C) 2016 John Manero <john.manero@gmail.com>
#
# The MIT License (MIT)
#

## Source Deployment
default['faas']['version'] = FAAS::Deploy.version(run_context)
default['faas']['source'] = '/usr/local/faas'

default['datadog']['nginx']['instances'] = [{
  'nginx_status_url' => 'http://localhost:80/nginx_status/'
}]

default['apt']['compile_time_update'] = true
