const list = document.querySelector('ul');
const form = document.querySelector('form');

const addNote = (note, id) => {
    let time = note.created_at.toDate();
    let html =
        `
        <li data-id="${id}">
            <div class="title search">${note.title}</div>
            <div class="body">${note.body}</div>
            <div class="time">${time}</div>
            <div class="imp" id="imp">${note.important}</div>
            <button class="btn btn-danger btn-sm my-2 delete">Delete</button>
            <button class="btn btn-success btn-sm my-2 edit">Edit</button>
        </li>
    `

        ;

    list.innerHTML += html;
}



db.collection('notes').get().then(snapshot => {

    snapshot.docs.forEach(doc => {
        addNote(doc.data(), doc.id);
    });
}).catch((err) => {
    console.log(err);
});

form.addEventListener('submit', e => {
    e.preventDefault();

    const now = new Date();
    const note = {
        title: form.title.value,
        body: form.body.value,
        created_at: firebase.firestore.Timestamp.fromDate(now),
        important: document.querySelector('#imp').checked
    };

    db.collection('notes').add(note).then(() => {
        console.log('note added');
    }).catch(err => {
        console.log(err);
    });

});

    // console.log(document.querySelectorAll('.delete')
    
list.addEventListener('click', e => {
     if (e.target.tagName === 'BUTTON') {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('notes').doc(id).delete().then(() => {
            console.log('note deleted');
        });
     }
    
});

// edit attempt

/* list.addEventListener('click', r => {
if (querySelector('.edit')) {
db.collection('notes').doc('data-id').update({
    title: form.title.value,
    body: form.body.value,
    created_at: firebase.firestore.Timestamp.fromDate(now),
    important: document.querySelector('#imp').checked

})
}
}); */

var input = document.querySelector('input');


input.addEventListener("keyup", () => {
    let filter = input.value.toUpperCase();

    console.log(filter);

    let lis = document.querySelectorAll('.search');

    lis.forEach((name)=>{
        if (name.innerText.toUpperCase().indexOf(filter) >=0) {
            name.parentElement.style.display = 'list-item'; 
        } else{
            name.parentElement.style.display = 'none'; 
        }
            
    })
})

// adding class if important is true/checked/on

//var y = document.querySelector('#imp');
/* var v = document.querySelector("#imp"); 
v.classList.add("imp-bg"); 

var x = document.querySelector('#imp').value;
console.log(x);
if (x.value = 'on'){
    document.querySelector('#imp').classList.add("imp-bg");

alert('checked');
}
 */