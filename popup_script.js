var formHtml = [
    '<form class="form-inline auto-fill-form">',
        '<div class="form-group">',
            '<input name="host" class="form-control host-field" placeholder="Host...">',
        '</div>',
        '<div class="form-group">',
            '<input name="user" class="form-control" placeholder="User...">',
        '</div>',
        '<div class="form-group">',
            '<input name="password" type="password" class="form-control" placeholder="Password...">',
        '</div>',
        '<button class="btn btn-danger" title="Remove the row"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>',
    '</form>',
].join('');


function onAddClicked() {
    $('#form-container').append(formHtml);
}
function onRemoveClicked() {
    $(this).parents('.auto-fill-form').remove();
}
function onSaveClicked() {
    localStorage.setItem('credentials', JSON.stringify(collectCredentials()));
}
function collectCredentials() {
    let credentials = [];
    $('.auto-fill-form').each(function (i, obj) {
        let host = $(obj).find('[name=host]').val();
        let user = $(obj).find('[name=user]').val();
        let password = $(obj).find('[name=password]').val();
        if (host && user && password) {
            credentials.push({
                host: host,
                user: user,
                password: password
            });
        }
    });
    return credentials;
}
function fillCredentials(credentials) {
    credentials.forEach(onAddClicked);
    $('.auto-fill-form').each(function (i, obj) {
        $(obj).find('[name=host]').val(credentials[i].host);
        $(obj).find('[name=user]').val(credentials[i].user);
        $(obj).find('[name=password]').val(credentials[i].password);
    });
}

document.addEventListener('DOMContentLoaded', function (dcle) {
    fillCredentials(JSON.parse(localStorage.getItem('credentials')));
    $('#btnAdd').click(onAddClicked);
    $('#btnSave').click(onSaveClicked);
    $('body').on('click', '.btn-danger', onRemoveClicked);
});

