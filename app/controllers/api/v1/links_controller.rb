class Api::V1::LinksController < ApplicationController

  def index
    if current_user.links == nil
    else
      @links = current_user.links.order(id: :asc)
    end
    render json: @links
  end

  def create
    @link = current_user.links.new( link_params )
    if @link.save
      render json: @link, status: 201
    else
      # flash[:message] = "#{@link.errors.full_messages}"
      render json: @link.errors.full_messages, status: 500
    end
  end

  def update
    @link = Link.find params[:id]
    @link.assign_attributes link_params
    just_read = @link.read_changed? && @link.read
    if @link.save
      Read.create(link: @link) if just_read
      head :no_content
    else
      render json: @link.errors.full_messages, status: 500
    end
  end

  private

  def link_params
    params.permit(:title, :url, :read)
  end
end
