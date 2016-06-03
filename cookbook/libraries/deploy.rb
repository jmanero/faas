#
# Cookbook Name:: faas
# Library:: deploy
#
# Copyright (C) 2016 John Manero <john.manero@gmail.com>
#
# The MIT License (MIT)
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
