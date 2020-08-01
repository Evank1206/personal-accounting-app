// var shortCut = document.querySelector();
var uiController = (function () {
    // HTML class nerudiig neg gazar bairluulah ni daraa class ner uurchlugdhud zasvarlah hylbar bolomjtoi tiimees tedgeer grab hiij bgaa class nernuudiig neg Object dotor hadglaj ugvel hylbar bolno
    var DOMclass = {
        add_type: ".add__type",
        add__description: ".add__description",
        add__value: ".add__value",
        item__description: ".item__description",
        item__value: ".item__value",
        add__btn: ".add__btn",
    }
    // var x = "hello";
    // public service/tohirgooo
    return {
        inputValue: function () {
            return {
                // grab values from inputs
                inc_OR_exp: document.querySelector(DOMclass.add_type).value,
                description: document.querySelector(DOMclass.add__description).value,
                valuue: document.querySelector(DOMclass.add__value).value,
            }
        },
        getDOMclassFunc: function () {
            return DOMclass; // OBJECT -g butsaah ni
        }
    }
})();

var financeController = (function () {

})();

var othersController = (function (ui, fin) {

    var enterFunc = function () {
        var x = ui.inputValue()
        console.log(x);
        // түр commetted out
        // document.querySelector(DOM.item__description).append(x.description);
        // document.querySelector(DOM.item__value).append(x.valuue);
    };
    var setup_EventListener_Funct = function () {
        // shortCut
        var DOM = ui.getDOMclassFunc();
        // WHEN CLICK THE BUTTON
        document.querySelector(DOM.add__btn).addEventListener("click", function () {
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
    }
    // public service /тохиргоо
    return {
        setUp: function () {
            console.log("app starting now ...");
            setup_EventListener_Funct();
        }
    }

})(uiController, financeController);

othersController.setUp();
