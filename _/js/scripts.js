var game = new Phaser.Game(640, 700, Phaser.CANVAS, 'gameWrapper');
game.state.add('gameboot', theGame.gameboot);
game.state.add('preloader', theGame.preloader);
game.state.add('menu', theGame.menu);
game.state.add('fail', theGame.fail);
game.state.add('prizes', theGame.prizes);
game.state.add('lose', theGame.lose);
game.state.add('instructions', theGame.instructions);
game.state.add('success', theGame.success);
game.state.add('win', theGame.win);
game.state.add('gameplay', theGame.gameplay);
game.state.start('gameboot');


//Existing user recognition
if(localStorage.getItem("lashgame_name")  && localStorage.getItem("lashgame_name"))  {
    $('.returning-name').html(localStorage.getItem("lashgame_name"));
    $("#existing-user-panel").show();
} else {
    localStorage.clear();
    $("#new-user-panel").show();

    gtag('event', 'Registration Form ', {
      'event_category': 'Displayed'
    });

}



$("#new-user-form-submit").click(function(e){
    e.preventDefault();
    validateForm();
});

$("#existing-user-form-submit").click(function(e){
    e.preventDefault();
    entry(localStorage.getItem("lashgame_id"));
});



$("#not-user").click(function(e){
    e.preventDefault();
    localStorage.clear();

    $("#existing-user-panel").hide();
    $("#new-user-panel").show();
    $('#registration-form').trigger("reset");

    gtag('event', 'Registration Form ', {
      'event_category': 'Displayed'
    });

});


$( window ).resize(function() {
   $("#registration").css("height", $("#gameWrapper").height()-30);
});


 function validateForm(){
        //Put the error message and submit button into buttons for performance
        var errorContainer = $("#new-user-panel .errors p");
        var submitButton = $("#new-user-form-submit");
        //Stop resubmitting while checking is happening
        submitButton.prop('disabled', true); 
        errorContainer.html("");

        //Put field values into variables
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var email = $("#email").val(); 
        var dobDay = $("#dobDay").val(); 
        var dobMonth = $("#dobMonth").val(); 
        var dobYear = $("#dobYear").val(); 
        var address1 = $("#address1").val(); 
        var address2 = $("#address2").val(); 
        var city = $("#city").val(); 
        var postcode = $("#postcode").val(); 
        var tac = $("#tac").val(); 

        /*
        var dobDay = $("#dobDay :selected").text();;
        var dobMonth = $("#dobMonth :selected").text();;
        var dobYear = $("#dobYear :selected").text();;
        */

        //Clientside validation 
        if (fname=="" || lname=="" || address1=="" || postcode=="" || email=="" || tac=="") {
            errorContainer.html("Please fill out all of the required fields");
            submitButton.prop('disabled', false);
            $("#registration").scrollTop(0);
            
        } else { //If client side validation succeeds, move on to server side.
        //Serverside validation
            var formData = $("#registration-form").serialize();
            $.ajax({
            type: 'POST',
            url: "api/user-data.php",
            data: formData,
            success: function(response) {

            	var result = JSON.parse(response);

                if (result.feedback==="" && result.userID!==null) {
                    //window.location.href = "enter-competition-user-id.php";
                    localStorage.setItem("lashgame_id", result.userID);
                    localStorage.setItem("lashgame_name", fname);

                    gtag('event', 'Registration Form ', {
                      'event_category': 'User registered'
                    });

                    entry(result.userID);


                } else {
                //If the respone contains errors, display them.
                    localStorage.clear();
                    errorContainer.html(result.feedback);   
                    submitButton.prop('disabled', false);  
                    $("#registration").scrollTop(0);          
                }
            },
            //If something server based goes wrong, output a generic message.
            error: function(jqXHR, exception) {
                localStorage.clear();
                errorContainer.html("Sorry, something went wrong.  Please try again.");
                submitButton.prop('disabled', false);
            }
            });
        }
    }

    function entry($userID) {
        var formData = $("#registration-form").serialize();
            $.ajax({
                type: 'POST',
                url: "api/competition.php",
                data: "userid="+$userID,
                success: function(response) {

                    var result = JSON.parse(response);

                    if(result.winner === true) {
                        game.state.start('win', 1, 0, result.outcome);
                    } else {
                        game.state.start('lose');
                    }
                    $("#new-user-panel").hide();
                    $('.returning-name').html(localStorage.getItem("lashgame_name"));
                    $("#existing-user-panel").show();
                    $("#registration").hide();


                },
                //If something server based goes wrong, output a generic message.
                error: function(jqXHR, exception) {
                    localStorage.clear();
                    errorContainer.html("Sorry, something went wrong.  Please try again.");
                    submitButton.prop('disabled', false);
                }
            });
    }
