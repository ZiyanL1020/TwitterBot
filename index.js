var twit = require("twit");
var request = require('request');
var config = require('./config.js');
var T = new twit(config.appConfig);


/********* Twitter random quote ********/
var quoteAPI = "https://api.forismatic.com/api/1.0/?method=getQuote&key=692375&format=text&lang=en";

var postQuote = function(){
    
    request(quoteAPI, function(err, res, body){
        
        if(err){
            console.error("Failed to GET quote: " + err);
        }
        
        T.post('statuses/update', { status: body }, function(err, data, res){
            if(err){
                console.error("Failed to post the tweet:" + err);
            }
            console.log(data);
        });
        
    });
}
/*** Post one twitter after every 30min **/
postQuote();
setInterval(postQuote, config.timing.post);





/******** Like random twitter with specified tag ********/
var likeTweet = function(){

    T.get('search/tweets', config.parameters, function(err, data, response){
        
        var tweet = data.statuses[Math.floor(Math.random() * data.statuses.length)];
        
        if(typeof tweet != null){
            
            T.post('favorites/create', {id: tweet.id_str}, function(err, res){
                if(err){
                    console.error("Failed to like the tweet: " + err);
                }else{
                    console.log("Succeeded to like the tweet");
                }
                
            });
            
        }else{
            console.error("Failed to fetch any tweet with specified contents");
        }
        
    });
    
}

/*** Favourite one twitter after every 60min **/
likeTweet();
setInterval(likeTweet, config.timing.like);





/******** Make a reply on being followed on other user********/

var stream = T.stream('user');
stream.on('follow', function(event){
     
    var screenName = event.source.screen_name;
        
    T.post("statuses/update", {status: '@' + screenName + ' ,thanks for following!'}, function(err, data, res){
        if(err){
            console.error("Failed to reply when followed:" + err);
        }
        console.log("Succeeded to reply when followed by @" + screenName);
    });
});

