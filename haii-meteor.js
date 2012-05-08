//tells meteor that you want to use mongo
Friends = new Meteor.Collection("friends")


if (Meteor.is_client) {
  //meteor likes handle bars by default
  Template.friend_list.friends = function(){
    return Friends.find({},{sort:{name:1}});
  }
  Template.friend_list.friend_count = function(){
    return Template.friend_list.friends().count();
  }
  //depends on count
  Template.friend_list.lonely_label = function(){
    return Template.friend_list.friend_count()==0?"You're lonely":"you're got friends";
  }
  //by setting event on an individual item, we get that context
  Template.friend_info.selected_class = function(){
    return Session.equals('selected_friend_id',this._id)?"active":"";
  }
  Template.friend_info.events = {
    'click':function(){
        console.log('clicked',this._id);
        Session.set('selected_friend_id',this._id);
    }
  }

  Template.hello.greeting = function () {
    return "Welcome b'more on rails.";
  };

  Template.hello.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}