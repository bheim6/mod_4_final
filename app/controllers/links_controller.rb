class LinksController < ApplicationController
  def index
    @hot_links = Link.hot
  end
end
