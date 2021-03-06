var express = require('express');
var router = express.Router();
var db = require("../db/mysql.js");
var moment = require('moment');

var in_events = require('../data_models/in_events.js');
var inventory = require('../data_models/inventory.js');
var inventory_usage_events = require('../data_models/inventory_usage_events.js');
var inventory_product = require('../data_models/inventory_product.js');
var out_events = require('../data_models/out_events.js');
var products = require('../data_models/products.js');
var user = require('../data_models/user.js');
var user_event_log = require('../data_models/user_event_log.js');
var tescoData = require("./tescoApi.js");
var inDescription = require("../not used/InDescription.js");
var initial_prediction = require("./initialPrediction.js");
var prediction = require("../data_models/prediction.js");
var user_log =  require("../data_models/user_event_log.js");
var categories =  require("../data_models/categories.js");
var second_prediction = require("./secondPrediction.js");
var inbox = require("./inbox.js");
var _ = require('lodash');
var array = require('lodash/array');

var initial_shoppingList = require ("./initialShoppingList");





router.get('/drop_all', function(req, res, next) {

  db.drop(["user"], function(data) {
  	res.send(200);
  });
  
});


//***************************************** user.js ********************************************************************

router.get('/add_user', function(req, res, next) {
  console.log("testing database");

  user.createNew("test1","test", function(err, data){
  	if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {
      console.log(data);
      res.send(data)
    }
  });
});

router.get('/login', function(req, res, next) {
  console.log("testing database");

  user.login("test1","test", function(err, data){
  	if(err){
  		console.log(err);
  		res.send("there was an error see the console");
  	}
  	else {
  		console.log(data);
      res.send(data);
  	}
  	
  	
  });
});

router.get('/login1', function(req, res, next) {
  console.log("testing database");

  user.login("foo1","bar1", function(err, data){
  	
  	if(err){
  		console.log(err);
  		res.send("there was an error see the console");
  	}
  	else {

  		console.log(data);
  		res.send(data);
  	}
  	
  	
  });
});

//**********************************************************************************************************************





// ********************************************** Products *************************************************************
router.get('/add_product', function(req, res, next) {
  console.log("testing database");
  metadata = {'tin size': '400g', "ingredients": ['tomatoes', 'water', 'salt']};
  products.createNew("1234567896","Bob","Baked Beans",1, 4, 1, "tin(s)", metadata, function(err, data){
  	if(err){
  		console.log(err);
  		res.send("there was an error see the console");
  	}
  	else {
  		console.log(data);
  		console.log(data.insertId);
  		res.send(data);
  	}
  });
});


router.get('/get_product_by_ean', function(req, res, next) {
  console.log("testing database");

  products.getProductByEan("12344447893", function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {
      console.log(data[0].ean);
      console.log(data[0].id);
      res.send(data);
    }

    
    
  });
});

router.get('/get_product_by_ean_2', function(req, res, next) {
  console.log("testing database");

  products.getProductByEan("1235557890", function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {

      console.log(data);
      res.send(data);
    }  
  });
});

router.get('/get_product_by_id', function(req, res, next) {
  console.log("testing database");

  products.getProductById(10, function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {

      console.log(data);
      res.send(data);
    }  
  });
});

//**********************************************************************************************************************



// ********************************************** Inventory ************************************************************
router.get('/add_inventory', function(req, res, next) {
  console.log("testing database");
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  inventory.createNew(1,16,1,mysqlTimestamp,1,1, function(err, data){
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {
      console.log(data);
      console.log(data.insertId);
      //console.log(data[0].id);

      res.send(data);
    }
  });
});

router.get('/get_inventory_by_user', function(req, res, next) {
  console.log("testing database");

  inventory.getInventoryForUser(3, function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {

      console.log(data);
      res.send(data);
    }  
  });
});


router.get('/get_inventory_by_user_prediction', function(req, res, next) {
    console.log("testing database");

    inventory.getInventoryForUserPrediction(3, function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);
        }
    });
});

