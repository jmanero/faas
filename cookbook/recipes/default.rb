#
# Cookbook Name:: faas
# Recipe:: default
#
# Copyright (C) 2016 John Manero <john.manero@gmail.com>
#
# The MIT License (MIT)
#
include_recipe 'apt'
include_recipe 'datadog::dd-agent'
include_recipe 'datadog::dd-handler'
include_recipe 'datadog::nginx'
include_recipe 'libarchive'

package 'haveged'
package 'nginx'
package 'nodejs'
package 'npm'

## Fetch app and extract archive
asset = github_asset "faas-#{ node['faas']['version'] }.tar.gz" do
  repo 'jmanero/faas'
  release node['faas']['version']
  not_if { node['vagrant'] }

  notifies :extract, 'libarchive_file[faas-source.tar.gz]', :immediate
end

libarchive_file 'faas-source.tar.gz' do
  path asset.asset_path
  extract_to node['faas']['source']

  action :nothing
  notifies :restart, 'service[faas]'
  only_if { ::File.exist?(asset.asset_path) }
end

## Install NodeJS modules
execute 'npm-install' do
  cwd node['faas']['source']
  command '/usr/bin/npm install'

  notifies :start, 'service[faas]'
end

## Configure reverse proxy
template '/etc/nginx/sites-available/faas' do
  source 'nginx.conf.erb'
  notifies :reload, 'service[nginx]'
end

link '/etc/nginx/sites-enabled/faas' do
  to '/etc/nginx/sites-available/faas'
  notifies :reload, 'service[nginx]'
end
link '/etc/nginx/sites-enabled/default' do
  action :delete
  notifies :reload, 'service[nginx]'
end

## Configure and start services
template '/etc/init/faas.conf' do
  source 'upstart.conf.erb'
end

service 'faas' do
  action [:enable, :start]
  provider Chef::Provider::Service::Upstart
  ignore_failure true
end

service 'nginx' do
  supports :status => true, :reload => true
  action [:enable, :start]
end
