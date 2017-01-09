class Link < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :url, presence: true
  validate :is_url_valid

  scope :hot, -> {
    select('links.url as url')
      .joins('join reads on reads.link_id = links.id')
      .where('reads.created_at > ?', Time.now - 1.day)
      .group("links.url")
      .order('count("reads".id) DESC').limit(10)
  }

  def is_url_valid
    if url
      uri = URI.parse(url)
      unless uri.kind_of?(URI::HTTP) or uri.kind_of?(URI::HTTPS)
        errors.add(:url, "Please use a valid URL")
      end
    end
  end
end
