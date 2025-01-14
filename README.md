# Virtual-Stock-Exchange-Game
A JavaScript based macro for managing a virtual stock exchange game.

This JavaScript code is a Google Apps Script function, updateStockPrices1(). It has been designed to manage stock trading between teams in a virtual stock exchange game. It functions in the following way:

- Initialize Sheets and Fetch Data: This is done by accessing three sheets: Market (stock data), Transactions 1 (records of transactions), and Traders (team data).
  From these sheets the program fetches stock details, transactions, and team portfolios into arrays for processing.

- Create Mappings: For efficient fetching of data.
  - Stock Map: Links stock names to their row indices for quick access.
  - Team Map: Links team names to their column indices in the team sheet.

- Process Transactions: Iterates over all recorded transactions to perform validations and updates:
  - Check legality: Ensures no team owns more than 50% of a stock.
  - Check buyer’s balance: Verifies if the buyer has enough funds, accounting for a 2% transaction fee.
  - Check seller’s stock holdings: Confirms the seller has enough stocks to sell.

- Update Sheets: Updates the stock holdings for both the buyer and seller in the Traders sheet.
  - Updates the buyer's and seller's purse amounts.
  - Updates the stock price in the Market sheet.
  - Deducts a 2% broker fee.
 
- Error Handling
Records errors (e.g., inadequate balance, insufficient stocks, illegal ownership) in the Transactions 1 sheet for invalid transactions.

Key Features of this program are:
- Prevents invalid transactions using error-checking mechanisms.
- Dynamically updates stock prices, team portfolios, and purses after valid trades.
- Incorporates transaction fees and ownership rules to mimic real-world trading conditions.