router.get('/get_inventory_by_user_prediction2', function(req, res, next) {
    console.log("testing database");

    inventory.getInventoryForUserPrediction2(7, function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);
        }
    });
});



router.get('/stop_tracking', function(req, res, next) {
  console.log("testing database");

  inventory.stopTracking(4, function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {

      console.log(data);
      res.send(data);
    }  
  });
});

router.get('/get_inventory_by_user_product', function(req, res, next) {
  console.log("testing database");

  inventory.getInventoryByUserProduct(1,1, function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {

      console.log(data);
      res.send(data);
    }  
  });
});

router.get('/get_inventory_by_id', function(req, res, next) {
  console.log("testing database");

  inventory.getInventoryById(18, function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {
      console.log(data);
      res.send(data);
    }  
  });
});



router.get('/update_inventory_listing_stock', function(req, res, next) {
  console.log("testing database");

  inventory.updateInventoryListingStock(3,4, function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {

      console.log(data);
      res.send(data);
    }  
  });
});





router.get('/getInventoryData',function (req, res, next) {
    inventory_product.getInStock(3,function(err,data){
        if(err){
            console.log(err);
            res.send("there was an error");

        }
        else{

            console.log('**inventory length***'+ data.length);
            res.send(data);
        }
    });
});






//**********************************************************************************************************************



// ********************************************** out_events ************************************************************


router.get('/add_out_event', function(req, res, next) {
  console.log("testing database");
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  out_events.add_event(2,1,3,2,1,mysqlTimestamp, function(err, data){ 
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {
      console.log(data);
      res.send(data);
    }
  });
});


router.get('/getInventoryDataOut',function (req,res,next) {

    //var userId = req.body.userId;
    var userId = 3;
    var dataArray = [];
    //var data = {description: "xxx", lastAdded: "07/07/27", usedUp: "16/08/17"};
    out_events.get_most_recent_for_user(userId,5000, function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {
            //console.log(data);
            for (i in data){
              var obj= data[i];
              var outId = data[i].id;
              var inventoryId = data[i].inventory_id;

              inventory.getInventoryById(inventoryId, function(err, dataInv){
                  if(err){
                      console.log(err);
                      res.send("there was an error see the console");
                  }
                  else {
                      //console.log(dataInv);
                      //res.send(data);
                      for (j in dataInv){
                        var productId = dataInv[j].product_id;

                        products.getProductById(productId, function(err, dataProduct){

                            if(err){
                                console.log(err);
                                res.send("there was an error see the console");
                            }
                            else {
                                for (x in dataProduct){
                                  var pdrDescription = dataProduct[x].description;

                                  item = {};
                                  item ["description"] = pdrDescription;
                                  item ["productId"] = productId;
                                  item ["inventoryId"] = inventoryId;
                                  item ["outId"] = outId;

                                  dataArray.push(item);


                                }

                                console.log(dataArray);
                            }
                        });


                      }
                  }
              });

            }
            res.send(data);
        }
    });



});




router.get('/getOutStock', function(req, res, next) {
    console.log("testing database");

    inventory_product.getOutStock(23,function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);
        }
    });
});



router.get('/get_most_recent_for_user_OUT', function(req, res, next) {
  console.log("testing database");

  out_events.get_most_recent_for_user(1,5, function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {

      console.log(data);
      res.send(data);
    }  
  });
});



router.get('/get_most_recent_for_user_OUT_description', function(req, res, next) {
    console.log("testing database");

    out_events.get_most_recent_for_user_Description(3,29, function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);
        }
    });
});


router.get('/get_most_recent_for_inventory_OUT', function(req, res, next) {
    console.log("testing database");

    out_events.get_most_recent_for_inventory(1,5, function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);
        }
    });
});

//**********************************************************************************************************************


//*********************************************   in_events ***********************************************************

router.get('/add_in_event', function(req, res, next) {
  console.log("testing database");
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  in_events.add_event(7,1,3,2,mysqlTimestamp, function(err, data){
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {
      console.log(data);
      res.send(data);
    }
  });
});

