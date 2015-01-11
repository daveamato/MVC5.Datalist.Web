﻿var testData, testDatalist, testInput, hiddenInput, openSpan, filter1, filter2;

QUnit.testStart(function (details) {
    openSpan = $('#test-data > .input-group > .datalist-open-span');
    testInput = $('#TestDatalist');
    testDatalist = $('#Datalist');
    hiddenInput = $('#Test');
    filter1 = $('#Filter1');
    filter2 = $('#Filter2');

    if (details.name == 'Datalist init on document ready') {
        return;
    }

    testInput
        .attr('data-datalist-url', 'http://localhost:9140/Datalist/Default')
        .attr('data-datalist-filters', 'Filter1,Filter2')
        .attr('data-datalist-dialog-title', 'TestTitle')
        .attr('data-datalist-sort-column', 'FirstName')
        .attr('class', 'form-control datalist-input')
        .attr('data-datalist-records-per-page', 30)
        .attr('data-datalist-hidden-input', 'Test')
        .attr('data-datalist-sort-order', 'Desc')
        .attr('data-datalist-term', 'test')
        .attr('data-datalist-page', '0');

    testData = {
        Columns:
            [
                {
                    Key: 'FirstName', Header: 'FirstName', CssClass: ''
                },
                {
                    Key: 'LastName', Header: 'LastName', CssClass: ''
                },
                {
                    Key: 'DateOfBirth', Header: 'DateOfBirth', CssClass: ''
                },
                {
                    Key: 'Account.LoginName', Header: 'Login name', CssClass: ''
                }
            ],
        Rows:
            [
                {
                    'DatalistIdKey': '1',
                    'DatalistAcKey': 'Tom',
                    'FirstName': 'Tom',
                    'LastName': 'Jecks',
                    'DateOfBirth': '1998-10-10',
                    'Account.LoginName': 'Tommy'
                },
                {
                    'DatalistIdKey': '5',
                    'DatalistAcKey': 'Pet',
                    'FirstName': 'Pet',
                    'LastName': 'Quacks',
                    'DateOfBirth': '2000-09-18',
                    'Account.LoginName': ''
                },
                {
                    'DatalistIdKey': '2',
                    'DatalistAcKey': 'Len',
                    'FirstName': 'Len',
                    'LastName': '',
                    'DateOfBirth': '1990-01-01',
                    'Account.LoginName': 'Lennox'
                },
                {
                    'DatalistIdKey': '3',
                    'DatalistAcKey': 'Kim',
                    'FirstName': 'Kim',
                    'LastName': '',
                    'DateOfBirth': '1950-05-02',
                    'Account.LoginName': ''
                },
                {
                    'DatalistIdKey': '4',
                    'DatalistAcKey': 'Dred',
                    'FirstName': 'Dred',
                    'LastName': 'Insky',
                    'DateOfBirth': '0001-01-01',
                    'Account.LoginName': ''
                }
            ],
        FilteredRecords: 5
    };
});
QUnit.testDone(function (details) {
    testInput.val('').clone().appendTo('#test-data > .input-group');
    testInput.remove();

    hiddenInput.val('').clone().appendTo('#test-data > .input-group');
    hiddenInput.remove();

    openSpan.clone().appendTo('#test-data > .input-group');
    openSpan.remove();

    filter1.val('').clone().appendTo('#test-data');
    filter1.remove();

    filter2.val('').clone().appendTo('#test-data');
    filter2.remove();

    testDatalist.find('.datalist-search-input').val('');
});

test('Datalist init on document ready', 1, function () {
    ok(testInput.data('mvc-datalist'));
});
test('Datalist language init', 3, function () {
    equal($.fn.datalist.lang.Error, 'Error while retrieving records');
    equal($.fn.datalist.lang.NoDataFound, 'No data found');
    equal($.fn.datalist.lang.Search, 'Search...');
});
test('Datalist spinner init', 3, function () {
    var datalistSpinner = $('.datalist-items-per-page');
    ok(datalistSpinner.hasClass('ui-spinner-input'));
    equal(datalistSpinner.spinner('option', 'min'), 1);
    equal(datalistSpinner.spinner('option', 'max'), 99);
});
test('Datalist dialog init', 7, function () {
    ok(testDatalist.hasClass('ui-dialog-content'));
    equal(testDatalist.dialog('option', 'autoOpen'), false);
    equal(testDatalist.dialog('option', 'minHeight'), 210);
    equal(testDatalist.dialog('option', 'height'), 'auto');
    equal(testDatalist.dialog('option', 'minWidth'), 455);
    equal(testDatalist.dialog('option', 'width'), 'auto');
    equal(testDatalist.dialog('option', 'modal'), true);
});

