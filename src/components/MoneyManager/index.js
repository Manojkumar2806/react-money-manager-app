import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expense: 0,
    transactionList: [],
    title: '',
    amount: '',
    option: 'INCOME',
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: event.target.value})
  }

  onOptionChange = event => {
    this.setState({option: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, option} = this.state
    const parsedAmount = parseFloat(amount)
    const newTrans = {
      id: uuidv4(),
      title,
      amount: parsedAmount,
      option,
    }

    if (option === 'INCOME') {
      this.setState(prevState => ({
        balance: prevState.balance + parseFloat(amount),
        income: prevState.income + parseFloat(amount),
      }))
    } else if (option === 'EXPENSES') {
      this.setState(prevState => ({
        balance: prevState.balance - parseFloat(amount),
        expense: prevState.expense + parseFloat(amount),
      }))
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTrans],
      title: '',
      amount: '',
      option: 'INCOME',
    }))
  }

  onDeleteIcon = (id, amount, option) => {
    const parsedAmount = parseFloat(amount)

    this.setState(prevState => {
      let updatedBalance = prevState.balance
      let updatedIncome = prevState.income
      let updatedExpense = prevState.expense

      if (option === 'INCOME') {
        updatedBalance -= parsedAmount
        updatedIncome -= parsedAmount
      } else if (option === 'EXPENSES') {
        updatedBalance += parsedAmount
        updatedExpense -= parsedAmount
      }

      return {
        balance: updatedBalance,
        income: updatedIncome,
        expense: updatedExpense,
        transactionList: prevState.transactionList.filter(
          each => each.id !== id,
        ),
      }
    })
  }

  render() {
    const {
      balance,
      income,
      expense,
      transactionList,
      title,
      amount,
      option,
    } = this.state

    return (
      <div className="Container">
        <div className="topContainer">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expense={expense} />
        <div className="bothcontainer">
          <form className="formContainer" onSubmit={this.addTransaction}>
            <h1>Add Transaction</h1>
            <div className="column">
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={this.onTitleChange}
              />
            </div>
            <div className="column">
              <label htmlFor="amount">AMOUNT</label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={this.onAmountChange}
              />
            </div>
            <div className="column">
              <label htmlFor="type">TYPE</label>
              <select value={option} onChange={this.onOptionChange}>
                {transactionTypeOptions.map(eachItem => (
                  <option key={eachItem.optionId} value={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit" className="adbtn">
                Add
              </button>
            </div>
          </form>
          <div className="outputContainer">
            <h1>History</h1>
            <div className="header">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
              <p>Action</p>
            </div>
            <div>
              {transactionList?.length > 0 ? (
                transactionList.map(eachTrans => (
                  <TransactionItem
                    key={eachTrans.id}
                    eachTrans={eachTrans}
                    onDelete={this.onDeleteIcon}
                  />
                ))
              ) : (
                <p data-testid="no-transactions" style={{textAlign: 'center'}}>
                  No transactions added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
