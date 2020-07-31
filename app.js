var uiController = (function () {

})();

var financeController = (function () {

})();

var othersController = (function (ui, fin) {
    var enterFunc = function () {
        //      grab values from inputs
        var inc_Dic = document.querySelector(".add__type").value;
        // console.log(inc_Dic);
        var description = document.querySelector(".add__description").value;
        // console.log(description);
        var valuue = document.querySelector(".add__value").value;
        // console.log(valuue);
        document.querySelector(".card-total-amount").append(valuue);
    };

    // WHEN CLICK THE BUTTON
    document.querySelector(".add__btn").addEventListener("click", function () {
        enterFunc();
    });
    // WHEN PRESS ENTER ON KEYBOARD
    document.addEventListener("keypress", function (event) {
        // "which" is older verion of keyCode. might be some old computer has old browser & can recognize "which"
        if (event.keyCode === 13 || event.which === 13) {
            // console.log(event.keyCode);
            enterFunc();
        }
    });

})(uiController, financeController);
