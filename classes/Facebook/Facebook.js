class Facebook
{

    constructor(options)
    {
        Object.assign(this, {
            appID: '1002725426496867',
            resultFormType: options.p.module.plural,
            responseFields: {}
        }, options);
    }

    fbAsyncInit() {
        FB.init({
            appId      : this.appID,
            cookie     : true,  // enable cookies to allow the server to access the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v3.2' // use graph api version 2.8
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.
        FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        });
    }

    FBInit()
    {

        //turn back on in header.php
        FB.init({
            appId      : '1002725426496867',
            cookie     : true,  // enable cookies to allow the server to access the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v3.2' // use graph api version 2.8
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        var that = this;
        FB.getLoginStatus(function(response) {
            that.statusChangeCallback(response);
        });
    }

    //This is called with the results from from FB.getLoginStatus().
    statusChangeCallback(response)
    {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.testAPI();
        } else {
            // The person is not logged into your app or we are unable to tell.
            document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    checkLoginState()
    {
        var that = this;

        FB.getLoginStatus(function(response) {
            that.statusChangeCallback(response);
        });
    }

    processEventRequest(event)
    {
        var btn = $(event.target);
        var form = btn.parents('form');
        var query =  form.find('#fb_search').val();

        this.fbSearch(query, 'page');
    }

    search(q, type, callback)
    {
            type = 'page';
        var finalResponse;

        FB.api('/search?q=' + q + '&type=' + type, function(response) {
            if (!response || response.error) {
                finalresponse = response;
            } else {
                finalresponse = response;
            }

            callback(finalresponse);
        });
    }

    getPageInfo(pageID, callback)
    {
        var that = this;

        FB.api(pageID,
            {fields: 'about, best_page, bio, category, category_list, company_overview, contact_address, cover, current_location, description, emails, engagement, fan_count, featured_video, founded, general_info, hours, is_always_open, is_permanently_closed, is_published, is_unclaimed, link, location, mission, name, overall_star_rating, payment_options, phone, place_type, products, rating_count, start_info, username, website, picture'},
            function (response) {
                var isArr = Array.isArray(response.data);
                if (!response || response.error || isArr) {
                    result = false;
                } else {
                    callback(response);
                }
            });
    }

    processResponse(response, outputType, options)
    {
        var defaults = {el: false, dataAttributes: false};
        var settings = $.extend(defaults, options);

        var el = settings.el;
        var dataAttributes = settings.dataAttributes;

        var data;
        var numResponse;

        if (typeof response.data === 'object') {
            data = response.data;
            numResponse = data.length;
        } else {
            data = response;
            numResponse = 1;
        }

        if (numResponse > 1) {
            //sort objects alphabetically by .name property
            data.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        }

        if (numResponse === 1) {
            var pageID = (data[0]) ? data[0].id : data.id;
            var that = this;

            this.getPageInfo(pageID, function(response) {
                that.responseFields = response;
                that.processPageInfoResponse();
            });
         } else if (numResponse > 1) {
            if (outputType === 'select') {
                return this.createInsertSelect(data, el, {dataAttributes: dataAttributes});
            }
        }
    }

    processPageInfoResponse()
    {
        this.standardizeResponseObject(this.responseFields);
        this.populateForm();

    }

    populateForm()
    {
        window[this.resultFormType].functions.populateForm('facebook', this.responseFields);
    }

    standardizeResponseObject(response)
    {
        var fields = {};

        fields.company_name = response.name;
        if (response.location) {
            fields.address_1 = response.location.street;
            fields.city = response.location.city;
            fields.state = response.location.state;
            fields.zip = response.location.zip.substring(0, 5);

            fields.latitude = response.location.latitude;
            fields.longitude = response.location.longitude;
        }

        fields.phone_public_1 = s.sM.cleanPhoneNum(response.phone);

        if (response.emails) {
            fields.email_public_1 = response.emails[0];
        }

        fields.website = s.sM.cleanURLToWebBase(response.website);

        fields.internal_notes = {hours: response.hours, about: response.about, description: response.description};
        fields.facebook_username = response.username;
        fields.facebook_is_claimed = (response.is_unclaimed == true || typeof response.is_unclaimed == 'undefined') ? 0 : 1;
        fields.facebook_num_page_likes = response.fan_count;
        fields.facebook_url = s.sM.cleanURLToWebBase(response.link);
        fields.facebook_avg_rating = response.overall_star_rating;
        fields.facebook_num_of_ratings = response.rating_count;
        fields.facebook_prime_cat = response.category;
        fields.facebook_cats = response.category_list;
        fields.facebook_id = response.id;

        var hours = '';

        if (fields.internal_notes.hours) {
            $.each(fields.internal_notes.hours, function(day, time) {
                hours += day + ': ' + time +' ';
            });
        }

        var intNotes = '';
            if (hours) intNotes += 'FB Hours: ' + hours;
            if (fields.internal_notes.about) intNotes += '\r\n\r\nFB About: ' + fields.internal_notes.about;
            if (fields.internal_notes.description) intNotes += '\r\n\r\nFB Desc: ' + fields.internal_notes.description;
            fields.internal_notes = intNotes;

        var categories = '';

        if (fields.facebook_cats) {
            $.each(fields.facebook_cats, function(index, obj) {
                categories += obj.name + ',';
            });

            categories = categories.substring(0, categories.length-1);
        }

        fields.facebook_cats = categories;

        this.responseFields = fields;
    }

    createInsertSelect(data, el, options)
    {
        var fieldName = el.attr('name');

        var defaults = {className: 'form-control input-sm sm_profile_select', style: 'width:100%'};
        var settings = $.extend(true, defaults, options);

        var className = settings.className;
        var style = settings.style;
        var dataAttributes = settings.dataAttributes;

        var optStr = '<option value="">Choose a Page</option>';

        $.each(data, function(index, obj) {
            optStr += s.dSeleect.createOptionStr(obj.id, {htmlStr: obj.name})
        });

        var select = createSelectStr(fieldName, {optionsStr: optStr, className: className, style: style, dataAttributes: dataAttributes});

        if (el !== false) {
            el.replaceWith(select);
        } else {
            return select;
        }
    }

    //Here we run a very simple test of the Graph API after login is
    //successful.  See statusChangeCallback() for when this call is made.
    testAPI()
    {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
    }
}

// Load the SDK asynchronously
(function(d, s, id)
{
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));