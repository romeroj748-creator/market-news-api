# Market News API

Market News API is an API that gives you access to thousands of news articles about international financial markets.

## Supported News Sources

- CNBC
- Nasdaq
- Marketwatch
- Wallstreet Journal

## Todo

- ~~Model Feed Objects~~
- ~~Add more sources~~
- ~~Add auto run~~
- Create Different Feed Types
- Add Express Server
- Publish API

# Features

## Auto Run / Recent News Feed

The auto run feature scans stations in the background and only prints to the screen articles that are not in our database. Essentially it logs out new articles that have just been released. This is useful for a live news feed. Right now it is only accessible through a command prompt, but the next step will be to advertise the logs publically and allow clients to connect and listen to new messages being sent out. WebSockets will most likely be used for this.

## News Feeds

A news feed is a collection of Articles that pertain to a certain subject. By default up to 10 Articles will be sent to the client. There are a couple of filters that can be applied to this query. See below for list of filters. All news feeds can be listened to using WebSockets.

### Filter Types

- `stations | string[]`: Returns articles that match one of these stations. Ex: ['cnbc'] by default, this is null. (View [stations](https://google.com/) for a list of available news stations)
- `channels | string[]`: Returns articles that match one of these channels. Ex: ['Market News'] by default, this is null. (View [channels](https://google.com/) for a list of available news channels)
- `dateStart | string`: Returns articles that are no older than this date. (Uses MM/dd/YYYY format): Ex: ['01/02/2019'] by default, this is null.
- `dateEnd | string`: Returns articles that are no newer than this date. (Uses MM/dd/YYYY format): Ex: ['01/03/2019'] by default, this is null.
- `titleContains | string`: Returns articles that contain this exact string in the article title. (Case insensitive): Ex: ['Google'] by default, this is null.
- `contentContains | string`: Returns articles that contain this exact string in the article contents. (Case insensitive): Ex: ['Mark Zuckerberg'] by default, this is null.

## Types of Feeds

To be discussed later.
