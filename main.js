var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var addBtn = document.getElementById('addBtn');
var bookmarkContainer ;

if(localStorage.getItem('bookmarkContainer') == null){
    bookmarkContainer = [];
}
else{
    bookmarkContainer = JSON.parse(localStorage.getItem('bookmarkContainer'))
    displayData();
}


addBtn.onclick = function(){

    if(!siteName.value || !siteUrl.value){
        alert('please fill a form');
        return;
    }

    addOneBookmark();
    emptyData();
}

function addOneBookmark(){
    var bookmark = {
        name:siteName.value,
        url:siteUrl.value
    };

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!bookmark.url.match(regex)){
    alert("doesn't match");
    return false
    }

    bookmarkContainer.push(bookmark);

    localStorage.setItem("bookmarkContainer",JSON.stringify(bookmarkContainer))
    displayData();
}


function displayData(){
    var trs = '';
    
    for(let i =0;i<bookmarkContainer.length;i++){
        
        trs+= '<div class="well">'+
        '<h3>'+bookmarkContainer[i].name+
        '<a class ="btn btn-success" target ="_blank" href="'+  bookmarkContainer[i].url +'">Visit</a>' +
        '<a onclick = "deleteBookmark('+ i +')" href="index.html" class = "btn btn-danger">Delete</a>' +
        '</h3>'+
        '</div>';

        document.getElementById('bookmarksResults').innerHTML = trs;
    }
}

function deleteBookmark(id){
    bookmarkContainer.splice(id,1);
    localStorage.setItem("bookmarkContainer",JSON.stringify(bookmarkContainer))
    displayData();
}


function emptyData()
{
    var inputs = document.getElementsByClassName('form-control')
    for(let i =0;i<inputs.length;i++)
        inputs[i].value= ''
}


