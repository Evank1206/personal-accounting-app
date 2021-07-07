// game architecture  // creating controllers

// * 1 * user input controller
var uiController = (function () {


    return {
        public: function () {

        }
    }
})();

// * 2 * finance controller
var finController = (function () {

})();

// * 3 * connection controller
var conController = (function (ui, fin) {

    var enterfunction = function () {
        // get input values from ui
        // pass & save the value to finController
        // value to DOM
        // calculate fincance
        // final result to DOM
        console.log("heyy");

    }

    // when click the button
    document.querySelector(".add__btn").addEventListener("click", function () {
        enterfunction();
    });
    // when press the enter keyboard
    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            enterfunction();
        }
    });

})(uiController, finController)
