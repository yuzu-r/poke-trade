class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :cards
  has_many :trades_as_proposer, class_name: "Trade", foreign_key: "proposer_id"
  has_many :trades_as_responder, class_name: "Trade", foreign_key: "responder_id"

  validates :username, :presence => true, length: {maximum: 20}

  def trade_count()
    count = trades_as_proposer.where(status: 'pending').count + trades_as_responder.where(status: 'pending').count 
    return count > 0 ? count : nil
  end
end
