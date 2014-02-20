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
end
