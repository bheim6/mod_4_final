class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to :root
      flash[:success] = "Successfully Logged in!"
    else
      flash[:danger] = "Unsuccessful, Please try again!"
      redirect_to :login
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to :signup
  end
end
