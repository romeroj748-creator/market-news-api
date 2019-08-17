# Market News API

Market News API is an API that gives you access to thousands of news articles about international financial markets.

## Supported News Sources

- CNBC
- Marketwatch
- Wallstreet Journal

## Todo

- Model Feed Objects
- Add more sources
- Add Express Server
- Publish API

## The Object Model

Market News API is made up of 4 components. Stations, Channels, Feeds and Articles. Each object helps to categorize articles and maintain a consistent article structure.

### Station

Stations are news companies themselves. An example of a station would be the New York Times, CNBC or Nasdaq. Stations are made up of channels.

### Channel

Channels are what make up a station. A station may have multiple channels. Nasdaq has channels that include Bonds, Commodities, Stocks, Business, Economy, Technology and more. Channels share a similar feed structure, which is why we grouped them together. Channels return a list of articles.

### Article

Articles are the news objects themselves. They contain the information that we are providing. They are made up of properties like: Title, Description,Date, and Source. These are the objects that are returned to the end user.

### Feed

Feeds are custom made by Market News API. They are categorized groups off channels that produce a single feed of articles that pertain to a subject.
