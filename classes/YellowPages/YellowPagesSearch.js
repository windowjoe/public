class YellowPagesSearch
{
    constructor(options)
    {
        Object.assign(this, {
            resultFormType: options.p.module,
            apiKey: 'cmtjd0v3zd',
            baseAPIURL: 'http://api2.yp.com/listings/v1/',
            apiSearchURL: 'http://api2.yp.com/listings/v1/search',
            apiDetailsURL: 'http://api2.yp.com/listings/v1/details?',
            internalRequest: DOMAIN + 'intranet/php/ajax/sections/business-listings/yellow-pages-search.php',
            searchResultsSelect: 'add_search_results',
            format: 'json',
            responseFields: {}
        }, options);
    }

    getListings(phoneSearch, searchTerm, options)
    {
        let defaults = {city: false, state: false};
        let {city, state} = Object.assign(defaults, options);
        let location = city + ' ' + state;

        let namesVals  = 'apiURL=' + this.apiSearchURL;
            namesVals += (phoneSearch === false) ?'&radius=25&listingCount=50' : '';
            namesVals += '&format=' + this.format + '&key=' + this.apiKey;
            namesVals += (location !== false) ? '&searchloc=' + this.formatSearchStr(location) : '';
            namesVals += '&term=' + this.formatSearchStr(searchTerm);
            namesVals += (phoneSearch == 'true') ? '&phonesearch=true' : '';

        this.doFetch(namesVals);
    }

    processIdRequest(event)
    {
        let listingID = $(event.srcElement).val();

        let namesVals  = 'apiURL=' + this.apiDetailsURL;
            namesVals += '&format=' + this.format + '&key=' + this.apiKey;
            namesVals += '&listingid=' + listingID;
            namesVals += '&xmlResponse=1';

            this.doFetch(namesVals);
    }

    doFetch(namesVals)
    {
        let s = this;
        let response = s.ajax.ajaxProcessing(namesVals, {url: this.internalRequest});

        response.done(function(data) {
            let listings;
            let listingsMap = new Map();

            if (typeof data.searchResult !== 'undefined') {
                listings = data.searchResult.searchListings.searchListing;

                listings.forEach(function(obj) {
                    listingsMap.set(obj.listingId, obj);
                });
            } else if (typeof data.listingsDetails !== 'undefined') {
                listings = data.listingsDetails.listingDetail;
                listingsMap.set(listings.listingId, listings);
            }

            s.processListings(listingsMap);
        });
    }

    processListings(listings)
    {
        let s = this;

        if (listings.size === 1) {
            s.standardizeResponseObject(listings);
            s.populateForm();
        } else if (listings.size > 1) {
            s.createListingOptions(listings);
        }

        /*else if (typeof listings.accreditations === 'object') {
            s.standardizeResponseObject(listings);
            s.populateForm();
        }*/
    }

    createListingOptions(listings)
    {
        let s = this;
        let optStr = '';
        let searchResultsSelect = getByID(s.searchResultsSelect);

        listings.forEach(function(l, id) {
            optStr += '<option value="' + id + '">' + l.businessName + ' - ' + l.street + ' ' + l.city + ' ' + l.state + '</option>';
        });

        s.searchResultsSelect.find('option:not(:first)').remove();
        s.searchResultsSelect.append(optStr);
        s.searchResultsSelect.attr('disabled', false);
    }

    standardizeResponseObject(listing) {
        let s = this;
        let key = listing.keys().next().value;
            listing = listing.get(key);
        let fields = new Map([['company_name', 'businessName'],
                              ['address_1', 'street'],
                              ['city', 'city'],
                              ['state', 'state'],
                              ['zip', 'zip'],
                              ['phone_public_1', 'phone'],
                              ['email_public_1', 'email'],
                              ['website', 'websiteURL'],
                              ['description', 'description'],
                              ['latitude', 'latitude'],
                              ['longitude', 'longitude'],
                              ['yellow_pages_avg_rating', 'averageRating'],
                              ['yellow_pages_num_of_ratings', 'ratingCount'],
                              ['yellow_pages_prime_cat', 'primaryCategory'],
                              ['yellow_pages_id', 'listingId']
                            ]);

        let setToEmptyStr = ['object', 'undefined', 'false'];

        fields.forEach(function(srcFieldName, formFieldName) {
            if (setToEmptyStr.includes(typeof listing[srcFieldName]) || setToEmptyStr.includes(listing[srcFieldName]) || listing[srcFieldName] == false) {
                fields.set(formFieldName, '');
            } else {
                fields.set(formFieldName, listing[srcFieldName]);
            }
        });

        fields.set('phone_public_1', s.sM.cleanPhoneNum(listing.phone));
        fields.set('website', s.sM.cleanURLToWebBase(listing.websiteDisplayURL));
        fields.set('internal_notes', 'YP Hours: ' + listing.openHours + ' YP zDesc 2: ' + listing.description2);
        fields.set('yellow_pages_url', s.sM.cleanURLToWebBase(listing.moreInfoURL));

        let yellow_pages_is_claimed = (listing.claimed === 'false') ? '0' : '1';
        fields.set('yellow_pages_is_claimed', yellow_pages_is_claimed);


        let cats = listing.categories;
        let yellow_pages_cats;

        if (typeof cats === 'object') {
            cats = cats.category;
            yellow_pages_cats = cats.toString().replace(/,/g, ', ');
        } else {
            yellow_pages_cats = listing.categories.replace(/\|/g, ', ');
        }

        fields.set('yellow_pages_cats', yellow_pages_cats);

        this.responseFields = fields;
    }

    populateForm()
    {

    }


/*windowInstallers.functions.populateForm = function(src, data)
{
    var addForm = getByID(windowInstallers.containers.add.attributes.id).find('#add_' + windowInstallers.module.plural);

    $.each(data, function(fieldName, val) {
        if (typeof val !== 'object') {
            val = (typeof val === 'undefined') ? '' : val;
            let el = addForm.find('[name="' + fieldName + '"]');
            let presVal = el.val();
            let isSMSelect = el.hasClass('sm_profile_select');
            let smNetwork = el.attr('data-sm-network');

            if (fieldName === 'phone_public_1' && presVal != '') {
                addForm.find('[name="phone_public_2"]').val(val);
            } else if (fieldName === 'email_public_1' && presVal != '') {
                addForm.find('[name="email_private_1"]').val(val);
            } else if (fieldName === 'internal_notes' && val != '') {
                var internalNotes = windowInstallers.objects.stringManipulator.firstLetterToUpper(src.replace(/_/g, ' ')) + '\r\n' + val;
                    internalNotes = (presVal == '') ? internalNotes : presVal + '\r\n\r\n' + internalNotes;
                el.val(internalNotes);
            }

            else {
                el.val(val);
            }

            var rightAddOn = el.next('.input-group-addon');

            if (el.val() != '' && rightAddOn.hasClass('pop_external_link_inactive')) {
                    rightAddOn.removeClass('pop_external_link_inactive');
                    rightAddOn.addClass('pop_external_link_active');
                    rightAddOn.attr('title', 'Click to go to Page');
            } else {
                    rightAddOn.removeClass('pop_external_link_active');
                    rightAddOn.addClass('pop_external_link_inactive');
                    rightAddOn.attr('title', 'Add Link to Make Active');
            }
        }
    });
};*/

 /* } else if (presVal == '' || smNetwork === src) {
    el.val(val);
} else if (isSMSelect) {
    var elParent = el.parents('.input-group');
    var elName = el.attr('name');
    //elParent.replaceWith(userInputsMaker.createUserInput(windowInstallers.fields[elName].element), 'add');
    el = addForm.find('[name="' + fieldName + '"]');

} else {
    console.log(fieldName + '::' + presVal + '::' + val);
}*/

    formatSearchStr(str)
    {
        return str.replace(' ', '+');
    }
};