test('Does not create mvc-datalist on non datalist input', 1, function () {
    equal(filter1.datalist().hasClass('mvc-datalist'), false);
});

test('Initializes options', 12, function () {
    testInput.datalist();

    ok(testInput.hasClass('mvc-datalist'));
    equal(testInput.datalist('option', 'page'), 0);
    equal(testInput.datalist('option', 'term'), 'test');
    equal(testInput.datalist('option', 'select'), null);
    equal(testInput.datalist('option', 'sortOrder'), 'Desc');
    equal(testInput.datalist('option', 'title'), 'TestTitle');
    equal(testInput.datalist('option', 'filterChange'), null);
    equal(testInput.datalist('option', 'recordsPerPage'), 30);
    equal(testInput.datalist('option', 'sortColumn'), 'FirstName');
    equal(testInput.datalist('option', 'hiddenElement'), hiddenInput[0]);
    equal(testInput.datalist('option', 'url'), 'http://localhost:9140/Datalist/Default');
    equal(testInput.datalist('option', 'filters').join(), ['Filter1', 'Filter2'].join());
});

test('Initializes filters', 2, function () {
    testInput.datalist().data('mvc-datalist')._select = function (data) {
        equal(data, null);
    };

    filter1.change();
    filter2.change();
});
test('Initializes filters with events', 10, function () {
    var filters = [filter1, filter2];
    var iteration = 0;

    testInput.datalist({
        filterChange: function (e, element, hiddenElement, filter) {
            equal(filter, filters[iteration++][0]);
            equal(hiddenElement, hiddenInput[0]);
            equal(element, testInput[0]);
            ok(e);
        }
    });

    testInput.data('mvc-datalist')._select = function (data) {
        equal(data, null);
    };

    filters[0].change();
    filters[1].change();
});
test('Initializes custom filter change', 0, function () {
    testInput.datalist({
        filterChange: function (e, element, hiddenElement, fitler) {
            e.preventDefault();
        }
    });

    testInput.data('mvc-datalist')._select = function (data) {
        ok(false);
    };

    filter1.change();
    filter2.change();
});

test('Initializes autocomplete', 2, function () {
    ok(testInput.datalist().hasClass('ui-autocomplete-input'));
    equal(testInput.autocomplete('option', 'minLength'), 1);
});
test('Initializes autocomplete select', 2, function () {
    testInput.datalist().data('mvc-datalist')._select = function (data) {
        equal(data.DatalistIdKey, 'Test2');
        equal(data.DatalistAcKey, 'Test3');
    };

    testInput.data('ui-autocomplete')._trigger('select', 'autocompleteselect', {
        item: {
            item: {
                DatalistIdKey: 'Test2',
                DatalistAcKey: 'Test3'
            }
        }
    });
});
test('Initializes keyup on autocomplete', 1, function () {
    testInput.datalist().data('mvc-datalist')._select = function (data) {
        equal(data, null);
    };

    testInput.keyup();
});
test('Removes all preceding elements', 1, function () {
    equal(testInput.datalist().prevAll().length, 0);
});

test('Initializes datalist open span', 16, function () {
    testInput.datalist().data('mvc-datalist')._update = function (datalist) {
        equal(datalist[0], testDatalist[0]);
    };
    testInput.data('mvc-datalist')._limitTo = function (value, min, max) {
        equal(value, 30);
        equal(max, 99);
        equal(min, 1);
        return value;
    };

    openSpan.click();

    stop();
    setTimeout(function () {
        start();
        testDatalist.dialog('close');

        testInput.data('mvc-datalist')._limitTo = function (value, min, max) {
            equal(value, 2);
            equal(max, 99);
            equal(min, 1);
            return value;
        };

        $('.datalist-items-per-page').val(2).data('ui-spinner')._trigger('change', 'spinnerchange');
        equal(testDatalist.dialog('option', 'title'), testInput.datalist('option', 'title'));
        equal($('.datalist-search-input').attr('placeholder'), $.fn.datalist.lang.Search);
        equal($('.datalist-error-span').html(), $.fn.datalist.lang.Error);
        equal(testInput.datalist('option', 'recordsPerPage'), 2);
        equal(testInput.datalist('option', 'page'), 0);

        $('.datalist-search-input').val('test2').keyup();
        stop();
        setTimeout(function () {
            start();
            equal(testInput.datalist('option', 'term'), 'test2');
            equal(testInput.datalist('option', 'page'), 0);
        }, 500);
    }, 200);
});

