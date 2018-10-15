var formHtml = [
    '<form class="form-inline auto-fill-form">',
        '<div class="form-group">',
            '<input name="host" class="form-control form-control-sm host-field" placeholder="Host...">',
        '</div>',
        '<div class="form-group">',
            '<input name="user" class="form-control form-control-sm" placeholder="User...">',
        '</div>',
        '<div class="form-group">',
            '<input name="password" type="password" class="form-control form-control-sm" placeholder="Password...">',
        '</div>',
        '<button class="btn btn-danger btn-sm" title="Remove the row"><span class="oi oi-trash" aria-hidden="true"></span> Remove</button>',
    '</form>',
].join('');


function onAddClicked() {
    $('#form-container').append(formHtml);
}
function onRemoveClicked() {
    var form = $(this).parents('.auto-fill-form');
    form.remove();
}
function onSaveClicked() {
    localStorage.setItem('credentials', JSON.stringify(collectCredentials()));
    $.toast({
        text: "Changes were successfully saved!", // Text that is to be shown in the toast
        heading: 'Success', // Optional heading to be shown on the toast
        icon: 'success', // Type of toast icon
        showHideTransition: 'fade', // fade, slide or plain
        allowToastClose: true, // Boolean value true or false
        hideAfter: 2000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
        textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: true,  // Whether to show loader or not. True by default
        loaderBg: '#9EC600',  // Background color of the toast loader
        beforeShow: function () { }, // will be triggered before the toast is shown
        afterShown: function () { }, // will be triggered after the toat has been shown
        beforeHide: function () { }, // will be triggered before the toast gets hidden
        afterHidden: function () { }  // will be triggered after the toast has been hidden
    });
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

