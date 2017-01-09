require 'rails_helper'

RSpec.describe "can edit links", :js => :true do
  scenario "edit link on page" do
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
    # As an authenticated user who has added links to my link_urlockbox, when I view the links index:
    click_on "Edit"
    # Each link has an "Edit" button that either takes me to a page to edit the link or allows me to edit the link in place on the page.
    # I can edit the title and/or the url of the link.
    fill_in "Title:", :with => "Turingz"
    fill_in "URL:", :with => "http://turing.io"
    click_on "Add Link"

    expect(page).to have_content("Turingz")
    expect(page).to have_content("http://turing.io")
    # I cannot change the url to an invalid url. Show the same error message as above.
  end
end
