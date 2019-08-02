// setup an "add a tag" link
jQuery(document).ready(function() {
    $('div.collections').each(function(index) {
        addFormToCollection($('div.collections')[index]);
        if ($($('div.collections')[index]).data('index') > 0) {
            addRemoveBtn($($('div.collections')[index]).find('.form-group').first());
        }
    })
});

function addFormToCollection(collectionHolder) {
    var btnType = $(collectionHolder).data('btn-type') || 'btn btn-default';
    if ($(collectionHolder).data('btn-location-id')) {
        var addTagButton = $('#' + $(collectionHolder).data('btn-location-id'));
    } else if ($(collectionHolder).data('btn-location-in-class')) {
        var addTagButton = $(collectionHolder).find($('.' + $(collectionHolder).data('btn-location-in-class')));
    } else {
        var text = $(collectionHolder).data('btn-text') ? $(collectionHolder).data('btn-text') : 'Ajouter';
        var addTagButton = $('<div class="' + btnType + '"> ' + text + '</div>');
        var addButton = $(addTagButton);

        $(collectionHolder).append(addButton);
    }

    $(collectionHolder).data('index', $(collectionHolder).find(':input').length);

    addTagButton.on('click', function(e) {
        addTagForm(collectionHolder);
    });
}

// Add a remove btn
function addRemoveBtn(element) {
    if ($(element).find('.remove-line').length == 0) {
        var removeFormBtn = $('<div class="btn btn-danger remove-line">Supprimer</div>');
        $(element).append(removeFormBtn);
    }

}

function addTagForm(collectionHolder) {
    // Get the data-prototype explained earlier
    var prototype = $(collectionHolder).data('prototype');

    // get the new index
    var index = $(collectionHolder).data('index');

    var newForm = prototype;
    // You need this only if you didn't set 'label' => false in your tags field in TaskType
    // Replace '__name__label__' in the prototype's HTML to
    // instead be a number based on how many items we have
    // newForm = newForm.replace(/__name__label__/g, index);

    // Replace '__name__' in the prototype's HTML to
    // instead be a number based on how many items we have
    newForm = newForm.replace(/__name__/g, index);

    // increase the index with one for the next item
    $(collectionHolder).data('index', index + 1);

    // Display the form in the page in an li, before the "Add a tag" link li
    var newForm = $('<div class="new-entity"></div>').append(newForm);

    $(collectionHolder).append($(newForm));

    if (!!$(newForm).find('div.collections').length) {
        $(newForm).find('div.collections').each(function(index) {
            addFormToCollection($(newForm).find('div.collections')[index]);
        })
    }

    addRemoveBtn($(newForm).find('.form-group').first());
}

$('body').on('click', '.remove-line', function() {
    $(this).parents('.form-group').first().remove();
});
