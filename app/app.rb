class SigmaDisplayApp < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  helpers Sinatra::JSON

  get '/' do
    @options = DataFinder.get_dir_content()
    slim :index
  end

  get '/options' do
    json DataFinder.get_dir_content(*params['vals'])
  end
  get '/twin' do
    @options = DataFinder.get_dir_content()
    slim :twin
  end

  require 'rack-google-analytics'
  use Rack::GoogleAnalytics, :tracker => 'UA-41845795-3'

end