test('Forms autocomplete url', 1, function () {
    testInput.attr('data-datalist-filters', '').datalist();
    var expected = testInput.datalist('option', 'url') +
        '?SearchTerm=test' +
        '&RecordsPerPage=20' +
        '&SortOrder=Asc' +
        '&Page=0';

    equal(testInput.data('mvc-datalist')._formAutocompleteUrl('test'), expected);
});
test('Forms autocomplete url with filters', 1, function () {
    filter1.val('Filter1');
    filter2.val('Filter2');
    testInput.datalist();

    var expected = testInput.datalist('option', 'url') +
        '?SearchTerm=test' +
        '&RecordsPerPage=20' +
        '&SortOrder=Asc' +
        '&Page=0' +
        '&Filter1=Filter1' +
        '&Filter2=Filter2';

    equal(testInput.data('mvc-datalist')._formAutocompleteUrl('test'), expected);
});

test('Forms datalist url', 1, function () {
    testInput.attr('data-datalist-filters', '').datalist();
    var expected = testInput.datalist('option', 'url') +
        '?SearchTerm=test' +
        '&RecordsPerPage=' + testInput.datalist('option', 'recordsPerPage') +
        '&SortColumn=' + testInput.datalist('option', 'sortColumn') +
        '&SortOrder=' + testInput.datalist('option', 'sortOrder') +
        '&Page=' + testInput.datalist('option', 'page');

    equal(testInput.data('mvc-datalist')._formDatalistUrl('test'), expected);
});
test('Forms datalist url with filters', 1, function () {
    filter1.val('Filter1');
    filter2.val('Filter2');
    testInput.datalist();

    var expected = testInput.datalist('option', 'url') +
        '?SearchTerm=test' +
        '&RecordsPerPage=' + testInput.datalist('option', 'recordsPerPage') +
        '&SortColumn=' + testInput.datalist('option', 'sortColumn') +
        '&SortOrder=' + testInput.datalist('option', 'sortOrder') +
        '&Page=' + testInput.datalist('option', 'page') +
        '&Filter1=Filter1' +
        '&Filter2=Filter2';

    equal(testInput.data('mvc-datalist')._formDatalistUrl('test'), expected);
});

test('Forms empty additional filter query', 1, function () {
    testInput.attr('data-datalist-filters', '').datalist();
    equal(testInput.data('mvc-datalist')._formFiltersQuery(), '');
});
test('Forms additional filter query', 1, function () {
    filter1.val('Test1');
    filter2.val('Test2');
    testInput.datalist();
    equal(testInput.data('mvc-datalist')._formFiltersQuery(), '&Filter1=Test1&Filter2=Test2');
});

test('Default selects', 2, function () {
    data = { DatalistIdKey: 'Test1', DatalistAcKey: 'Test2' };
    testInput.datalist().data('mvc-datalist')._defaultSelect(data);

    equal(hiddenInput.val(), data.DatalistIdKey);
    equal(testInput.val(), data.DatalistAcKey);
});
test('Default select clears values', 2, function () {
    testInput.datalist();
    hiddenInput.val(1);
    testInput.val(1);

    testInput.datalist().data('mvc-datalist')._defaultSelect(null);

    equal(hiddenInput.val(), '');
    equal(testInput.val(), '');
});

