function updateStockPrices1() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var stockSheet = ss.getSheetByName("Market"); // Stock Data Sheet
  var transactionSheet = ss.getSheetByName("Transactions 1"); // Transactions Sheet
  var teamSheet = ss.getSheetByName("Traders"); //Traders sheet

  var lastRowStocks = stockSheet.getLastRow();
  var lastRowTransactions = transactionSheet.getLastRow();
  var lastRowTeams = teamSheet.getLastRow();

  // Fetch all stock data from "Market" sheet (Columns A to C)
  var stockData = stockSheet.getRange(2, 1, lastRowStocks - 1, 3).getValues(); // Columns A to C

  // Fetch the transaction data from "Transactions" sheet (Columns A and E)
  var transactionData = transactionSheet.getRange(2, 1, lastRowTransactions - 1, 5).getValues(); //Columns A to E

  // Fetch the team data from "Traders" sheet (Columns A and E) 
  var teamData = teamSheet.getRange(1, 1, lastRowTeams - 1, 13).getValues(); //Columns A to E


  // Create a stock map (key: stock name, value: stock row index)
  var stockMap = {};
  for (var i = 0; i < stockData.length; i++) {
    var stockName = stockData[i][0]; // Column A (Stock Name)
    stockMap[stockName] = i; // Store the row index for this stock
  }

  // Creating a team map (key: team name, value: team column index)
  var teamMap = {};
  for (var i = 1; i < 12; i++) {
    var teamName = teamData[0][i]; // row 1 (Team Name)
    teamMap[teamName] = i; // Store the column index for this team
  }
  var buyer;
  var seller;
  var stockName;
  var currentPrice;
  var stockIndex;
  var buyerTeamIndex;
  var sellerTeamIndex;
  var numberOfStocks;
  var priceOfTransaction;
  var buyerPurse;
  var totalStocks;

  // Loop through all transactions and update stock prices
  for (var i = 0; i < transactionData.length; i++) {
    buyer = transactionData[i][0];     //Buyer Name
    seller = transactionData[i][1];   //Seller Name
    stockName = transactionData[i][2]; // Stock Name

    currentPrice = transactionData[i][3]; // Stock Price Settled On

    stockIndex = stockMap[stockName]; // Look up the stock in the map

    buyerTeamIndex = teamMap[buyer];  //Look up the buyer team in the map
    sellerTeamIndex = teamMap[seller];  //Look up the seller team in the map

    numberOfStocks = transactionData[i][4]; //Number of stocks in the transaction
    priceOfTransaction = numberOfStocks * currentPrice; // Calculating price of the transaction
    

    buyerPurse = teamSheet.getRange(lastRowTeams,buyerTeamIndex+1).getValue();      //Purse value of buyer
    

    
  }

  totalStocks = stockSheet.getRange(stockIndex + 2, 3).getValue();

  if(numberOfStocks > totalStocks/2){
    transactionSheet.getRange(i + 1, 6).setValue("Over 50% ownership is illegal");
    return;
  }
  if (priceOfTransaction + priceOfTransaction * 2/100 > buyerPurse) { //Condition checking for purse balance of buyer
      transactionSheet.getRange(i + 1, 6).setValue("Inadequate Balance in Purse of buyer");
      return;
    }
    
  if (stockIndex !== undefined) {
      // Stock exists in the market sheet       

      //Update seller team stock
      if(teamSheet.getRange(stockIndex+2,sellerTeamIndex+1).getValue() >= numberOfStocks){  //Condition for Stocks should exist in seller's account
      teamSheet.getRange(stockIndex+2,sellerTeamIndex+1).setValue(teamSheet.getRange(stockIndex+2,sellerTeamIndex+1).getValue() - numberOfStocks); 
      }
      else{
      transactionSheet.getRange(i + 1, 6).setValue("Incorrect number of Stocks in Seller account");
      return;
      }

          
      transactionSheet.getRange(i + 1, 6).setValue(priceOfTransaction); // Setting price

      

      // Update buyer team stock
      teamSheet.getRange(stockIndex + 2, buyerTeamIndex + 1).setValue(teamSheet.getRange(stockIndex + 2, buyerTeamIndex + 1).getValue() + numberOfStocks);

      //Update buyer team purse
      var tempBuyer = teamSheet.getRange(lastRowTeams,buyerTeamIndex+1).getValue();
       teamSheet.getRange(lastRowTeams,buyerTeamIndex+1).setValue(tempBuyer - priceOfTransaction - priceOfTransaction * 2/100);
       
      //Update seller team purse
      var tempSeller = teamSheet.getRange(lastRowTeams,sellerTeamIndex+1).getValue();
      teamSheet.getRange(lastRowTeams,sellerTeamIndex+1).setValue(tempSeller + priceOfTransaction - priceOfTransaction * 2/100);
    }
    // Then, update the Current Stock Price
    stockSheet.getRange(stockIndex + 2, 2).setValue(currentPrice); // Update Current Price (Column B)
    
}
