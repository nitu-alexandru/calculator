let previous_number;
let validation_p_n;
let last_number;
let validation_l_n;
let insert_in_array = [];
let first_number;
let first_number_array = [];
let nr_cu_zecimale = 10;
var op;
var history_op = [];
let history1 = [];
var counter = 1;
var counter2 = 4;
var operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'X': (a, b) => a * b,
    '/': (a, b) => a / b
};



jQuery('.buton').click(function(ev){

    ev.preventDefault();

    inserted_number = jQuery(this).attr('meta-data');

    if(validation_p_n == undefined){
        verificari();

        
        var display_number = afisare();
       
      
        if(insert_in_array.includes('-') && insert_in_array.includes('.')){
          
            first_number =  previous_number;
        }else if(insert_in_array.includes('-')){
            first_number = '-'+ previous_number;
        }else {
            first_number = previous_number;
        }

        var display_number = afisare();

        jQuery('.display_number').html(display_number);
  
    }
    else {
        verificari();

        // aici e stocata modalitatea de afisare X,XXX
        var display_number = afisare();

        // aici e stocat numarul pt operatiuni
        last_number = previous_number;

        //   first_number =  first_number_array;

        // validam ultimul numar 
        validation_l_n = true;

        //aici aruncam numerele formatate 
        // asta era inainte: jQuery('.display_number').html('<h1>'+ first_number_array + inserted_operation + display_number + '</h1');
        jQuery('.display_number').html(display_number);

        op = inserted_operation;

    }

});

jQuery('.buton_operation').click(function(ev){

    ev.preventDefault();
    inserted_operation = jQuery(this).attr('meta-data');

    if(inserted_operation !== 'rezultat' && inserted_operation !== 'cancel' && validation_p_n == undefined && first_number == undefined){
        
        if(inserted_operation == '-'){
            insert_in_array =[];

                insert_in_array.push(inserted_operation)

                display_number = afisare();
                jQuery('.display_number').html(display_number);
        }
        else if(inserted_operation == '+'){
                insert_in_array =[];
                insert_in_array.push(inserted_operation)
                
                display_number = afisare();

                jQuery('.display_number').html(display_number);

        }
        else if(inserted_operation == '!'){
           
        }

    } else if(inserted_operation !== 'rezultat' && inserted_operation !== 'cancel' && validation_p_n == undefined){
        validation_p_n = true;
        first_number = String(first_number);
        var verifica_pct_final = String(first_number.charAt(first_number.length-1));


        if(verifica_pct_final == '.'){
           first_number = first_number.slice(0,-1)
           insert_in_array.pop();
        } else {       
             
        }

        if(first_number == '-0' || first_number == '0'){
            first_number = 0;
            insert_in_array[0] = 0;
     
        } else {
            first_number = first_number;
        }
       
        if(inserted_operation == '!' ){
            if (first_number == 0 || first_number == 1){
                answer = factorial(first_number);
                jQuery('.display_number').html(answer);
                
              }else if(first_number == '0.'|| insert_in_array.includes('.') || Number(first_number) > 21 ){
                
                jQuery('.display_number').html('EROARE');
 
            } else {
                answer = factorial(Number(first_number));
                first_number = Number(answer);
                validation_p_n = undefined;
                display_number = String(first_number);
                previous_number = undefined;
                first_number_array = first_number;

                insert_in_array = [];
                for (i=0; i < display_number.length ; i++){
                    insert_in_array.push(display_number.charAt(i));
                }
          
                jQuery('.display_number').html(first_number);
                
              }
        
            
        } else {
            op = inserted_operation;
            previous_number = undefined;
            var display_number = afisare();
            first_number_array = display_number;      
            insert_in_array = [];
            
            jQuery('.first_part_of_operation').html(display_number + ' ' + inserted_operation);
            jQuery('.display_number').html('0');
           
        }


    }
    else if(inserted_operation == 'rezultat' && validation_p_n !== undefined && validation_l_n !== undefined) {
       
       
        verificare_zecimale();
        operator = op;
        if(nr_cu_zecimale == 1){
        var calcul = calculare(Number(first_number), Number(last_number), operator);
       
        } else if(nr_cu_zecimale !== 1 && operator == '+' || operator == '-') {

        var calcul = calculare((Number(first_number) * nr_cu_zecimale), (Number(last_number)* nr_cu_zecimale), operator);
        var calcul = Number(calcul/nr_cu_zecimale);
        } else if (nr_cu_zecimale !== 1 && operator == 'X' || operator == '/'){
            var calcul = calculare(Number(first_number), Number(last_number), operator);
        }
         
        if(calcul == 'Infinity'){
            calcul = 0;
        } else {
          calcul = calcul;
        }
   

       
        insert_in_array = [];
       
        for (i=0; i < String(calcul).length; i++){
            insert_in_array[i] = Array.from(String(calcul))[i];
        }
        
        
        display_number = afisare();

        history_op.unshift(first_number + op + last_number + '=' + calcul);
        history1.unshift(first_number + op + last_number + '=' + calcul);

       first_number = calcul;
       
       validation_p_n = undefined;
       last_number = '';
       nr_cu_zecimale = 10;

     
       afisare_istoric();
       
       jQuery('.display_number').html(display_number);
       jQuery('.first_part_of_operation').html('');

    } else if((inserted_operation !== 'rezultat' && inserted_operation !== 'cancel' && validation_p_n == true && validation_l_n == undefined)){
        
        display_number = first_number_array;
        
        jQuery('.first_part_of_operation').html(display_number + ' ' + inserted_operation);
        
    }
    else if(inserted_operation == 'cancel') {
        inserted_operation = undefined;
        first_number_array = undefined;
        previous_number =undefined;
        first_number = undefined;
        last_number = undefined;
        insert_in_array =[];
        validation_p_n = undefined;
        validation_l_n = undefined;
        display_number = 0;
        counter = 1;
        counter2 = 4;
        history_op = [];
        history_op2 = [];
        history1 = [];
       
        jQuery('.display_number').html('0');
        jQuery('.history_last_operation').css('display','none');
        jQuery('.first_part_of_operation').html('');
        jQuery('.history_other_operation > p').remove();
      

    } else if(inserted_operation !== 'rezultat' && inserted_operation !== 'cancel' && validation_p_n == true && last_number === '') {

     
        jQuery('.first_part_of_operation').html(first_number + ' ' + inserted_operation);
        

    } else {

        valoare = jQuery('.first_part_of_operation').text();
        inserted_operation = valoare.charAt(valoare.length-1);
        display_number = first_number;
        
        previous_number = undefined;
        
    }

});