router.get('/get_most_recent_for_user_IN', function(req, res, next) {
  console.log("testing database");

  in_events.get_most_recent_for_user(3,5, function(err, data){
    
    if(err){
      console.log(err);
      res.send("there was an error see the console");
    }
    else {

      console.log(data);
      res.send(data);
    }  
  });
});

router.get('/get_most_recent_for_user_IN_Description', function(req, res, next) {
    console.log("testing database");

    in_events.get_most_recent_for_user_Description(3,5, function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);
        }
    });
});



router.get('/get_most_recent_for_inventory_IN',function (req,res, next) {
    console.log("testing database");
    in_events.get_most_recent_for_inventory(22,5000,function(err, data){


        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {
            var data1=[];
            console.log(data.length);
            for (var i = 0; i < data.length; i++){
                data1.push({"timestamp": moment(data[i].timestamp).format('YYYY-MM-DD, HH:mm:ss')});
            }
            var data= {"data":data1};
            res.send(data);
        }


    });
    
});
  

router.get('/tescoApitest', function (req,res,next) {
    console.log("testing tesco api response");
    tescoData.get_tesco_data("177103088",function (data, err) {
    //tescoData.get_tesco_data("070177103088",function (data, err) {
            if (data.status == 'fail'){
                console.log('ean code not found');
                console.log(err);
                res.send(data);
            }
            else{
                console.log('ean code  found');
                console.log(data);
                res.send(data);
                //console.log(data[0].brand_name);
            }


        });


});



router.get('/getin_out',function (req,res,next) {
    inventory_product.getInOutEvents(3,99,function (err,data) {

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);
        }
    });

});


router.get('/getFirstIn', function(req, res, next) {
    console.log("testing database");

    inventory_product.getFirstIn(3,99,function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            //console.log(data);
            //res.send(data);
            var data1=[];
            for (var i = 0; i < data.length; i++){
                data1.push({"timestamp": moment(data[i].timestamp).format('DD-MM-YYYY')});
            }
            var data= {"data":data1};
            res.send(data);
        }
    });
});




router.get('/getLastUsedUp', function(req, res, next) {
    console.log("testing database");

    inventory_product.getLastUsed(3,99,0,function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            //console.log(data);
            //res.send(data);
            var data1=[];
            for (var i = 0; i < data.length; i++){
                data1.push({"timestamp": moment(data[i].timestamp).format('DD-MM-YYYY')});
            }
            var data= {"data":data1};
            res.send(data);

        }
    });
});




router.get('/getIn_user_inventory', function(req, res, next) {

    in_events.get_allIn_by_user_and_inventory(3,19,function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);


        }
    });
});


router.get('/getOut_user_inventory', function(req, res, next) {
    out_events.get_allOut_by_user_and_inventory(3,19,function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);


        }
    });
});



