class Trade < ActiveRecord::Base
  belongs_to :proposer, class_name: "User"
  belongs_to :responder, class_name: "User"

  # to-do: validate that the proposer card and responsder card are available
end