function verificari(){

    if(previous_number == undefined){
    
        if(inserted_number == 0){
            
            previous_number = 0;
            //insert_in_array.push(inserted_number);
        }
        else if(Number(inserted_number) && inserted_number !== 0) {
            previous_number = inserted_number;
            insert_in_array.push(inserted_number);
            jQuery('.display_number').html('<p>'+ previous_number + '</p');   
        } 
        else if(inserted_number == '.' && insert_in_array.length == 0){
            insert_in_array[0] = 0;
            insert_in_array[1] = '.';
            previous_number = insert_in_array.join('');
            
        } else if(inserted_number = '.' && insert_in_array.length == 1 && insert_in_array[0] == '-') {
            
            insert_in_array.push(0,'.');
            previous_number = '-' + insert_in_array.slice(1).join('');
            
            
            
        } else if(inserted_number = '.' && insert_in_array.length == 1 && insert_in_array[0] == '+') {

            insert_in_array.push(0,'.');
            previous_number = insert_in_array.slice(1).join('');
            insert_in_array.shift();
    
        }
    }
    else if(previous_number == 0 && inserted_number == 0 && !insert_in_array.includes('.')) {

            previous_number = 0;
            //previous_number ="";
            //insert_in_array =[];

    } 
    else if(insert_in_array.length == 1 && insert_in_array[0] == 0) {
            previous_number = inserted_number;
            insert_in_array.push(inserted_number);
            insert_in_array.shift();
            jQuery('.display_number').html('<p>'+ previous_number + '</p');
    }
    else if(inserted_number == '.'){
            if(!insert_in_array.includes('.')){ // daca nu exista punctul

                if(insert_in_array.length == 0 && previous_number == 0) 
                {
                    
                    insert_in_array.push(previous_number,inserted_number);
                    previous_number = previous_number + inserted_number;
                   
                } else if(validation_p_n == undefined && previous_number == 0 && insert_in_array.length == 1){
                    insert_in_array.push(0);
                    insert_in_array.push(inserted_number);
                    previous_number = first_number + inserted_number;
                    if(insert_in_array[0] == '+'){
                        insert_in_array.shift();}
                    
                } else if (validation_p_n == true){
                    insert_in_array.push(inserted_number);
                    previous_number = last_number + inserted_number;
                  
                } else if(validation_p_n == undefined ) {
                    insert_in_array.push(inserted_number);
                    previous_number = first_number + inserted_number;
                    if(insert_in_array[0] == '+'){
                        insert_in_array.shift();}
                    

                }
            } else {
                    
                    return;
            }
               
    }
    else 
    {

            if(previous_number.length > 15){
                    let new_number = "eroare ";
                    jQuery('.display_number').html('<p>'+ new_number + '</p');
                }
                else {
                    let new_number = previous_number + inserted_number;
                    previous_number = new_number; // FOARTE IMPORTANT !! => AICI ESTE VALOAREA PE CA O VOM FOLOSI IN CALCUL
                    insert_in_array.push(inserted_number); // VARIABILA PENTRU AFISAREA FORMATATA
                    //afisare();
        }   
    }   
}