router.get('/getInOut_user_inventory', function(req, res, next) {
    var userId = 3;
    var inventoryId= 99;

    in_events.get_allIn_by_user_and_inventory(userId, inventoryId, function (errIn, dataIn) {

        if (errIn) {
            console.log(errIn);
            res.send("there was an error see the console");
        }
        else {

            console.log(dataIn);
            //res.send(dataIn);

            out_events.get_allOut_by_user_and_inventory(userId, inventoryId, function (errOut, dataOut) {
                var allDates = [];

                if (errOut) {
                    console.log(errOut);
                    if (errOut = 'Inventory id has no events') {

                        for (var i = 0; i < dataIn.length; i++) {
                            allDates.push({
                                "id": dataIn[i].id,
                                "inventory_id": dataIn[i].inventory_id,
                                "added": moment(dataIn[i].timestamp).format('DD-MM-YYYY, HH:mm:ss'),
                                "used_up": null,
                                "daysUse": null

                            });
                        }
                        var data = {"data": allDates};
                        res.send(data);


                    }
                    else {
                        res.send("there was an error see the console");
                    }
                }
                else {

                    var jmin = 0;
                    var jmax = dataOut.length;
                    for (var i = 0; i < dataIn.length; i++) {

                        if (jmin < jmax) {
                            if (dataIn[i].timestamp < dataOut[jmin].timestamp) {

                                var startTime = moment(dataIn[i].timestamp);
                                var endTime = moment(dataOut[jmin].timestamp);
                                var diff = endTime.diff(startTime);
                                var duration = moment.duration(diff);
                                var daysUse = duration.asDays();

                                allDates.push({
                                    "id": dataIn[i].id,
                                    "inventory_id": dataIn[i].inventory_id,
                                    "added": moment(dataIn[i].timestamp).format('DD-MM-YYYY, HH:mm:ss'),
                                    "used_up": moment(dataOut[jmin].timestamp).format('DD-MM-YYYY, HH:mm:ss'),
                                    "daysUse": daysUse
                                })
                            }
                            else {

                                allDates.push({
                                    "id": dataIn[i].id,
                                    "inventory_id": dataIn[i].inventory_id,
                                    "added": moment(dataIn[i].timestamp).format('DD-MM-YYYY, HH:mm:ss'),
                                    "used_up": null,
                                    "daysUse": null
                                });

                            }

                            jmin++;

                        }
                        else {
                            allDates.push({
                                "id": dataIn[i].id,
                                "inventory_id": dataIn[i].inventory_id,
                                "added": moment(dataIn[i].timestamp).format('DD-MM-YYYY, HH:mm:ss'),
                                "used_up": null,
                                "daysUse": null

                            });
                        }

                    }

                    //get average and add prediction
                    var sum=0;
                    var count=0;
                    for (var i=0; i< allDates.length; i++){
                        if(allDates[i].daysUse) {
                            sum += parseFloat(allDates[i].daysUse);
                            count ++;
                        }
                    }
                    console.log('average:'+ (sum/count).toFixed() + ' days');

                    //take the last scanned-in date and add the average days to generate a predicted date
                    var averageDays = (sum/count).toFixed();
                    var lastScanIn = moment(allDates[allDates.length-1].added, "DD-MM-YYYY");
                    var predictedRunOut = moment(lastScanIn.add(averageDays,'days')).format('DD-MM-YYYY');
                    console.log(predictedRunOut);




                    var data = {"data": allDates,"predictedRunOut":predictedRunOut,"averageDays":averageDays};
                    console.log(data);
                    res.send(data);

                }

            });


        }
    });
});





//********

router.get('/get_most_recent_for_user_IN_Description2', function(req, res, next) {
    console.log("testing most recent");
    var userId = 3;
    var qty= 5;
    var allData = [];
    var count = 0;

    in_events.get_most_recent_for_user(userId,qty, function(err, data){

            if(err){
                console.log(err);
                res.send("there was an error see the console");
            }
            else {

                var max = data.length;
                console.log('max data:'+ max);
                for (var i = 0; i < data.length; i++){

                    var inventoryId = data[i].inventory_id;
                    inventory.getInventoryById(inventoryId, function(err, dataInventory){

                        if(err){
                            console.log(err);
                            res.send("there was an error see the console");
                        }
                        else {
                            var productId = dataInventory[0].product_id;
                            products.getProductById(productId, function(err, dataProduct){

                                    if(err){
                                        console.log(err);
                                        res.send("there was an error see the console");
                                    }
                                    else {
                                        allData.push({
                                            "idInEvent":data[count].id,
                                            "user_id":userId,
                                            "inventory_id":data[count].inventory_id,
                                            "old_stock":data[count].old_stock,
                                            "new_stock":data[count].new_stock,
                                            "timestamp":data[count].timestamp,
                                            "id":dataInventory[0].id,
                                            "product_id":productId,
                                            "stock_level":dataInventory[0].stock_level,
                                            "predicted_need_date":dataInventory[0].predicted_need_date,
                                            "stock_delta_day":dataInventory[0].stock_delta_day,
                                            "need_trigger_stock_level":dataInventory[0].need_trigger_stock_level,
                                            "idProduct":dataProduct[0].id,
                                            "ean":dataProduct[0].ean,
                                            "brand_name":dataProduct[0].brand_name,
                                            "description":dataProduct[0].description,
                                            "multipack":dataProduct[0].multipack,
                                            "multipack_amount":dataProduct[0].multipack_amount,
                                            "quantity":dataProduct[0].quantity,
                                            "quantity_units":dataProduct[0].quantity_units,
                                            "metadata": dataProduct[0].metadata
                                        });

                                        count ++;

                                    }
                                    //console.log(allData);
                                    if (max == count){
                                        res.send(allData);

                                    }

                                });

                        }
                    });

                }

            }
        });
    });



