# encoding: utf-8

require 'bundler'
require 'bundler/setup'
require 'berkshelf/thor'
require 'octokit'
require 'thor/scmversion'
require 'uri'

##
# ALL YOUR MOOSE
##
module Moose
  ##
  # Moose Tasks
  ##
  class Tasks < Thor
    include Thor::Actions
    namespace 'moose'

    desc 'release TYPE [PRERELEASE]', 'Create a GitHub release entity'
    option :token, :type => :string
    def release(type = nil, prerelease = nil)
      say_status :github, "Using token #{ options[:token] }" if options.include?('token')
      Moose.config(options[:token])

      repo = Octokit::Repository.from_url(remote)
      say_status :repository, "Using GitHub remote #{ repo.slug }"

      invoke :version, *[[type, prerelease], options]
      say_status :release, "Create #{ Moose.version }"
      new_release = Octokit.create_release(repo, Moose.version,
                                           :body => Moose.release_notes)

      invoke :package
      say_status :asset, 'Upload source bundle to release'
      Octokit.upload_asset(new_release.url, 'source.tar.gz',
                           :name => "#{ repo.name }-#{ Moose.version }.tar.gz",
                           :content_type => 'application/x-gzip')

      say_status :asset, 'Upload cookbook bundle to release'
      Octokit.upload_asset(new_release.url, 'cookbooks.tar.gz',
                           :name => "#{ repo.name }-#{ Moose.version }-cookbooks.tar.gz",
                           :content_type => 'application/x-gzip')

      invoke :cleanup
    end

    desc 'remote [NAME]', 'Get the repository remote\'s URL'
    def remote(ref = 'origin')
      remote_url = run "git config --get remote.#{ ref }.url", :capture => true

      case remote_url
      when /^git@/
        capture = /^git@github.com:(.+?)\.git$/.match(remote_url)
        "/#{ capture[1] }"
      else
        URI.parse(remote_url).path
      end
    end

    desc 'version [TYPE] [PRERELEASE]', 'Increment the package version'
    def version(type = nil, prerelease = nil)
      ## Push changes and tag next release
      unless type.nil?
        say_status :version, "Bumping #{ type } version"
        run 'git push'
        invoke 'version:bump', type, prerelease, {
          :default => 'patch'
        }
      end

      invoke 'version:current', []

      inside 'cookbook' do
        run 'bundle exec knife cookbook metadata from file metadata.rb'
      end
    end

    desc 'package', 'Generate temoprary asset packages for upload'
    def package(*args)
      invoke :version

      # Package cookbooks
      inside 'cookbook' do
        say_status :berks, 'package'
        invoke 'berkshelf:package', *[['../cookbooks.tar.gz'], options]
      end

      ## Package source
      files = run('git ls-files', :capture => true).split("\n")
      run "tar -czf source.tar.gz #{ files.join(' ') }"
    end

    desc 'cleanup', 'Remove temporary files'
    def cleanup(*args)
      remove_file 'cookbooks.tar.gz'
      remove_file 'source.tar.gz'
    end
  end

  class << self
    def config(token)
      Octokit.configure do |c|
        c.access_token = token
      end
    end

    def version
      IO.read('VERSION') rescue '0.0.1'
    end

    def release_notes
      IO.read('RELEASE_NOTES') rescue "Releasing version #{ version }"
    end
  end
end