function afisare(){

    switch (insert_in_array.join('') == 'Infinity') {
        case true:
            var new_number = 'Eroare - nu se poate calcula';
            return new_number;
    }

    switch (insert_in_array.includes(".")) {
        case true:
            var new_number = insert_in_array.join('');
            return new_number;
            
    }
    switch (insert_in_array.includes("-")){
        case true:
            var semn = insert_in_array.shift();
            //var new_number = insert_in_array.shift();
    }

    switch (insert_in_array.includes("+")){
        case true:
            var semn2 = insert_in_array.shift();
            //var new_number = insert_in_array.shift();
    }

    switch (insert_in_array.length) {
            case 0:
                if(semn !== undefined){
                    insert_in_array.unshift(semn);
                    return insert_in_array;
                } else if(semn2 !== undefined) {
                    insert_in_array.unshift(semn2);
                    return insert_in_array;
                } else {
                    var new_number = 0;
                    return new_number;
                }


                //var new_number = 0;
                //return new_number;
  
            case 1:
                if(semn !== undefined){
                    insert_in_array.unshift(semn);
                    return insert_in_array.join('');
                } else {
                    var new_number = insert_in_array.join('');
                    return new_number;
                }
            
                //var new_number = insert_in_array.join('');
                //return new_number;
            case 2:
                if(semn !== undefined){
                    insert_in_array.unshift(semn);
                    return insert_in_array.join('');
                } else {
                    var new_number = insert_in_array.join('');
                    return new_number;
                }

                //var new_number = insert_in_array.join('');
                //return new_number;

            case 3:
                if(semn !== undefined){
                    insert_in_array.unshift(semn);
                    return insert_in_array.join('');
                } else {
                    var new_number = insert_in_array.join('');
                    return new_number;
                }
                
                //var new_number = insert_in_array.join('');
                //return new_number;

            case 4: // mod de afisare: X,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,1).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,1).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }

               // var new_number = insert_in_array.slice(0,1).join('') + ',' + insert_in_array.slice(-3).join('');
               // return new_number;

            case 5: // mod de afisare: XX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,2).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,2).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }

               //  var new_number = insert_in_array.slice(0,2).join('') + ',' + insert_in_array.slice(-3).join('');
               // return new_number;
            
            case 6: // mod de afisare: XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,3).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,3).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }
                
                // var new_number = insert_in_array.slice(0,3).join('') + ',' + insert_in_array.slice(-3).join('');
                // return new_number;

            case 7: // mod de afisare: X,XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,1).join('') + ',' + insert_in_array.slice(1,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,1).join('') + ',' + insert_in_array.slice(1,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }

                // var new_number = insert_in_array.slice(0,1).join('') + ',' + insert_in_array.slice(1,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                // return new_number;

            case 8: // mod de afisare: XX,XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,2).join('') + ',' + insert_in_array.slice(2,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,2).join('') + ',' + insert_in_array.slice(2,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }

                // var new_number = insert_in_array.slice(0,2).join('') + ',' + insert_in_array.slice(2,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                // return new_number;

            case 9: // mod de afisare: XXX,XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,3).join('') + ',' + insert_in_array.slice(3,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,3).join('') + ',' + insert_in_array.slice(3,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }

                // var new_number = insert_in_array.slice(0,3).join('') + ',' + insert_in_array.slice(3,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                // return new_number;

            case 10: // mod de afisare: X,XXX,XXX,XXX
            if(semn !== undefined){
                new_number = semn + insert_in_array.slice(0,-9).join('') + ',' + insert_in_array.slice(1,-6).join('') + ',' + insert_in_array.slice(4,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                insert_in_array.unshift(semn);
                return new_number;
            } else {
                var new_number = insert_in_array.slice(0,-9).join('') + ',' + insert_in_array.slice(1,-6).join('') + ',' + insert_in_array.slice(4,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                return new_number;
            }
            
                // var new_number = insert_in_array.slice(0,-9).join('') + ',' + insert_in_array.slice(1,-6).join('') + ',' + insert_in_array.slice(4,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                // return new_number;

            case 11: // mod de afisare: XX,XXX,XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,-9).join('') + ',' + insert_in_array.slice(2,-6).join('') + ',' + insert_in_array.slice(5,-3).join('')+ ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,-9).join('') + ',' + insert_in_array.slice(2,-6).join('') + ',' + insert_in_array.slice(5,-3).join('')+ ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }
                //var new_number = insert_in_array.slice(0,-9).join('') + ',' + insert_in_array.slice(2,-6).join('') + ',' + insert_in_array.slice(5,-3).join('')+ ',' + insert_in_array.slice(-3).join('');
               //return new_number;

            case 12: // mod de afisare: XXX,XXX,XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,-9).join('') + ',' + insert_in_array.slice(3,-6).join('') + ','+ insert_in_array.slice(6,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,-9).join('') + ',' + insert_in_array.slice(3,-6).join('') + ','+ insert_in_array.slice(6,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }
            
            //var new_number = insert_in_array.slice(0,-9).join('') + ',' + insert_in_array.slice(3,-6).join('') + ','+ insert_in_array.slice(6,-3).join('') + ',' + insert_in_array.slice(-3).join('');
            //return new_number;

            case 13: // mod de afisare: X,XXX,XXX,XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,-12).join('') + ',' + insert_in_array.slice(1,-9).join('') + ',' + insert_in_array.slice(4,-6).join('')+ ',' + insert_in_array.slice(7,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,-12).join('') + ',' + insert_in_array.slice(1,-9).join('') + ',' + insert_in_array.slice(4,-6).join('')+ ',' + insert_in_array.slice(7,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }
                //var new_number = insert_in_array.slice(0,-12).join('') + ',' + insert_in_array.slice(1,-9).join('') + ',' + insert_in_array.slice(4,-6).join('')+ ',' + insert_in_array.slice(7,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                //return new_number;

            case 14: // mod de afisare: XX,XXX,XXX,XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,-12).join('') + ',' + insert_in_array.slice(2,-9).join('') + ',' + insert_in_array.slice(5,-6).join('') + ',' + insert_in_array.slice(8,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,-12).join('') + ',' + insert_in_array.slice(2,-9).join('') + ',' + insert_in_array.slice(5,-6).join('') + ',' + insert_in_array.slice(8,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }
        
                //var new_number = insert_in_array.slice(0,-12).join('') + ',' + insert_in_array.slice(2,-9).join('') + ',' + insert_in_array.slice(5,-6).join('') + ',' + insert_in_array.slice(8,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                //return new_number;

            case 15: // mod de afisare: XXX,XXX,XXX,XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,-12).join('') + ',' + insert_in_array.slice(3,-9).join('') +',' + insert_in_array.slice(6,-6).join('') + ',' + insert_in_array.slice(9,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,-12).join('') + ',' + insert_in_array.slice(3,-9).join('') +',' + insert_in_array.slice(6,-6).join('') + ',' + insert_in_array.slice(9,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }
            
                //var new_number = insert_in_array.slice(0,-12).join('') + ',' + insert_in_array.slice(3,-9).join('') +',' + insert_in_array.slice(6,-6).join('') + ',' + insert_in_array.slice(9,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                //return new_number;

            case 16: // mod de afisare: X,XXX,XXX,XXX,XXX,XXX
                if(semn !== undefined){
                    new_number = semn + insert_in_array.slice(0,-15).join('') + ',' + insert_in_array.slice(1,-12).join('') +',' + insert_in_array.slice(4,-9).join('') + ',' + insert_in_array.slice(7,-6).join('') + ',' + insert_in_array.slice(10,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    insert_in_array.unshift(semn);
                    return new_number;
                } else {
                    var new_number = insert_in_array.slice(0,-15).join('') + ',' + insert_in_array.slice(1,-12).join('') +',' + insert_in_array.slice(4,-9).join('') + ',' + insert_in_array.slice(7,-6).join('') + ',' + insert_in_array.slice(10,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                    return new_number;
                }
                //var new_number = insert_in_array.slice(0,-15).join('') + ',' + insert_in_array.slice(1,-12).join('') + ',' + insert_in_array.slice(4,-9).join('') +',' + insert_in_array.slice(7,-6).join('') + ',' + insert_in_array.slice(10,-3).join('') + ',' + insert_in_array.slice(-3).join('');
                //return new_number;

            case 17: // mod de afisare: XX,XXX,XXX,XXX,XXX,XXX
                var new_number = 'numar prea mare';
                return new_number;

        }
}

function calculare(first_number, last_number, operator){
    if (operator in operators){
        return operators[operator](first_number, last_number);
    }
}

function verificare_zecimale(){
    var verificare_zecimale_first_number = [];
    var verificare_zecimale_last_number = [];

    for (i=0; i < String(first_number).length; i++){
        //insert_in_array = Array.from(String(calcul))[i];
        verificare_zecimale_first_number[i] = Array.from(String(first_number))[i];
    }

    for (i=0; i < String(last_number).length; i++){
        //insert_in_array = Array.from(String(calcul))[i];
        verificare_zecimale_last_number[i] = Array.from(String(last_number))[i];
    }

    if(verificare_zecimale_first_number.includes('.')){
        var v_z_f_n = verificare_zecimale_first_number.join('')
        //verificare_zecimale_first_number = verificare_zecimale_first_number[1];
        var v_z_f_n = v_z_f_n.split('.');
        var vzfn_lenght = v_z_f_n[1].length;

    } else {
        vzfn_lenght = 0;
       
    }

    if(verificare_zecimale_last_number.includes('.')){
        var v_z_l_n = verificare_zecimale_last_number.join('')
        //verificare_zecimale_first_number = verificare_zecimale_first_number[1];
        var v_z_l_n = v_z_l_n.split('.');
        var vzln_lenght = v_z_l_n[1].length;
  
    } else {
        vzln_lenght = 0;
       
    }

    if(vzfn_lenght > vzln_lenght){
       
        nr_cu_zecimale = nr_cu_zecimale ** vzfn_lenght;

;
    } else if(vzln_lenght > vzfn_lenght){
      
        nr_cu_zecimale = nr_cu_zecimale ** vzln_lenght;
      
    } else if (vzfn_lenght == vzln_lenght){
        nr_cu_zecimale = nr_cu_zecimale ** vzln_lenght;

    }


    
    
}

function afisare_istoric() {

    // daca array-ul are 0 elemente => nu facem nimic
    if(history_op.length == 0){
        jQuery('.history_last_operation').css('display','block');
        
    }
    // daca array-ul are 1 element => il afisam automat in istoric
    else if(history_op.length == 1){
        jQuery('.history_last_operation').css('display','block');
        jQuery('.history_last_operation').html(history_op);
       
    }
    // daca array-ul are mai mult de 1 element => facem loop prin array
    else if (history_op.length > 1){
        jQuery('.history_last_operation').html(history_op[0]);
        history_op2 = history_op.slice(1);
        array_1 = history1.slice(1,-1);
        if (counter > 5) {
            for(i=1; i < 6; i++){
            
            jQuery('.'+i).html(array_1.at(counter2));
            
            counter2 = Number(counter2 - 1);
            }
            history1.pop();
            counter2 = 4;

        } else {
        jQuery('.history_other_operation').css('display','block');
        for(i=0; i < history_op2.length; i++){
            jQuery('.history_other_operation').prepend('<p class ='+ counter + '>' + history_op2[i] + '</p>');
            history_op.pop();
            counter = counter + 1;
        }
    }
       
   
      
    }
    
    
    
}

function factorial(n){
  let answer = 1;
  if (n == 0 || n == 1){
    return answer;
  }else{
    for(var i = n; i >= 1; i--){
      answer = answer * i;
    }
    return answer;
  }  
}