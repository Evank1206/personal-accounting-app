// 1. USER CONTROLLER
var userController = (function () {
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
// 2. CALCULATION CONTROLLER
var calculationController = (function () {
    // private function
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    // private function
    var Expenses = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // var i1 = new Income(1, "from uber this month", 2500);
    // var e1 = new Expenses(1, "buy bicycle", 100);
    // var inc = [];
    // var  exp = [];
    // arr.push(i1);
    // arr.push(e1);
    // private data
    var dataObj = {
        items: {
            inc: [],
            exp: []
        },
        totalAmout: {
            inc: 0,
            exp: 0
        }
    }
    // public service
    return {
        // grabbing value from input 
        addItem: function (type, desc, val) {
            var item;
            var id;
            if(dataObj.items[type].length === 0) id = 1;
            else id = dataObj.items[type][dataObj.items[type].length - 1].id + 1;

            // defense on type it would toggle between income or expenses
            if (type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expenses(id, desc, val);
            }
            dataObj.items[type].push(item);
        },
        dataaa: function(){
            return dataObj;
        }

    }
})();

// 3. CONNECTION CONTROLLER
var connectionController = (function (ui, cal) {

    var enterFunc = function () {
        // get ui value
        var x = ui.inputValue()
        console.log(x);
        // save value in calculation controller
        console.log(cal.addItem(x.inc_OR_exp, x.description, x.valuue));
        // display calculation
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

})(userController, calculationController);

connectionController.setUp();
