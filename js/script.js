function Ignoruj (hodnota)
{
 var vystup = "";
 hodnota = '' + hodnota;
 
 cistka = hodnota.split(" ");

 for (i = 0; i<cistka.length; i++)
  vystup += cistka[i];  

 return vystup; 
}


function Test(form)
{
if (Ignoruj(form.GuestName.value) == "")
   {
    alert("Name field is empty!");
    go = false;
   }
   else
    if (Ignoruj(form.GuestEmail.value) == "")
       {
        alert("Email field is empty!");
        go = false;
       }
    else
       go = true;

return go;
}