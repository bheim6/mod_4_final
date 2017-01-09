class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to :root
      flash[:success] = "Successfully Logged in!"
    elsif user
      flash[:danger] = "Password is incorrect for this email, please try again"
      redirect_to :login
    elsif
    flash[:danger] = "User email does not exist, please create account or try again"
    redirect_to :login
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to :signup
  end
end
