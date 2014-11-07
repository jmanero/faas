# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = '2'
Vagrant.require_version '>= 1.5.0'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.omnibus.chef_version = :latest
  config.berkshelf.enabled = true
  config.berkshelf.berksfile_path = './cookbook/Berksfile'

  config.vm.provision :chef_solo do |chef|
    chef.json = {
      :opsworker => {
        :version => 'vagrant'
      }
    }

    chef.run_list = [
      'recipe[opsworker::default]'
    ]
  end

  config.vm.define :trusty do |trusty|
    trusty.vm.box = 'ubuntu-14.04-provisionerless'
    trusty.vm.box_url = 'https://cloud-images.ubuntu.com/vagrant/trusty/'\
      'current/trusty-server-cloudimg-amd64-vagrant-disk1.box'

    trusty.vm.hostname = 'opsworker-trusty'
    trusty.vm.network :forwarded_port, :host => 8883, :guest => 8889
  end

  config.vm.define :precise do |precise|
    precise.vm.box = 'ubuntu-12.04-provisionerless'
    precise.vm.box_url = 'https://cloud-images.ubuntu.com/vagrant/precise/'\
      'current/precise-server-cloudimg-amd64-vagrant-disk1.box'

    precise.vm.hostname = 'opsworker-precise'
    precise.vm.network :forwarded_port, :host => 8884, :guest => 8889
  end
end
