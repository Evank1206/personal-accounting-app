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
        income__list: ".income__list",
        expenses__list: ".expenses__list"
    };
    // var x = "hello";
    // public service/tohirgooo
    return {
        inputValue: function () {
            return {
                // grab values from inputs
                inc_OR_exp: document.querySelector(DOMclass.add_type).value,
                description: document.querySelector(DOMclass.add__description).value,
                valuue: parseInt(document.querySelector(DOMclass.add__value).value), // added to value parseInt so it's convert string to number
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
            // var totalxxx = item.value;
            if (type === "inc") {
                list = DOMclass.income__list;
                listOfItems = '<div class="list-group-item" id="income-%ID%"><li><div class="item__description float-left">"$DESCRIPTION$"</div><div class="right clearfix float-right"><div class="item__value float-left pr-4">+ "$VALUE$"</div><div class="item__delete float-right"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></li></div>'
            } else {
                list = DOMclass.expenses__list;
                listOfItems = '<div class="list-group-item" id="expense-%ID%"><li><div class="item__description float-left">"$DESCRIPTION$"</div><div class="right clearfix float-right"><div class="item__value float-left pr-4">-"$VALUE$"</div><div class="item__delete float-right"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></li></div>'
            }
            // ter html utguudiig solij ugnu
            listOfItems = listOfItems.replace("%ID%", item.id);
            listOfItems = listOfItems.replace("$DESCRIPTION$", item.description);
            listOfItems = listOfItems.replace("$VALUE$", item.value);
            //    console.log(item.id);
            //    console.log(item.description);
            //    console.log(item.value);
            // console.log(item.value);

            // display to DOM
            document.querySelector(list).insertAdjacentHTML("beforeend", listOfItems);
            // document.querySelector(".income-value").append(totalxxx);

        },
        // clear scrypts from input
        clearInput: function () {
            // collect all inputs value to list variable
            var inputField = document.querySelectorAll(DOMclass.add__description + ", " + DOMclass.add__value);
            // console.log(inputField);
            // convert that list variables into array 
            var inputArr = Array.prototype.slice.call(inputField);
            // console.log(inputArr);
            // loop through inputs and changes to empty! // string 
            // for (var i = 0; i < inputArr.length; i++) {
            //     inputArr[i].value = '';
            // }
            // OR
            inputArr.forEach(function (el, index, array) {
                el.value = '';
            });
            // focus гэдэг element нь cursor -н байрлалыг зааж өгөх бөгөөд, бидий хувьд description дээр cursor oo аваачих учир discription ний location -г зааж өгнө.
            inputArr[0].focus();
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
    // function that calulates and adds exp or inc
    calulateTotalIncome = function (type) {
        var sum = 0;
        dataObj.items[type].forEach(function (el) {
            sum = sum + el.value;
        });
        dataObj.totalAmout[type] = sum;
    }
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
        },
        incomeInvoice: 0,
        percent: 0,
    }
    // public service
    return {
        // income or expenses add them together
        ex_in_Add: function () {
            calulateTotalIncome("inc");
            calulateTotalIncome("exp");
            // total income invoice
            dataObj.incomeInvoice = dataObj.totalAmout.inc - dataObj.totalAmout.exp;
            // calcumlate percentage
            dataObj.percent = Math.round((dataObj.totalAmout.exp / dataObj.totalAmout.inc) * 100);
        },
        // calculate pure income
        takeAllEstimation: function () {
            return {
               total : dataObj.incomeInvoice,
               percenty : dataObj.percent,
               totalINC : dataObj.totalAmout.inc,
               totalEXP : dataObj.totalAmout.exp 
            }
        },

        // grabbing value from input 
        addItem: function (type, descrip, valu) {
            var item;
            var id;
            if (dataObj.items[type].length === 0) id = 1;
            else id = dataObj.items[type][dataObj.items[type].length - 1].id + 1;

            // defense on type it would toggle between income or expenses
            if (type === "inc") {
                item = new Income(id, descrip, valu);
            } else {
                item = new Expenses(id, descrip, valu);
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
        var x = ui.inputValue();
        // console.log(x.inc_OR_exp);
        // console.log(x.description === "");
        // console.log(x.valuue === "");
        // algorithem for хэрвээ 2 input хоосон бол юу ч дэлгэцрүү гаргахгүй
        if (x.description && x.valuue !== '') {
            // 2. save value in calculation controller
            var y = cal.addItem(x.inc_OR_exp, x.description, x.valuue)
            // console.log(y);
            // 3. display user's entered data
            ui.addHtmlList(y, x.inc_OR_exp);
            // clear input function calls here
            ui.clearInput();
        }
        // 3. add expenses & incomes values function  
        cal.ex_in_Add(x.inc_OR_exp);
        // 4. calculate pure income from expense and income
        var logit = cal.takeAllEstimation();
        console.log(logit);
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
