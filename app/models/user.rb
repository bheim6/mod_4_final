class User < ApplicationRecord
  has_secure_password
  has_many :links

  validates :password_digest, presence: true
  validates :password, presence: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true

  validates :email, presence: true
  validates :email, uniqueness: true
end
