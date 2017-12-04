/* After loading the page download current bitcoin-pln prices */

$(function(){
    var buyPriceContainer = $('#buy-price');
    var sellPriceContainer = $('#sell-price');
    
    var buyArrow = $('#buy-arrow');
    var sellArrow = $('#sell-arrow');
    
    function getExchangeData() {
        
        var currentBuyPrice = parseFloat(buyPriceContainer.html());
        var currentSellPrice = parseFloat(sellPriceContainer.html());        
        
        /* Connect with API and download the data */
        
        $.getJSON('https://blockchain.info/pl/ticker', function(data) {
            buyPriceContainer.html(data.PLN.buy);
            sellPriceContainer.html(data.PLN.sell);
            
            if(currentBuyPrice < parseFloat(data.PLN.buy)) {
                buyArrow.css('color', 'green').removeClass().addClass('fa fa-arrow-up');
            } else if (currentBuyPrice > parseFloat(data.PLN.buy)) {
                buyArrow.css('color', 'red').removeClass().addClass('fa fa-arrow-down');
            } else {
                buyArrow.css('color', 'black').removeClass().addClass('fa fa-minus-square-o');
            }
            
            if(currentSellPrice < parseFloat(data.PLN.sell)) {
                sellArrow.css('color', 'green').removeClass().addClass('fa fa-arrow-up');
            } else if (currentSellPrice > parseFloat(data.PLN.sell)) {
                sellArrow.css('color', 'red').removeClass().addClass('fa fa-arrow-down');
            } else {
                sellArrow.css('color', 'black').removeClass().addClass('fa fa-minus-square-o');
            }
            
            console.log(data.PLN.buy);
            console.log(data.PLN.sell);
            console.log('test czasu');
        });
    }
    
    /* The first call to the function that downloads data after loading */
    getExchangeData();
    
    /* The interval to call the function that takes the current course */
    
    var interval = setInterval(getExchangeData, 5000);
    
    /* change the interval */
    
    $('button').click(function(){
       clearInterval(interval);
        
        interval =setInterval(getExchangeData, $(this).val());
        
        $('#refresh-frequency').html($(this).text());
        
    });
    
});