//********

router.get('/inDescription', function (req,res,next) {

    console.log("testing InDescription response");
    var userId = 3;
    var qty= 1;

    inDescription.get_most_recent_for_user_Description2(userId,qty,function (data,err) {

        if (err){
            console.log(err);
            res.send("there was an error see the console");

        }
        else {
            console.log("data data");
            res.send(data);
        }


    });


});


router.get('/initialPrediction', function (req,res,next) {

    console.log("testing prediction");
    var userId = 3;
    var inventoryId= 17;  //19=inventory id of semi skimmed milk

    initial_prediction.getInitialPrediction(userId,inventoryId,function (dataPrediction,err) {
        if (err){
            console.log(err);
            res.send("there was an error see the console");

        }
        else {
            console.log("data prediction");
            res.send(dataPrediction);
        }


    });

});

router.get('/getscannedout_prediction', function(req, res, next) {

    inventory_product.getScannedOut_prediction(3,function(err, data){
    //in_events.get_allIn_by_user_and_inventory(3,19,function(err, data){

        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);


        }
    });
});

//************************ PREDICTION **********

router.get('/new_prediction', function(req, res, next) {
    console.log("testing new prediction");
    var timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var last_scanIn = timestamp;
    var predicted_need_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var stock_level = 3;
    var metadata = {"data": "add more data"};

    prediction.createNew(timestamp,3,1,5,last_scanIn,predicted_need_date,stock_level,metadata, function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error creating a new prediction see the console");
        }
        else {
            console.log(data);
            res.send(data)
        }
    });
});


router.get('/getPredictionsForUser', function(req, res, next) {

    prediction.getPredictionsForUser(3,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);


        }
    });
});


router.get('/updatePredictionFeedback', function(req, res, next) {

    var feedback_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    prediction.updatePredictionFeedback(1,1,"test",feedback_timestamp,0,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);


        }
    });
});



router.get('/getTotal_Out', function(req, res, next) {

    out_events.getTotal_out(3,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);


        }
    });
});


router.get('/getTotal_in', function(req, res, next) {

    in_events.getTotal_in(10,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data[0].total_in);
            res.send(data);


        }
    });
});

router.get('/getTotal_in_out', function(req, res, next) {
    userId = 3;
    var totalIn = 0;
    var totalOut = 0;
    in_events.getTotal_in(userId,function(err, dataIn){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {
            totalIn = dataIn[0].total_in;
            out_events.getTotal_out(userId,function(err, dataOut){
                if(err){
                    console.log(err);
                    res.send("there was an error see the console");
                }
                else {
                    totalOut =  dataOut[0].total_out;
                    var totalInOut = totalIn + totalOut ;
                    var reward = (totalInOut * 0.1).toFixed(2);
                    console.log("total:"+reward);
                    data = {"totalInOut":totalInOut, "reward":reward};
                    //console.log(data);
                    res.send(data);

                }
            });

        }
    });
});


router.get('/user_log', function(req, res, next) {

    var timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    user_log.createNewUserLog(3,4,timestamp,10,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data);
            res.send(data);


        }
    });
});

router.get('/categories', function(req, res, next) {

    categories.getCategoriesForInventory(40,function(err, dataCategories){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(dataCategories[0].category_id);
            res.send(dataCategories);


        }
    });
});