asyncTest('Does not call select on load', 0, function () {
    testInput.datalist({
        select: function () {
            ok(false);
        }
    });

    setTimeout(function () {
        start();
    }, 200);

    testInput.datalist('destroy');

    stop();
    hiddenInput.val(0);
    testInput.datalist({
        select: function () {
            ok(false);
        }
    });

    setTimeout(function () {
        start();
    }, 200);
});
asyncTest('Calls select on load', 1, function () {
    hiddenInput.val(1);
    testInput.datalist({
        select: function () {
            ok(true);
        }
    });

    setTimeout(function () {
        start();
    }, 200);
});

test('Calls select and default select', 6, function () {
    var selectedData = { DatalistIdKey: 'Test' };
    testInput.datalist({
        select: function (e, element, hiddenElement, data) {
            equal(hiddenElement, hiddenInput[0]);
            equal(element, testInput[0]);
            equal(data, selectedData);
            ok(e);
        }
    });

    testInput.data('mvc-datalist')._defaultSelect = function (data) {
        equal(data, selectedData);
    };

    testInput.data('mvc-datalist')._select(selectedData);

    testInput.datalist('destroy').datalist();
    testInput.data('mvc-datalist')._defaultSelect = function (data) {
        equal(data, selectedData);
    };

    testInput.data('mvc-datalist')._select(selectedData);
});
test('Default select prevented', 0, function () {
    testInput.datalist({
        select: function (e) {
            e.preventDefault();
        }
    });

    testInput.data('mvc-datalist')._defaultSelect = function () {
        ok(false);
    };

    testInput.data('mvc-datalist')._select();
});

test('Update calls', 46, function () {
    testInput
        .attr('data-datalist-sort-column', 'FirstName')
        .attr('data-datalist-term', '')
        .datalist();

    var mvcDatalist = testInput.data('mvc-datalist');
    var formDatalistUrl = mvcDatalist._formDatalistUrl;

    mvcDatalist._updateHeader = function (datalist, columns) {
        $.each(columns, function (index, column) {
            equal(column.Key, testData.Columns[index].Key);
        });

        equal(columns.length, testData.Columns.length);
        equal(datalist[0], testDatalist[0]);
    };
    mvcDatalist._updateData = function (datalist, data) {
        equal(data.FilteredRecords, testData.FilteredRecords);
        equal(data.Columns.length, testData.Columns.length);
        equal(data.Rows.length, testData.Rows.length);
        equal(datalist[0], testDatalist[0]);
        for (i = 0; i < testData.Rows.length; i++) {
            for (var key in testData.Rows[i]) {
                equal(data.Rows[i][key] != null ? data.Rows[i][key] : '', testData.Rows[i][key]);
            }
        }

        $.each(testData.Columns, function (index, column) {
            equal(data.Columns[index].Key, testData.Columns[index].Key);
        });
    };
    mvcDatalist._updateNavbar = function (datalist, filteredRecords) {
        equal(filteredRecords, testData.FilteredRecords);
        equal(datalist[0], testDatalist[0]);
    };

    mvcDatalist._update(testDatalist);
    stop();

    setTimeout(function () {
        start();
    }, 1000);
});
test('Update fades in and out it\'s elements', 3, function () {
    testInput.datalist();
    testInput.data('mvc-datalist')._update(testDatalist);

    stop();
    setTimeout(function () {
        start();
        equal(testDatalist.find('.datalist-processing').css('display'), 'none');
        equal(testDatalist.find('.datalist-data').fadeIn(300).css('display'), 'block');
        equal(testDatalist.find('.datalist-pager').fadeIn(300).css('display'), 'block');
    }, 1000);
});

