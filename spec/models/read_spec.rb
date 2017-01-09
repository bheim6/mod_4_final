require 'rails_helper'

RSpec.describe Read, type: :model do
  context "associations" do
    it { should belong_to :link }
  end
end
