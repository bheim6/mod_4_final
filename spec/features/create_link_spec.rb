require "rails_helper"

RSpec.describe "can create links", :js => :true do
  scenario "Create a new link" do
    user1 = create(:user)
    visit '/'
    click_on "click here to Login"
    expect(current_path).to eq('/login')
    fill_in "Email", with: "example@example.com"
    fill_in "Password", with: user1.password
    click_on "Submit"

    # visit "/"
    fill_in "Title:", :with => "Turing"
    fill_in "URL:", :with => "http://turing.io"
    click_on "Add Link"

    within('#links-list') do
      expect(page).to have_text("Turing")
      expect(page).to have_text("http://turing.io")
    end
  end

  skip scenario "Error message if invalid Url" do
    user1 = create(:user)
    visit '/'
    click_on "click here to Login"
    expect(current_path).to eq('/login')
    fill_in "Email", with: "example@example.com"
    fill_in "Password", with: user1.password
    click_on "Submit"

    # visit "/"
    fill_in "Title:", :with => "Turing"
    fill_in "URL:", :with => "yo.com"
    click_on "Add Link"

    expect(page).to have_content("Url Please use a valid URL")
  end
end
