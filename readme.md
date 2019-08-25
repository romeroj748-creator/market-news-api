# Market News API

Market News API is an API that gives you access to thousands of news articles about international financial markets.

## Supported News Sources

- CNBC
- Nasdaq
- Marketwatch
- Wallstreet Journal
- Business Insider

## Todo

- ~~Model Feed Objects~~
- ~~Add more sources~~
- ~~Add auto run~~
- ~~Create Different Feed Types~~
- ~~Add Express Server~~
- Publish API
- Discord Bot

## Known Issues

- Dates are not in the same timezone accross stations

# Features

## Auto Run / Recent News Feed

The auto run feature scans stations in the background and only prints to the screen articles that are not in our database. Essentially it logs out new articles that have just been released. This is useful for a live news feed. Right now it is only accessible through a command prompt, but the next step will be to advertise the logs publically and allow clients to connect and listen to new messages being sent out. WebSockets will most likely be used for this.

### Types of Feeds

1. Top News

- CNBC > Top News

2. World News

- CNBC > World News
- Nasdaq > International
- Wallstreet Journal > World News

3. U.S. News

- CNBC > US News
- Nasdaq > US Markets
- Wallstreet Journal > US Business

4. Economy

- CNBC > Economy
- Nasdaq > Economy
- Nasdaq > Taxes
- Nasdaq > Credit and Debt
- Nasdaq > Banking and Loans

5. Politics

- CNBC > Politics

6. Markets

- CNBC > Market Insider
- CNBC > Trader Talk
- CNBC > Options Action
- Nasdaq > Stocks
- Nasdaq > Options
- Nasdaq > US Markets
- Wallstreet Journal > Market News

7. Financial

- CNBC > Finance
- CNBC > Wealth
- CNBC > Personal Finance
- CNBC > Financial Advisors
- CNBC > Small Business

8. Technology

- CNBC > Technology
- Nasdaq > Technology
- Wallstreet Journal > Technology: What's News

9. Business

- CNBC > Business
- CNBC > Small Business
- Nasdaq > Business
- Nasdaq > Small Business
- Wallstreet Journal > US Business

10. Industry Sectors (Break down into sub-feeds)

- CNBC > Healthcare
- CNBC > Real Estate
- CNBC > Autos
- CNBC > Retail
- CNBC > Energy
- CNBC > Media
- CNBC > Travel
- Nasdaq > Real Estate

11. ETF & Futures

- CNBC > Futures Now
- Nasdaq > ETFs
- Nasdaq > Futures

## Inner Workings

The functionality of this applications will be broken into two distict functions.

1. Scanning and Saving News Data

2. Query and Returning of already Saved Data

Both processes will function independently of one another

### Scanning and Saving News Data

`AutoScan` is a function that calls itself every 60 seconds. It will make requests to all major news stations and then save the contents into a database called `stations.txt`. Once this process is done `FeedScan` will run. `FeedScan` is a function that reads our database and extracts relevant channels and saves it into another database called `feeds.txt`. This data collection cycle is complete and we will start waiting 60 seconds to run again.

### Query and Returning News Data

### News Feeds

A news feed is a collection of Articles that pertain to a certain subject. By default up to 10 Articles will be sent to the client. There are a couple of filters that can be applied to this query. See below for list of filters. All news feeds can be listened to using WebSockets.

### Filter Types

An object called FeedQueryOptions will contain all the possible filters for a query. The FeedQueryOptions will be parsed from the request body when the initial API request hits our server.

- `stations | string[]`: Returns articles that match one of these stations. Ex: ['cnbc'] by default, this is null. (View [stations](https://google.com/) for a list of available news stations)
- `channels | string[]`: Returns articles that match one of these channels. Ex: ['Market News'] by default, this is null. (View [channels](https://google.com/) for a list of available news channels)
- `dateStart | string`: Returns articles that are no older than this date. (Uses MM/dd/YYYY format): Ex: ['01/02/2019'] by default, this is null.
- `dateEnd | string`: Returns articles that are no newer than this date. (Uses MM/dd/YYYY format): Ex: ['01/03/2019'] by default, this is null.
- `titleContains | string`: Returns articles that contain this exact string in the article title. (Case insensitive): Ex: ['Google'] by default, this is null.
- `contentContains | string`: Returns articles that contain this exact string in the article contents. (Case insensitive): Ex: ['Mark Zuckerberg'] by default, this is null.
