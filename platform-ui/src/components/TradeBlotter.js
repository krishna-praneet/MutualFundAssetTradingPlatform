//component for displaying funds

import React, { Component } from 'react'
// import './tradeBlotter.css' 
import AddTrade from './AddTrade'
import FundItem from './FundItem';
import VerifyButton from './VerifyButton';
import 'materialize-css/dist/css/materialize.min.css';
import './css/tradeBlotter.css'
import LoadingOverlay from 'react-loading-overlay';
import Loader from './Loader';
//import M from 'materialize-css'


class TradeBlotter extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            funds: [],
            trades: []
        }
    }

    // Set funds from fund finder page ui 
    componentDidMount () {
        this.setState({
            funds: this.props.funds 
        })
    }

    // Add Trade method
    addTrade = function (fundName, fundNumber, invManager) {
        // console.log({fundName}, {fundNumber}); 
        const newFund = {
            fundName,
            fundNumber,
            invManager
           }
           this.setState (
            {
                funds: [...this.state.funds, newFund]
            })
    }.bind(this);

    callBackFund = (trade) => {
        const newTrade = {
            fundNumber: trade.fundNumber,
            quantity: trade.quantity,
            status: trade.status
        }
        
        var newTrades = [...this.state.trades]
        var index = newTrades.indexOf(newTrades.find(t => t.fundNumber === newTrade.fundNumber))

        if (index!=-1){
            newTrades.splice(index, 1)
            newTrades.push(newTrade)
        } else {
            newTrades.push(newTrade)
        }

        this.setState({
            trades: newTrades   
        }, () => {
            console.log(this.state.trades)
        })
        
    }
    


    render() {
        return (
            <div className="page-content">
                
                <table className='centered' id="trade-blotter-table">
                    <thead>
                        <tr>
                            <th>Fund Name</th>
                            <th>Fund Number</th>
                            <th>Investment Manager</th>
                            <th>Quantity</th>
                            <th>Buy/Sell</th>
                        </tr>
                    </thead>

                    <tbody> {
                        // Render all the funds 
                        this.state.funds.map((f) => (
                            <FundItem className = "fund-item" fundName={f.fundName} fundNumber={f.fundNumber} invManager={f.invManager} 
                            callBack={this.callBackFund}/> 
                        ))
                        }                          
                    </tbody>
                </table>
                        
                <AddTrade addTrade={this.addTrade} numberOfTrades={this.state.funds.length}/>
                <VerifyButton numberOfTrades={this.props.funds.length} trades={this.state.trades}/> 
    
            </div>
        )
    }
}

export default TradeBlotter;