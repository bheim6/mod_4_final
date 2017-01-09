class LinksController < ApplicationController
  before_action :check_user

  def index
    @hot_links = Link.hot
  end

  def check_user
    unless current_user
      redirect_to signup_path
    end
  end
end
