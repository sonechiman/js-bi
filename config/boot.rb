require 'bundler/setup'

module SigmaDisplay
  def self.root
    File.expand_path('../..', __FILE__)
  end

  def self.env
    Sinatra::Base.environment
  end
end

Bundler.require(:default)

app_root = File.expand_path('../../app', __FILE__)
Dir.glob(app_root + '/**/*.rb', &method(:require))
