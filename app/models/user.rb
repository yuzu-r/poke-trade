class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :cards
  has_many :trades_as_proposer, class_name: "Trade", foreign_key: "proposer_id"
  has_many :trades_as_responder, class_name: "Trade", foreign_key: "responder_id"

  validates :username, :presence => true, :uniqueness => true, length: {maximum: 20}
  validates :bio, length: {maximum: 250}

  def trade_count
    count = trades_as_proposer.where(status: 'pending').count + trades_as_responder.where(status: 'pending').count 
    return count > 0 ? count : nil
  end

  def accepted_trades_count
    count = trades_as_proposer.where(status: 'accepted').count + trades_as_responder.where(status: 'accepted').count 
    return count > 0 ? count : nil
  end
end