router.get('/Inventory_Ids_bycategory', function(req, res, next) {
    var categoryId = 63;
    var userId = 3;

    categories.getInventoryIdsForCategory(categoryId,userId,function(err, dataInventoryCategories){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(dataInventoryCategories.length);
            res.send(dataInventoryCategories);


        }
    });
});



router.get('/secondPrediction', function (req,res,next) {

    console.log("testing second prediction");
    var userId = 18;
    var inventoryId= 329;  //19=inventory id of semi skimmed milk  //21=avocados check check

    //second_prediction.getSecondPrediction()
    second_prediction.getSecondPrediction(userId,inventoryId,function (dataPrediction,err) {
        if (err){
            console.log(err);
            res.send("there was an error see the console");

        }
        else {
            console.log("data prediction");
            res.send(dataPrediction);
        }


    });

});


router.get('/InEvents_by_categories', function(req, res, next) {
    var categoryId = 63;
    var userId = 3;

    in_events.get_allIn_by_user_and_category(userId,categoryId,function(err, dataInCategories){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(dataInCategories.length);
            res.send(dataInCategories);


        }
    });
});

router.get('/OutEvents_by_categories', function(req, res, next) {
    var categoryId = 63;
    var userId = 3;

    out_events.get_allOut_by_user_and_category(userId,categoryId,function(err, dataOutCategories){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(dataOutCategories.length);
            res.send(dataOutCategories);


        }
    });
});


router.get('/inventoryIds_by_categories', function(req, res, next) {
    var categoryId = 63;
    var userId = 3;
    var inventoryList=[];

    categories.getInventoryIdsForCategory(categoryId,userId,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data.length);
            for (var i=0; i< data.length; i++){
                inventoryList.push(data[i].inventory_id);

            }
            console.log(inventoryList);
            res.send(data);


        }
    });
});

router.get('/deleteInEvent', function(req, res, next) {
    var inventoryId = 7;
    var userId = 3;

    in_events.deleteIn_Event(userId,inventoryId,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            console.log(data.length);
            res.send(data);
        }
    });
});

router.get('/deleteOutEvent', function(req, res, next) {
    var inventoryId = 7;
    var userId = 3;

    out_events.deleteOut_Event(userId,inventoryId,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {
            console.log(data);
            res.send(data);
        }
    });
});

router.get('/deletePredictionsByInventory', function(req, res, next) {
    var inventoryId = 7;
    var userId = 3;

    prediction.deletePrediction(userId,inventoryId,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {
            console.log(data);
            res.send(data);
        }
    });
});

router.get('/deleteInventory', function(req, res, next) {
    var inventoryId = 7;
    var userId = 3;

    inventory.deleteInventory(userId,inventoryId,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {
            console.log(data);
            res.send(data);
        }
    });
});


router.get('/removedPermanently', function(req, res, next) {
    var inventoryId = 197;
    var userId = 7;

    //delete prediction
    prediction.deletePrediction(userId,inventoryId,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {
            console.log(data);
            //res.send(data);
            //delete in event
            in_events.deleteIn_Event(userId,inventoryId,function(err, data){
                if(err){
                    console.log(err);
                    res.send("there was an error see the console");
                }
                else {

                    console.log(data.length);
                    //res.send(data);
                    //delete out_event
                    out_events.deleteOut_Event(userId,inventoryId,function(err, data){
                        if(err){
                            console.log(err);
                            res.send("there was an error see the console");
                        }
                        else {
                            console.log(data);
                            //res.send(data);
                            //delete inventory
                            inventory.deleteInventory(userId,inventoryId,function(err, data){
                                if(err){
                                    console.log(err);
                                    res.send("there was an error see the console");
                                }
                                else {
                                    console.log("all items deleted");
                                    console.log(data);
                                    res.send(data);
                                }
                            });


                        }
                    });


                }
            });


        }
    });

});



