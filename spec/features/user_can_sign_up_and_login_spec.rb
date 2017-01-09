require 'rails_helper'

RSpec.feature "Users can sign up and login" do
  scenario "unauthenticated users are redirected to sign up and can create account" do
    # As an unauthenticated user, when I visit the root of the application, /,
    visit '/'
    # binding.pry
    # I should be redirected to a page which prompts me to "Log In or Sign Up".
    expect(current_path).to eq('/signup')

    fill_in "Email", with: "example@example.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_on "Submit"
    # Upon submitting this information, I should be logged in via a session cookie and redirected to the "Links Index" page.
    expect(current_path).to eq('/')
    expect(page).to have_content('Account Created!')
  end

  scenario "user cannot sign up with an email address that has already been used" do
    user1 = create(:user)
    visit '/'
    # I should be redirected to a page which prompts me to "Log In or Sign Up".
    expect(current_path).to eq('/signup')

    fill_in "Email", with: "example@example.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_on "Submit"
    # Upon submitting this information, I should be logged in via a session cookie and redirected to the "Links Index" page.
    expect(page).to have_content('Email has already been taken')
  end

# Password and confirmation must match.
  scenario "Password and confirmation must match" do
    visit '/'
    # I should be redirected to a page which prompts me to "Log In or Sign Up".
    expect(current_path).to eq('/signup')

    fill_in "Email", with: "example@example.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "pas"
    click_on "Submit"
    # Upon submitting this information, I should be logged in via a session cookie and redirected to the "Links Index" page.
    expect(page).to have_content("Password confirmation doesn't match Password")
  end
  # If criteria is not met the user should be given a message to reflect the reason they could not sign up.

  scenario "fields cannot be blank" do
    visit '/'
    # I should be redirected to a page which prompts me to "Log In or Sign Up".
    expect(current_path).to eq('/signup')

    fill_in "Email", with: ""
    fill_in "Password", with: ""
    fill_in "Password confirmation", with: ""
    click_on "Submit"
    # Upon submitting this information, I should be logged in via a session cookie and redirected to the "Links Index" page.
    expect(page).to have_content("Email can't be blank")
    expect(page).to have_content("Password can't be blank")
    expect(page).to have_content("Password confirmation can't be blank")
  end

  scenario "authenticated users can log in and then sign out" do
    user1 = create(:user)
    visit '/'
    click_on "click here to Login"
    expect(current_path).to eq('/login')
    fill_in "Email", with: "example@example.com"
    fill_in "Password", with: user1.password
    click_on "Submit"

    expect(current_path).to eq('/')
    expect(page).to have_content('Successfully Logged in!')
    # As an authenticated user viewing the index page, I should see a link to "Sign Out" and not see a link to "Sign In".
    expect(page).to have_link("Sign Out")
    expect(page).to_not have_link("click here to Login")

    click_link "Sign Out"
    # This should redirect me back to the root of the application where I should see a link to "Log In".
    expect(current_path).to eq('/signup')
    expect(page).to have_link('click here to Login')
  end
end
