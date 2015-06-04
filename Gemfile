source 'https://rubygems.org'
ruby '2.2.2'

gem 'berkshelf', '~> 3.1'
gem 'thor-scmversion', '1.7.0'

# gem install bundler -v 1.7.15
gem 'vagrant', :github => 'mitchellh/vagrant',
               :tag => 'v1.7.2',
               :group => :development

group :development, :plugins do
  gem 'vagrant-aws'
  gem 'vagrant-berkshelf'
  gem 'vagrant-omnibus'
  gem 'vagrant-secret'
end
