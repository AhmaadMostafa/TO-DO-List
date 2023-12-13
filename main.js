let input = document.getElementById('input');
let submit = document.getElementById('submit');
let lists = document.querySelector('.lists');
let delete_all = document.getElementById('del-all');

let arr = [];

if(localStorage.getItem("lists")){
    arr = JSON.parse(localStorage.getItem("lists"));
}
showData();

submit.onclick = function (){
    if(input.value === ''){
        alert('You Must Write Something');
    }
    else{
        add_list_to_arr(input.value);
        input.value = '';
    }
}

function add_list_to_arr(text){
    let list = {
        id: Date.now(),
        title: text,
    };
    arr.push(list);
    add_arr_to_page(arr);
    SaveData();
}
function SaveData(){
    window.localStorage.setItem("lists" , JSON.stringify(arr));
}

function add_arr_to_page(arr){
    lists.innerHTML = '';
    arr.forEach(element => {
        let li = document.createElement('li');
        li.className = "unchecked";
        li.innerHTML = element.title;
        li.setAttribute("data-id" ,element.id);
        let span = document.createElement('span');
        span.className = 'del'
        span.innerHTML = 'Delete';
        li.appendChild(span);
        lists.appendChild(li);
    });
}

lists.addEventListener("click", function(e){
    delete_List(e.target.parentElement.getAttribute("data-id"));
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
    }
    else if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        SaveData();
    }
        
    });
function delete_List(ID){
    arr = arr.filter((list) => list.id != ID);
}
function showData(){
    if(window.localStorage.getItem("lists")){
        add_arr_to_page(JSON.parse(window.localStorage.getItem("lists")));
    }
}
delete_all.onclick = function(){
    if(arr.length === 0){
        alert('The List Is Empty');
    }
    else{
        arr = [];
        localStorage.clear();
        lists.innerHTML = '';
    }
}
