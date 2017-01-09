class User < ApplicationRecord
  has_secure_password
  has_many :links

  validates :password_digest, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
end
