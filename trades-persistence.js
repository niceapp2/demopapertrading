class TradeLogger {
    constructor() {
        this.tradesKey = 'trades';
    }

    saveTrade(trade) {
        const trades = this.getTrades();
        trades.push(trade);
        localStorage.setItem(this.tradesKey, JSON.stringify(trades));
    }

    getTrades() {
        const trades = localStorage.getItem(this.tradesKey);
        return trades ? JSON.parse(trades) : [];
    }

    clearTrades() {
        localStorage.removeItem(this.tradesKey);
    }
}