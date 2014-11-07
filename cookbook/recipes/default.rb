#
# Cookbook Name:: faas
# Recipe:: default
#
# Copyright (C) 2014 John Manero <john.manero@gmail.com>
#
# Do What the Fuck You Want to Public License
#
include_recipe 'apt'
include_recipe 'libarchive'

package 'nodejs'
package 'npm'

asset = github_asset "faas-#{ node['faas']['version'] }.tar.gz" do
  repo 'jmanero/faas'
  release node['faas']['version']
  not_if { node['faas']['version'] == 'vagrant' }
end
link node['faas']['source'] do
  to '/vagrant'
  only_if { node['faas']['version'] == 'vagrant' }
end

libarchive_file 'faas-source.tar.gz' do
  path asset.asset_path
  extract_to node['faas']['source']

  notifies :run, 'execute[npm-install]'
  only_if { ::File.exists?(asset.asset_path) }
end

template '/etc/init/faas.conf' do
  source 'upstart.conf.erb'
end

service 'faas' do
  action [:enable, :start]
  provider Chef::Provider::Service::Upstart
  ignore_failure true
end

execute 'npm-install' do
  cwd node['faas']['source']
  command '/usr/bin/npm install'
  not_if do ::File.exists?(
    ::File.join(node['faas']['source'], 'node_modules'))
  end
  notifies :start, 'service[faas]'
end
