const itemInput = document.getElementById('item-input');
const addBtn = document.querySelector('.btn');
const itemList = document.getElementById('item-list');
const filterInput = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
let UpdateState = false;
localStorage.clear();
const localStorageItems = [];

function addItem(e) {
    e.preventDefault();
    addBtn.innerHTML = '<i class ="fa-solid fa-plus">Add item</i>';
    addBtn.style.backgroundColor = "#333";


    listItems = itemList.querySelectorAll("li");

    for(let i=0; i < listItems.length; i++){
        let item = listItems[i];
        if (itemInput.value === item.firstChild.textContent) {
            alert("This item already exists!");
            return false;
        }
    }


    if (itemInput.value !== ''){

        filterInput.style.display = 'block';
        clearBtn.style.display = 'block';
        li = document.createElement('li');
        li.appendChild(document.createTextNode(itemInput.value));
        itemList.appendChild(li);
        button = createButton('remove-item btn-link text-red');
        li.appendChild(button);
    }
    else{
        alert("Please Enter an Item")
    }

    function createButton(classes) {
        button = document.createElement('button');
        button.className = classes;
        icon = createIcon('fa-solid fa-xmark');
        button.appendChild(icon);
        return button;
    }
    
    function createIcon(classes) {
        icon = document.createElement("i");
        icon.className = classes;
        return icon;
    }

    localStorageItems.push(li.firstChild.textContent);

    localStorage.setItem('items', JSON.stringify(localStorageItems));
    
}


function deleteItem(e) {
    localStorage.clear();
    let localStorageUpdate = [];
    if(e.target){
        if(e.target.className === 'fa-solid fa-xmark') {
            const deleteTargetItem = e.target.parentElement.parentElement
            deleteTargetItem.remove();
            localStorageUpdate = localStorageItems.filter((it) =>
                it !== deleteTargetItem.firstChild.textContent
            );
            console.log(localStorageUpdate);
            localStorage.setItem("items", JSON.stringify(localStorageUpdate));
        }
        else{
            setStateToChange(e.target)
            if (UpdateState) {
                addBtn.addEventListener('click', () => {
                    e.target.remove();
                });
            }
        }       
    }
    cleanUI();
}



function clearAll(e) {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    cleanUI();
}

function cleanUI() {
    const listItems = itemList.querySelectorAll('li');
    if(listItems.length === 0) {
        filterInput.style.display = 'none';
        clearBtn.style.display = 'none';
    }else{
        filterInput.style.display = 'block';
        clearBtn.style.display = 'block';
    }
}

function filterItem(e) {
    text = e.target.value.toLowerCase();
    listItems = itemList.querySelectorAll('li');
    listItems.forEach((item) => {
        itemText = item.firstChild.textContent.toLowerCase();
        if(itemText.indexOf(text) !== -1) {
            item.style.display = 'flex';
        }
        else{
            item.style.display = 'none';
        }
    })

}

function setStateToChange(item) {
    UpdateState = true;


    item.style.color = "#ccc";  // or item.classList.add("update") which we have defined in CSS file

    itemList
        .querySelectorAll('li')
        .forEach((i) => {
            if(item != i)
            i.style.color = "#333";  // or item.classList.remove("update") which we have defined in CSS file
            }
        )

    addBtn.innerHTML = '<i class ="fa-solid fa-pen"> Update item </i>';
    addBtn.style.backgroundColor = "#3CB371";
    itemInput.value = item.textContent;

    console.log(item);

}

/* Now we want to actually pass the input (update) value to the list after submiting update */
 

// function updateItem (e) {

//     function updateState() {
//         addBtn.innerHTML = '<i class ="fa-solid fa-pen"> Update item</i></button>';
//         addBtn.style.backgroundColor = '#228B22';
//     }

//     listItems = itemList.querySelectorAll('li');
//     listItems.forEach ((item) => {
//         if (e.target.firstChild.textContent === item.firstChild.textContent) {
//             item.firstChild.textContent = prompt("Update item")
//         }
//     })

//     updateState();
// }

clearBtn.addEventListener('click', clearAll)

itemList.addEventListener('click', deleteItem)

addBtn.addEventListener('click', addItem)

filterInput.addEventListener('input', filterItem)

itemList.addEventListener('click', setStateToChange)

if (UpdateState) {
    addBtn.addEventListener('click', deleteItem);
}