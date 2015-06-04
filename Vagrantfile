# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = '2'
Vagrant.require_version '>= 1.5.0'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = 'ubuntu-14.04-provisionerless'
  config.vm.box_url = 'https://cloud-images.ubuntu.com/vagrant/trusty/'\
    'current/trusty-server-cloudimg-amd64-vagrant-disk1.box'

  config.vm.hostname = 'faas'
  config.vm.network :forwarded_port, :host => 9001, :guest => 80
  config.vm.synced_folder './', '/usr/local/faas'

  config.vm.provider :aws do |aws, override|
    aws.access_key_id = Secret.aws_key
    aws.secret_access_key = Secret.aws_secret
    aws.keypair_name = Secret.key_pair
    aws.subnet_id = Secret.subnet_id
    aws.security_groups = Secret.security_groups
    aws.elb = Secret.elb

    ## us-east-1: trusty/14.04 LTS amd64 hvm:ebs 20150528
    aws.ami = 'ami-8fc525e4'
    aws.instance_type = 't2.micro'

    aws.tags = {
      :datadog => 'enable',
      :service => 'faas'
    }

    override.vm.box = 'aws'
    override.vm.box_url = 'https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box'

    override.ssh.username = 'ubuntu'
    override.ssh.private_key_path = File.join(ENV['HOME'], '.ssh/id_rsa')
  end

  config.omnibus.chef_version = :latest
  config.berkshelf.enabled = true
  config.berkshelf.berksfile_path = './cookbook/Berksfile'

  config.vm.provision :chef_solo do |chef|
    chef.json = {
      :vagrant => true,
      :datadog => {
        :api_key => Secret.dd_key,
        :application_key => Secret.dd_app
      },
      :faas => {
        :source => '/usr/local/faas'
      }
    }

    chef.run_list = ['recipe[faas::default]']
  end
end
