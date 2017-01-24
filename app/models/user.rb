class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :cards
  has_many :trades_as_proposer, class_name: "Trade", foreign_key: "proposer_id"
  has_many :trades_as_responder, class_name: "Trade", foreign_key: "responder_id"

  def trades
    trades_as_proposer + trades_as_responder
  end
end
