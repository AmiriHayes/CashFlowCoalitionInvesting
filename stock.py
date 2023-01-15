import yfinance as yf
import csv

"""Takes stock ticker as input, outputs stock price"""
def get_latest_stock_price(ticker: str):
    ticker_name = yf.Ticker(ticker)
    data = ticker_name.history()
    last_close = data['Close'].iloc[-1]
    return last_close

"""List of investment club stock tickers & accompanying price list"""
stock_list = ["BABA", "AAPL", "DIS", "AAPL", "DIS", "AL", "AL", "C", "C", "HELE", "ABT", "ABT", "MSFT", "MSFT", "ZM", "DHI", "PAYX", "PAYX"];
price_list = [None] * len(stock_list)
data_list = [[]]

"""Creates stock price list array"""
x = 0
countEnd = len(stock_list)
while x < countEnd:
    price_list[x] = round(get_latest_stock_price(stock_list[x]), 2)
    x += 1
"""print(price_list)"""

"""Writes data to a CSV file which is read by Javascript"""
with open('datasheet.csv', 'w', encoding='UTF8', newline='') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(stock_list)
    writer.writerow(price_list)