test('Updates header', function () {
    var mvcDatalist = testInput.datalist().data('mvc-datalist');
    mvcDatalist._updateHeader(testDatalist, testData.Columns);

    var columnCount = 0;
    var expectedHeader = '<tr>';
    $.each(testData.Columns, function (index, column) {
        expectedHeader += '<th class="' + (column.CssClass != null ? column.CssClass : '') + '" data-column="' + column.Key + '">' + column.Header;
        if (testInput.datalist('option', 'sortColumn') == column.Key || (testInput.datalist('option', 'sortColumn') == '' && columnCount == 0))
            expectedHeader += '<span class="datalist-sort-arrow glyphicon glyphicon-sort-by-attributes' + (testInput.datalist('option', 'sortOrder') == 'Asc' ? '' : '-alt') + '"></span>';
        else
            expectedHeader += '<span class=\"datalist-sort-arrow\"></span>';

        expectedHeader += '</th>';
        columnCount++;
    });

    expectedHeader += '<th class="datalist-select-header"></th></tr>';

    equal(testDatalist.find('.datalist-table-head').html(), expectedHeader);
});
test('Update header, sets sort column if not specified', 2, function () {
    testInput.attr('data-datalist-sort-column', '').datalist();
    equal(testInput.datalist('option', 'sortColumn'), '');

    testInput.data('mvc-datalist')._updateHeader(testDatalist, testData.Columns);
    equal(testInput.datalist('option', 'sortColumn'), 'FirstName');
});
test('Update header, binds header click', 12, function () {
    testInput.datalist().data('mvc-datalist')._updateHeader(testDatalist, testData.Columns);

    var headers = testDatalist.find('.datalist-table-head th');
    var previousSortColumn = $(headers[0]).attr('data-column');
    $.each(headers, function (index, header) {
        var jHeader = $(header);
        testInput.data('mvc-datalist')._update = function (datalist) {
            if (jHeader.hasClass('datalist-select-header'))
                equal(testInput.datalist('option', 'sortColumn'), previousSortColumn);
            else
                equal(testInput.datalist('option', 'sortColumn'), jHeader.attr('data-column'));
        };

        jHeader.click();

        var currentSortOrder = testInput.datalist('option', 'sortOrder');
        testInput.data('mvc-datalist')._update = function (datalist) {
            if (jHeader.hasClass('datalist-select-header'))
                equal(testInput.datalist('option', 'sortOrder'), currentSortOrder);
            else
                equal(testInput.datalist('option', 'sortOrder'), (currentSortOrder == 'Asc') ? 'Desc' : 'Asc');
        };

        jHeader.click();

        var currentSortOrder = testInput.datalist('option', 'sortOrder');
        testInput.data('mvc-datalist')._update = function (datalist) {
            if (jHeader.hasClass('datalist-select-header'))
                equal(testInput.datalist('option', 'sortOrder'), currentSortOrder);
            else
                equal(testInput.datalist('option', 'sortOrder'), (currentSortOrder == 'Asc') ? 'Desc' : 'Asc');
        };

        jHeader.click();

        previousSortColumn = $(headers[0]).attr('data-column');
    });
});

test('Update data, returns no data found', 1, function () {
    var datalistTableBody = testDatalist.find('.datalist-table-body');
    datalistTableBody.html('Test');

    testInput.datalist().data('mvc-datalist')._updateData(testDatalist, { Rows: [] });
    equal(datalistTableBody.html(), '<tr><td colspan="1" style="text-align: center">' + $.fn.datalist.lang.NoDataFound + '</td></tr>');
});
test('Update data, updates table data', 1, function () {
    var datalistTableBody = testDatalist.find('.datalist-table-body');
    datalistTableBody.html('Test');

    testInput.datalist().data('mvc-datalist')._updateData(testDatalist, testData);

    var expectedData = '';
    for (var i = 0; i < testData.Rows.length; i++) {
        var tableRow = '<tr>'
        var row = testData.Rows[i];
        $.each(testData.Columns, function (index, column) {
            tableRow += '<td class="' + (column.CssClass != null ? column.CssClass : '') + '">' + (row[column.Key] != null ? row[column.Key] : '') + '</td>';
        });

        tableRow += '<td class="datalist-select-cell"><div class="datalist-select-container"><i class="glyphicon glyphicon-ok"></i></div></td></tr>';
        expectedData += tableRow;
    }

    equal(datalistTableBody.html(), expectedData);
});
test('Update data, binds select spans', 15, function () {
    var iteration = 0;
    var mvcDatalist = testInput.datalist().data('mvc-datalist');
    mvcDatalist._bindSelect = function (datalist, selectCell, dataRow) {
        equal(selectCell, datalist.find('td.datalist-select-cell')[iteration]);
        equal(dataRow, testData.Rows[iteration++]);
        equal(datalist[0], testDatalist[0]);
    };

    mvcDatalist._updateData(testDatalist, testData);
});

