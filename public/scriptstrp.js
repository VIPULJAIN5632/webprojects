

function fn1(){


    var stripePublickey='pk_test_RyDUvqU2VyVXtMjvk3K0UBIi00dGvXwZTM'
    var stripeHandler=StripeCheckout.configure({
        key: stripePublickey,
        locale: 'auto',
        token:function(token){
       
            fetch('/purchase',{
                method:'POST',
                body: JSON.stringify({
                    stripeToken:token.id,
                    amount:price
                })
            }).then(function(res){
                return res.json()
            }).catch(function(error){
                console.error(error)
            })
        }
    })
    
    var rd1=document.getElementById("rd1");
    var rd2=document.getElementById("rd2");
    var rd3=document.getElementById("rd3");
     var priceElement;

    if(rd1.checked==true){
        priceElement= rd1.value;
    }
    else if(rd2.checked==true){
        priceElement= rd2.value;            
    }
    else if(rd3.checked==true){
        priceElement= rd3.value;           
    }
    const price=parseFloat(priceElement)*100;
    
    stripeHandler.open({
        amount:price
    })
    

    
} 
    