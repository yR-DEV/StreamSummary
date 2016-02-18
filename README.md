![alt text](http://www-cdn.jtvnw.net/images/twitch_logo3.jpg)

STREAMS SUMMARY
=====

## Explanation/Justification?

### What it is
- A simple application that will monitor statistics and record the stream summary numbers from twitch.tv, a popular and quickly growing live streaming platform for gamers.
    * overall statistics url: `https://api.twitch.tv/kraken/streams/summary`
- Summary includes total number of streams that are live and the number of active viewers
- ~~I will be displaying the recorded data with Chart.js, will get to this soon~~


### Goals?
- Hopefully learn something from the numbers recorded over a period of time.
- Validate the increasing presence and popularity of twitch (mostly for myself)
    * Is the total number of viewers increasing at a faster rate than channels?
        * Are the large fluctuations in viewers due to viewbotting?
    * Other information???

__________
========

## Getting Started


### What ya need

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt  grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod` in a separate shell


### Set up for development

1. `npm install` to install server dependencies.
2. `bower install` to install front-end dependencies.
3. `mongod` in a separate shell to keep an instance of the MongoDB Daemon running
4. `grunt serve` will start the development server.


## buildin' and developin'

Run `grunt build` for building and `grunt serve` for preview.


## Testing the app

Running `npm test` will run the unit tests with karma.


## TODO:
- ~~instantiate a Chart.js module or put it into stats.~~
- ~~finish database connection and enter data into mongod~~
    * ~~make sure that schema and connections are ok~~
    * ~~figure out if you need to use .env~~
    * ~~add env to .gitignore~~
- ~~mongo configuration options for the server in files:~~
- ~~Set up graph controller to pull the X most recent ticks from the mongo collection and display them accordingly.~~~
    * ~~I feel like I am going to have to refactor the code I write for this.~~
- ~~Figure out why the initial and subsequent API calls are being executed twice.~~
    * ~~Because these calls are basically being called on the front end and have no interaction with inserting records into the database, it is ok.~~
- ~~Should I use an external library for async promises for my mongoose database interactions...?~~
- ~~Organize the `.find({}).sort{"_id": 1}.limit(10?)` query returned to the front end so it's ready for the rendering of the graph~~
    * ~~Can I have a break in the y-axis (significantly more viewers then channels live) ?~~
    * ~~I don't think I can have a break in the axis, deciding whether or not to have 2 graphs, one for each statistic, or 2 graphs and a third one with both, or just the combined one or what.~~
- ~~Create separate graphs for channels and viewers because the two numbers are so far apart, it is hard to see the changes in channels live with the y axis so large.~~
- ~~Use chart.js's update method to update the graph on every back end api call tick.~~
    * I just set a $timeout to update the graph whenever an api call is made
- ~~Change the last refreshed date to match the date of the back end api tick.~~
- ~~Create/brainstorm a way to average out the viewers and channels for each hour of the day (?)~~
    * ~~Look at the average X viewers/channels for like each hour?~~
- ~~DOING AVERAGES FOR EACH HOUR, NEED TO ENTER 1 ENTRY INTO AverageSchema IN ORDER FOR THE LOGIC TO WORK. NEED TO ASK SOMEONE ABIOUT THIS LATER~~    
- ~~Refactor refactor refactor the summary stats!!!!~~
- ~~Consider using the update method for chart.js instead of just rerendeing..~~
    * ~~I just like the rendering animation even though its harder to see the change in the graph.~~
- Start to work on getting statistics about streamers now, it looks like I will have to actually register my application with twitch in order to make more api calls.     

## Things to learn
- ~~Chart.js and how it accesses data from the backend~~
    * ~~Do I need to set any custom global settings for my line graph?~~
    * ~~how does the chart.js `update()` exactly work? Does it rerender or do I need a page refresh (Please be the former...)~~
- ~~exactly how these front end angular components are compiled so I can use it like a react component/class (I have a feeling it is the directive of each component)~~    
