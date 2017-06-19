class Post < ApplicationRecord
  validates :title, uniqueness: true


end
