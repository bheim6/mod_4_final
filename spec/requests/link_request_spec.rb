require "rails_helper"

RSpec.describe "link post request", :type => :request do
  it "makes a link" do
    log_in_user

    post "/api/v1/links", {url: "https://www.turing.io/", title: "Turing"}
    link = JSON.parse(response.body)

    expect(link['title']).to eq("Turing")
    expect(link['url']).to eq("https://www.turing.io/")
  end
end
