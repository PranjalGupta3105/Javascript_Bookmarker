//listen for form submit
document.getElementById("myform").addEventListener('submit',savebookmark);//call the savebookmark function to begin after form submittion.

function savebookmark(e)//e is an event parameter that is used to avaid alert to appear again
{
  //Get Form values
  var siteName= document.getElementById('siteName').value;
  var siteUrl= document.getElementById('siteUrl').value;
  if(!validateform(siteName, siteUrl)){ //call made for the validation of the form for .com keyword if not the form shall alert the user else go with flow
    return false;
  }
  var bookmark = {  //convertion of the JS type values to JSON notation aka representation
    name: siteName,
    url: siteUrl
}

/*console.log(bookmark);
// Local Storage Functional Tests
//[1]. Storing the values into the local Storage
LocalStorage.setItem('test', 'hello world');
console.log(LocalStorage.getItem('test'));

//[2]. Removing the values from the local Storage
LocalStorage.removeItem('test');
console.log(LocalStorage.getItem('test'));
*/
if(localStorage.getItem('bookmarks') === null){ // if there's an array of name -bookmarks and is empty then go for if block
  //Init array
  var bookmarks = []; // declare bookmarks -- empty array
  //Add to array
  bookmarks.push(bookmark);
  //setting values to local Storage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));// convertion into JSON string notation and placing into localStorage
}else{
  //if the bookmarks named array isn't empty then
  //Get bookmarks from local Storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Add new bookmarks to the array
  bookmarks.push(bookmark);
  //re-set the complete array back to the local Storage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
// Clear form
document.getElementById('myForm').reset();
//Re-fetch bookmarks so as to display back the new set of the bookmarks on the user's screen.
fetchBookmarks();
//preventDefault() function avoid the default behaviour of the form to
//flash the text in console and vanish.
e.preventDefault();
}

function deleteBookmark(url){
  //console.log(url);
  //Get bookmarks from local Storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Itterate through each of the bookmarks
  for(var i =0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);// chop off the matched bookmark and move the indexing to the left
    }
  }
  //re-set back the local Storage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //Re-fetch bookmarks
  fetchBookmarks();
}
//Fetch bookmarks
function fetchBookmarks(){
  //Get Bookmarks from local Storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Get Output Id
  var bookmarksresults = document.getElementById('bookmarksResults');
  //Build Output
  bookmarksResults.innerHTML = ""
  for(var i=0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">'+
                                 '<h3>'+name+
                                 ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                 ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                 '</h3>'+
                                 '</div>';
    }

}

function validateform(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
      alert("Please use a valid url");
      return false;
    }
    return true;
}
