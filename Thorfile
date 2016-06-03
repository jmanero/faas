# encoding: utf-8

require 'berkshelf/thor'
require 'octokit'
require 'thor/scmversion'
require 'uri'

##
# Release Helpers
##
module FaaS
  def self.token
    @token ||= IO.read(File.join(__dir__, 'GHTOKEN')).trim
  end

  def self.version
    @version ||= IO.read('VERSION') rescue '0.0.1'
  end

  def self.repo
    Octokit::Repository.from_url(remote)
  end

  def self.remote(ref = 'origin')
    remote_url = `git config --get remote.#{ref}.url`.trim

    case remote_url
    when /^git@/
      "/#{/^git@github.com:(.+?)\.git$/.match(remote_url)[1]}"
    else
      URI.parse(remote_url).path
    end
  end

  ##
  # CLI Tasks
  ##
  class Tasks < Thor
    include Thor::Actions
    namespace 'faas'

    def initialize(*)
      super

      Octokit.configure do |c|
        c.access_token = FaaS.token
      end
    end

    desc 'release TYPE [PRERELEASE]', 'Create a GitHub release entity'
    def release(type = nil, prerelease = nil)
      say_status :repository, "Using GitHub remote #{FaaS.repo.slug}"

      invoke :version, [type, prerelease], options
      say_status :release, "Create #{FaaS.version}"
      new_release = Octokit.create_release(repo, FaaS.version,
                                           :body => "Fucks as a Service: Version #{FaaS.version}!")

      invoke :package
      say_status :asset, 'Upload source bundle to release'
      Octokit.upload_asset(new_release.url, 'source.tar.gz',
                           :name => "#{repo.name}-#{Moose.version}.tar.gz",
                           :content_type => 'application/x-gzip')

      say_status :asset, 'Upload cookbook bundle to release'
      Octokit.upload_asset(new_release.url, 'cookbooks.tar.gz',
                           :name => "#{repo.name}-#{Moose.version}-cookbooks.tar.gz",
                           :content_type => 'application/x-gzip')

      invoke :cleanup
    end

    desc 'version [TYPE] [PRERELEASE]', 'Increment the package version'
    def version(type = nil, prerelease = nil)
      ## Push changes and tag next release
      unless type.nil?
        say_status :version, "Bumping #{type} version"
        run 'git push'
        invoke 'version:bump', type, prerelease, :default => 'patch'
      end

      invoke 'version:current', []
    end

    desc 'package', 'Generate temoprary asset packages for upload'
    def package
      invoke :version

      # Package cookbooks
      inside 'cookbook' do
        say_status :berks, 'package'

        run 'bundle exec knife cookbook metadata from file metadata.rb'
        invoke 'berkshelf:package', ['../cookbooks.tar.gz'], options
      end

      ## Package source
      files = `git ls-files`.trim.split("\n")
      run "tar -czf source.tar.gz #{files.join(' ')}"
    end

    desc 'cleanup', 'Remove temporary files'
    def cleanup
      remove_file 'cookbooks.tar.gz'
      remove_file 'source.tar.gz'
    end
  end
end
