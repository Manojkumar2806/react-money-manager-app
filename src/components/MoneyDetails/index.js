import './index.css'

const MoneyDetails = props => {
  const {balance, income, expense} = props
  console.log(balance, income, expense)
  return (
    <div className="moneycontainer">
      <div className="green">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="img"
        />
        <div>
          <p>Your Balance</p>
          <p data-testid="balanceAmount" className="rupess">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="skyblue">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="img"
        />
        <div>
          <p>Your Income</p>
          <p data-testid="incomeAmount" className="rupess">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="voilet">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="img"
        />
        <div>
          <p>Your Expenses</p>
          <p data-testid="expensesAmount" className="rupess">
            Rs {expense}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
