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
    };
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
        },
        // html list ttei ajillah function
        addHtmlList: function (item, type) {
            // orlogo zarlagiin list boloh html -g beltne
            var listOfItems;
            var list;
            if (type === "inc") {
                list = ".income__list";
                listOfItems = '<div class="item clearfix" id="income-%ID%"><div class="item_description">$DESCRIPTION$</div><div class="right clearfix"><div class="item_value">$VALUE$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                // listOfItems = '<li class="list-group-item" id="income-%ID%"><div class="item__description float-left">"$DESCRIPTION$"</div><div class="right clearfix float-right"><div class="item__value float-left pr-4">+ "$VALUE$"</div><div class="item__delete float-right"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></li>'
            } else {
                list = ".expenses__list";
                listOfItems = '<div class="item clearfix" id="expense-%ID%"><div class="item_description">$DESCRIPTION$</div><div class="right clearfix"><div class="item_value">$VALUE$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                // listOfItems = '<li class="list-group-item" id="expense-%ID%"><div class="item__description float-left">"$DESCRIPTION$"</div><div class="right clearfix float-right"><div class="item__value float-left pr-4">-"$VALUE$"</div><div class="item__delete float-right"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></li>'
            }
            // ter html utguudiig solij ugnu
           listOfItems = listOfItems.replace("%ID%", item.id);
           listOfItems = listOfItems.replace("$DESCRIPTION$", item.desc);
           listOfItems = listOfItems.replace("$VALUE$", item.val);
            // delegtsen deer gargana
            document.querySelector(list).insertAdjacentHTML("beforeend", listOfItems);

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
            if (dataObj.items[type].length === 0) id = 1;
            else id = dataObj.items[type][dataObj.items[type].length - 1].id + 1;

            // defense on type it would toggle between income or expenses
            if (type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expenses(id, desc, val);
            }
            dataObj.items[type].push(item);
            return item;
        },
        dataaa: function () {
            return dataObj;
        }

    }
})();

// 3. CONNECTION CONTROLLER
var connectionController = (function (ui, cal) {

    var enterFunc = function () {
        // 1. get ui value
        var x = ui.inputValue()
        console.log(x.inc_OR_exp);
        // 2. save value in calculation controller
        var y = cal.addItem(x.inc_OR_exp, x.description, x.valuue)
        console.log(y);

        // 3. display user's entered data
        ui.addHtmlList(y, x.inc_OR_exp)
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
