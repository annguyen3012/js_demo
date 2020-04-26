const instance = axios.create({
    baseURL: 'http://localhost:3100',
});
let tableBody = $('#member-list tbody')

instance.get("/")
.then(response => {
    let data = response.data.members
    render(data)
})
.catch(err => console.log(err.message));

render = (members) => {
    members.map(function(member) {
        row = `<tr>
                <td>${member.id}</td>
                <td>${member.name}</td>
                <td>${member.age}</td>
                <td>
                    <button class="edit-button" data-id=${member.id}>Edit</button>
                    <button class="delete-button" data-id=${member.id}>Delete</button>
                </td>
            <tr>`;
        tableBody.append(row)
    });  
}

$('#form-add-member').submit(function(event) {
    event.preventDefault(); //prevent default action 
    // var form_data = $(this).serialize();
    param = {
        name: $('#fname').val(),
        age: $('#fage').val(),
    }
    path = $(this).attr("action");
    instance.post(path, param)
    .then(response => {
        tableBody.empty()
        let data = response.data.members
        render(data)
    })
    .catch(err => console.log(err.message));
});

$(document).on('click','.edit-button', function() {
    id = $(this).attr("data-id");
    pathEdit = `/member/${id}/edit`
    pathUpdate = `/member/${id}/update`
    instance.get(pathEdit)
    .then(response => {
        let member = response.data
        if (member === "") {
            alert("Can not find member!")
        } else {
            $('#fname-edit').val(member.name);
            $('#fage-edit').val(member.age);
            $('#form-edit-member').attr('action', pathUpdate);
            $('#form-edit-member').removeAttr('hidden');

        }
    })
    .catch(err => console.log(err.message));
});

$('#form-edit-member').submit(function(event) {
    event.preventDefault(); //prevent default action 
    // var form_data = $(this).serialize();
    param = {
        name: $('#fname-edit').val(),
        age: $('#fage-edit').val(),
    }
    path = $(this).attr("action");
    instance.put(path, param)
    .then(response => {
        tableBody.empty()
        let data = response.data.members
        render(data)
        $('#form-edit-member').attr("hidden",true);
    })
    .catch(err => console.log(err.message));
});

$(document).on('click','.delete-button', function() {
    if (confirm("Do you want to delete member?")) {
        id = $(this).attr("data-id");
        path = `/member/${id}`
    
        instance.delete(path)
        .then(response => {
            $(this).parent().parent().remove();
            alert(response.data.message);
        })
        .catch(err => console.log(err.message));
    }
});