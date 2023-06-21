const navItem = document.querySelectorAll('.nav-item');
const tabButton = document.querySelectorAll('.tab-button');
const contractTables = document.querySelectorAll('.contract-table');

for (let id = 0; id < tabButton.length; id++) {
    const element = tabButton[id];
    
    tabButton[id].addEventListener('click', () =>{
        navItem.forEach(element => {
            element.classList.remove('active');
        });
        contractTables.forEach(element => {
            element.classList.add('hide');
        })
        navItem[id].classList.toggle('active');
        contractTables[id].classList.remove('hide');
        
    })
}

