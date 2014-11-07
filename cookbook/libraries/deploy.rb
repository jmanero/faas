#
# Cookbook Name:: faas
# Library:: deploy
#
# Copyright (C) 2014 John Manero <john.manero@gmail.com>
#
# Do What the Fuck You Want to Public License
#
module FAAS
  ##
  # Deployment Helpers
  ##
  module Deploy
    class << self
      def version(run_context)
        run_context.cookbook_collection['faas'].version
      end
    end
  end
end