router.get('/getcategories', function(req, res, next) {
    var categoryId = 63;

    //delete prediction
    categories.getCategories(categoryId,function(err, data){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {
            console.log(data);
            res.send(data[0].CAT2);
        }
    });

});



router.get('/getPredictionFeedback2', function(req, res, next) {
    var userId = 3;
    var dataBeforeAll = [];
    var dataAfterAll = [];


    //delete prediction
    inbox.getPredictionsFeedback2(userId,function(data,err){
        if(err){
            console.log(err);
            res.send("there was an error see the console");
        }
        else {

            var resultBefore=_.chain(data.dataBeforeCat).groupBy('category_id').map(function(v, i) {
                return {
                    category_id: i,
                    description: _.get(_.find(v, 'description'), 'description'),
                    product_id: _.map(v, 'product_id'),
                    inventory_id: _.map(v, 'inventory_id'),
                    prediction_id:_.map(v, 'prediction_id')
                }
            }).value();

            for(var i = 0; i<resultBefore.length; i++){
                dataBeforeAll.push({
                    "product_id": resultBefore[i].product_id,
                    "description": resultBefore[i].description,
                    "prediction_id":resultBefore[i].prediction_id,
                    "inventory_id":resultBefore[i].inventory_id,
                    "category_id":resultBefore[i].category_id,
                    "category_description":resultBefore[i].description
                });
            }


            for(var i =0; i<data.dataBefore.length; i++){
                dataBeforeAll.push({
                    "product_id": data.dataBefore[i].product_id,
                    "description": data.dataBefore[i].description,
                    "prediction_id":data.dataBefore[i].prediction_id,
                    "inventory_id":data.dataBefore[i].inventory_id,
                    "category_id":data.dataBefore[i].category_id,
                    "category_description":data.dataBefore[i].category_description
                });

            }


            var resultAfter=_.chain(data.dataAfterCat).groupBy('category_id').map(function(v, i) {
                return {
                    category_id: i,
                    description: _.get(_.find(v, 'description'), 'description'),
                    product_id: _.map(v, 'product_id'),
                    inventory_id: _.map(v, 'inventory_id'),
                    prediction_id:_.map(v, 'prediction_id')
                }
            }).value();

            for(var i =0; i< resultAfter.length; i++){
                dataAfterAll.push({
                    "product_id": resultAfter[i].product_id,
                    "description": resultAfter[i].description,
                    "prediction_id":resultAfter[i].prediction_id,
                    "inventory_id":resultAfter[i].inventory_id,
                    "category_id":resultAfter[i].category_id,
                    "category_description":resultAfter[i].description
                });

            }

            for(var i =0; i<data.dataAfter.length; i++){
                dataAfterAll.push({
                    "product_id": data.dataAfter[i].product_id,
                    "description": data.dataAfter[i].description,
                    "prediction_id":data.dataAfter[i].prediction_id,
                    "inventory_id":data.dataAfter[i].inventory_id,
                    "category_id":data.dataAfter[i].category_id,
                    "category_description":data.dataAfter[i].category_description
                });

            }


            var data = {"dataBefore":dataBeforeAll,"dataAfter":dataAfterAll};


            console.log(data.dataBefore[2].product_id);

            res.send(data);
        }
    });

});



router.get('/getInStock_based_onPredictions', function(req, res, next) {
    var userId = 20;

    //get in stock based on prediction
    inventory_product.getInStock_based_onPredictions(userId,function(err, data){
        if(err){
            console.log(err);
            res.send("no data available");
        }
        else {
            console.log(data);
            res.send(data);
        }
    });

});

router.get('/getInitialShoppingList', function(req, res, next) {
    var userId = 7;

    initial_shoppingList.getInitialShoppingList(userId, function (dataShoppingList, err) {
        if (err) {
            console.log(err);
            console.log("not shopping list ");
        }
        else {
            //console.log(dataPrediction);
            res.send(dataShoppingList);
            console.log("shopping list loaded");
        }
    });
});



module.exports = router;