test('Updates navigation bar to empty', 1, function () {
    var pagination = testDatalist.find('.datalist-pager > .pagination');
    var mvcDatalist = testInput.datalist().data('mvc-datalist');
    pagination.html('Test');

    mvcDatalist._updateNavbar(testDatalist, 0);
    equal(pagination.html(), '');
});
test('Updates navigation with paginator', 18, function () {
    var mvcDatalist = testInput.attr('data-datalist-page', 1).datalist().data('mvc-datalist');
    var pagination = testDatalist.find('.datalist-pager > .pagination');
    testDatalist.find('.datalist-items-per-page').val(1);
    mvcDatalist._updateNavbar(testDatalist, 6);
    var elements = pagination.find('li');
    var links = pagination.find('a');

    equal($(elements[0]).hasClass('active'), false);
    equal($(elements[1]).hasClass('active'), false);
    equal($(elements[2]).hasClass('active'), false);
    equal($(elements[3]).hasClass('active'), true);
    equal($(elements[4]).hasClass('active'), false);
    equal($(elements[5]).hasClass('active'), false);
    equal($(elements[6]).hasClass('active'), false);
    equal($(elements[7]).hasClass('active'), false);
    equal($(elements[8]).hasClass('active'), false);

    equal($(links[0]).data('page'), 0);
    equal($(links[1]).data('page'), 0);
    equal($(links[2]).data('page'), 0);
    equal($(links[3]).data('page'), 1);
    equal($(links[4]).data('page'), 2);
    equal($(links[5]).data('page'), 3);
    equal($(links[6]).data('page'), 4);
    equal($(links[7]).data('page'), 2);
    equal($(links[8]).data('page'), 5);
});

test('Binds datalist table select', 10, function () {
    var iteration = 0;
    var mvcDatalist = testInput.datalist().data('mvc-datalist');
    mvcDatalist._select = function (data) {
        equal(data, testData.Rows[iteration++]);
    };
    mvcDatalist._updateData(testDatalist, testData);

    var dialogClose = testDatalist.data('ui-dialog').close;
    testDatalist.data('ui-dialog').close = function () {
        dialogClose();
        ok(true);
    };
    $.each(testDatalist.find('td.datalist-select-cell'), function (index, element) {
        $(element).click();
    });
});

test('Limits value', 6, function () {
    testInput.datalist();
    var datalist = testInput.data('mvc-datalist');

    equal(datalist._limitTo('NotNumber', 1, 99), 20);
    equal(datalist._limitTo(-1, 1, 99), 1);
    equal(datalist._limitTo(1, 1, 99), 1);
    equal(datalist._limitTo(100, 1, 50), 50);
    equal(datalist._limitTo(99, 1, 99), 99);
    equal(datalist._limitTo(60, 1, 99), 60);
});

test('Cleans up', 9, function () {
    testInput.datalist();
    equal(testInput.attr('data-datalist-records-per-page'), null);
    equal(testInput.attr('data-datalist-dialog-title'), null);
    equal(testInput.attr('data-datalist-hidden-input'), null);
    equal(testInput.attr('data-datalist-sort-column'), null);
    equal(testInput.attr('data-datalist-sort-order'), null);
    equal(testInput.attr('data-datalist-filters'), null);
    equal(testInput.attr('data-datalist-term'), null);
    equal(testInput.attr('data-datalist-page'), null);
    equal(testInput.attr('data-datalist-url'), null);
});

test('Destroys datalist', 10, function () {
    testInput.datalist({
        filterChange: function () {
            ok(false);
        }
    });

    testInput.datalist('destroy');
    equal(testInput.attr('data-datalist-sort-order'), 'Desc');
    equal(testInput.attr('data-datalist-hidden-input'), 'Test');
    equal(testInput.attr('data-datalist-records-per-page'), 30);
    equal(testInput.attr('data-datalist-sort-column'), 'FirstName');
    equal(testInput.attr('data-datalist-dialog-title'), 'TestTitle');
    equal(testInput.attr('data-datalist-filters'), 'Filter1,Filter2');
    equal(testInput.attr('data-datalist-url'), 'http://localhost:9140/Datalist/Default');

    equal(testInput.hasClass('mvc-datalist'), false);
    equal(testInput.data('ui-autocomplete'), null);
    equal(testInput.data('mvc-datalist'), null);
    filter1.change();
    filter2.change();
});
