class AddressVerification
{
    /**
     * Create instance of the class to verify validity of addresses
     *
     * @options {Object} The PageObject (pO) representing the user's page
     */
    constructor(options)
    {
        Object.assign(this, {
            shortenZip: false,                                                  //shorten from zip+4 to 5 digit zip
            authID: '3216743529043302084',                                      //smarty streets api auth token
            addressTypes: ['location', 'mailing'],                              //our address types on our forms, internally defined
            liveAddConfig: this.getLiveAddConfig(options),                      //Smarty Streets config object
            fields: this.getAddressFields(),                                    //Map our form fields to Smarty Street response values
            geoCodeUrl: DOMAIN + 'intranet/php/ajax/apis/esri/geocode.php',     //internal php script to translate address to geocode (lat/long) with ESRI API
            addressVerificationUrl: DOMAIN + 'intranet/php/ajax/apis/smartyStreets/address-verification.php',   //internal php script to validate addresses on Smarty Streets API
        }, options);
    }

    /**
     * Prepare each type of address for verification and call
     * verification function
     *
     * @data {Object}
     * @addressTypes {Object}  Internally defined address types -
     *                         'mailing' and/or 'location'
     */
    verifyAddresses(data, addressTypes = this.addressTypes)
    {
        let s = this;

        if ((!data.proc && !data.data) || (data.proc === 'add' && data.results)) return false;

        let formId = s.dpForms.getId(data);

        makeArray(addressTypes).forEach(function(addressType) {
            let addressMap = s.getAPIAddressMap(formId, addressType);
            let address = s.getAddress(addressMap);

            s.doFetch(address, formId, addressType);
        });
    }

    /**
     * Query Smarty Streets API to verify address
     *
     * @fetchNamesVals {String} The address to be verified in query
     *                          string format e.g. name=value
     * @formId         {String} HTML form id on user's page
     * @addressTypes   {String} 'mailing' or 'location', internally defined
     */
    doFetch(fetchNamesVals = '', formId = '', addressType = '')
    {
        let s = this;

        s.ajax.runCrud({
                proc: 'fetch',
                namesVals: fetchNamesVals + '&proc=fetch',
                doFlashStatusVisuals: false,
                updateDOM: false,
                ajaxOptions: {url: s.addressVerificationUrl}
        })
        .then((data) => {
            s.processDoFetchDone(data, formId, addressType);
        });
    }

    /**
     * Process response to address verification query from Smarty Streets
     *
     * @data        {Object}    Response object from Smarty Streets
     * @formID      {String}    HTML form id from user's current page
     * @addressType {String}    'mailing' or 'location', internally defined
     */
    processDoFetchDone(data, formID, addressType)
    {
        let s = this;
        //let response = typeof data === 'object' ? data.response.raw : JSON.parse(data);
        let response = typeof data === 'object' ? data : JSON.parse(data);
        let success = response[0].delivery_line_1 ? true : false;
        let address = success ? response[0] : false;

        if (!success) return s.processDoFetchDoneError(formID, address, addressType, data);

        return s.geocode(address)
        .then((data) => {
            address.metadata.latitude = data.candidates[0].location.y ? data.candidates[0].location.y : address.metadata.latitude;
            address.metadata.longitude =  data.candidates[0].location.x ? data.candidates[0].location.x : address.metadata.longitude;

            s.populateValidAddress(formID, address, addressType);
        });
    }

    processDoFetchDoneError(formID, address, addressType, data)
    {
        return !address ? this.cssInvalidAddress(formID, addressType) : console.debug('ERROR::AddressVerification::processDoFetchDone - ' + data);
    }

    geocode(address)
    {
        if (!address) return false;

        let s = this;

        let singleLine = address['delivery_line_1'] + ',' +
            address['components']['city_name'] + ',' +
            address['components']['state_abbreviation'] + ' ' +
            address['components']['zipcode'];

        let params = 'proc=fetch&address=' + singleLine;

        return s.ajax.ajaxProcessing(params, {url: s.geoCodeUrl});
    }

    populateValidAddress(formID, address, addressType)
    {
        let s = this;
        let selector = '#' + formID + ' [name="{{NAME}}"]';
        let val = false;

        s.fields[addressType].forEach(function(srcFieldName, formFieldName) {
            if (typeof srcFieldName === 'string') {
                    val = address[srcFieldName];
            } else if (typeof srcFieldName === 'object'){
                let level2 = Object.keys(srcFieldName)[0];
                let srcFields = srcFieldName[level2];

                    val = typeof srcFields === 'string' ? address[level2][srcFields] : address[level2][srcFields[0]] + '-' + address[level2][srcFields[1]];
            }

            if (srcFieldName) {
                val = val === true ? 1 : val === false ? 0 : val;

                let el = document.querySelector(selector.replace('{{NAME}}', formFieldName));
                        s.setValue(el, val);
                        s.cssValidAddress(el);
            }

        });

        s.setDeliveryLine2(formID, addressType);
        s.setDST(formID, addressType);
    }

    setValue(el, val)
    {
        let s = this;

        if (el.tagName === 'select') {
            s.dS.setSelectValue(el, val);

            return true;
        } else if (el.tagName) {
            el.value = val;

            return true;
        }

        return false;

    }

    setDeliveryLine2(formID, addressType)
    {
        let s = this;
        let deliveryLine1 = document.querySelector('#' + formID + ' [name="' + addressType + '_address_1"]');
        let val1 = deliveryLine1.value;

        let indexOf = val1.indexOf('Ste') > 0 ? val1.indexOf('Ste') : val1.indexOf('#');
        let deliveryLine2 = document.querySelector('#' + formID + ' [name="' + addressType + '_address_2"]');

        if (indexOf < 0) {
            s.cssRemoveValidation(formID, addressType, deliveryLine2);

            return false;
        }

        let val2 = val1.substring(indexOf);

        val1 = val1.substring(0, indexOf - 1);

        s.setValue(deliveryLine2, val2);
        s.cssValidAddress(deliveryLine2);

        s.setValue(deliveryLine1, val1);
        s.cssValidAddress(deliveryLine1);

        return true;
    }

    setDST(formID, addressType)
    {
        let s = this;
        let dst = document.querySelector('#' + formID + ' [name="' + addressType + '_dst"]');

        if (dst && dst.selectedIndex == 0) {
            s.dS.setSelectValue(dst, '0');
        }
    }

    reset(proc, formID, addressType = false)
    {
        this.clearAddressFields(formID, addressType);
        this.cssRemoveValidation(formID, addressType);
    }

    clearAddressFields(formID, addressType)
    {
        if (!addressType) return false;

        let s = this;
        let fields = new Map([[addressType, s.fields[addressType]]]);
        let zip = document.querySelector('#' + formID + ' [name="' + addressType + '_zip"]');
        let zipVal = zip.value;

            formID = s.dpForms.getFormID(formID);

        fields.forEach(function(map, addressType) {
            map.forEach(function(srcFieldName, formFieldName) {
                let el = document.querySelector('#' + formID + ' [name="' + formFieldName + '"]');
                s.setValue(el, '');
            });
        });

        if (zip) zip.value = zipVal;
    }

    cssValidAddress(el)
    {
        el.classList.remove('invalid_address');
        el.classList.add('valid_address');
    }

    cssInvalidAddress(formID, addressType)
    {
        let s = this;
        let fields =  s.fields[addressType];


        fields.forEach(function(srcFieldName, formFieldName) {
            let el = document.querySelector('#' + formID + ' [name="' + formFieldName + '"]');
            el.classList.add('invalid_address');
        });
    }

    cssRemoveValidation(formID, addressType = false, el = false)
    {
        let s = this;

        if (el) {
            el.classList.remove('invalid_address');
            el.classList.remove('valid_address');

            return true;
        }

        let fields = addressType === false ? new Map(Object.entries(s.fields)) : new Map([[addressType, s.fields[addressType]]]);

        formID = s.dpForms.getFormID(formID);

        fields.forEach(function(map, addressType) {
            map.forEach(function(srcFieldName, formFieldName) {
                let el = document.querySelector('#' + formID + ' [name="' + formFieldName + '"]');
                    el.classList.remove('invalid_address');
                    el.classList.remove('valid_address');
            });
        });
    }

    verify(obj)
    {
        let s = this;
        let zipElement = (obj.currentTarget) ? $(obj.currentTarget) : obj;
        let zip = zipElement.val();
        let form = zipElement.parents('form');
        let formID = form.attr('id');

        if (zip.length === 1) {
            s.setAddressType(zipElement.attr('name'));
            s.reset(false, formID, s.addressType);
        }
    }

    checkZip(element)
    {
        var zip = element.val();

        if (zip.length === 5 || zip.length === 10) {
            return true;
        }

        return false;
    }

    setAddressType(zipElementName)
    {
        let s = this;
        let index = zipElementName.indexOf('_');

        s.addressType = zipElementName.substring(0, index);
    }

    setCityStateFilters(zip)
    {
        var that = this;

        // Get the city and states that correlate with the zipcode
        jQuery.get("https://us-zipcode.api.smartystreets.com/lookup?auth-id=" + that.authID + "&zipcode=" + zip, function (responses) {
            // Checks to see if we received information from those zipcodes
            if (responses) {
                var cities = "";
                var states = "";
                // Multiple responses if multiple zipcodes entered
                for (var i = 0; i < responses.length; i++) {
                    var cityStatePairs = responses[i].city_states;
                    // Multiple cities in one zipcode
                    for (var j = 0; j < cityStatePairs.length; j++) {
                        cities = cities.concat(cityStatePairs[j].city);
                        states = states.concat(cityStatePairs[j].state_abbreviation);
                        if (j + 1 < cityStatePairs.length || i + 1 < responses.length) {
                            cities = cities.concat(", ");
                            states = states.concat(", ");
                        }
                    }
                }

                that.liveAddConfig.cityFilter = cities;
                that.liveAddConfig.stateFilter = states;
            }
        });
    }

    initializeLookUp()
    {
        return jQuery.LiveAddress(this.liveAddConfig);
    }

    getAddressMap(formID, addressType)
    {
        let s = this;

        let addressMap = [{
            address1: '#' + formID + ' [name="' + addressType + '_address_1"]',
            address2: '#' + formID + ' [name="' + addressType + '_address_2"]',
            locality: '#' + formID + ' [name="' + addressType + '_city"]',
            administrative_area: '#' + formID + ' [name="' + addressType + '_state"]',
            postal_code: '#' + formID + ' [name="' + addressType + '_zip"]'
        }];

        return addressMap;
    }

    /**
     * Get object filled with form id/input name mapped to Smarty Streets
     * field names
     *
     * @formID      {String}   HTML id attribute of form on the user's
     *                         current page
     * @addressType {String}   Internally defined address type, 'mailing' or
     *                         'location'
     *
     * @return      {Object}   Object with Smarty Street field names as keys
     *                         and form id/field name of current form and
     *                         address type
     */
    getAPIAddressMap(formID, addressType)
    {
        let s = this;

        let addressMap = {
            street: '#' + formID + ' [name="' + addressType + '_address_1"]',
            street2: '#' + formID + ' [name="' + addressType + '_address_2"]',
            city: '#' + formID + ' [name="' + addressType + '_city"]',
            state: '#' + formID + ' [name="' + addressType + '_state"]',
            zipcode: '#' + formID + ' [name="' + addressType + '_zip"]'
        };

        return addressMap;
    }

    /**
     * Create query string from addressMap object
     *
     * @addressMap {Object} Contains Smarty Street field names
     *                      as keys and form id/field name as values
     *
     * @return {String} Query string with name=value pairs
     */
    getAddress(addressMap)
    {
        addressMap = (Array.isArray(addressMap)) ? addressMap[0] : addressMap;
        let map = new Map(Object.entries(addressMap));
        let address = '';

        map.forEach(function(val, key) {
            let amp = address == '' ? '' : '&';
            address += amp + key + '=' + $(val).val();
        });

        return address;
    }

    /**
     * Smarty Streets config options object
     *
     * @options {Object} User defined options
     *
     * @return {Object} Combined config object
     */
    getLiveAddConfig(options)
    {
        return Object.assign({
            key: 3216743529043302084,
            debug: false,
            geolocate: false,
            cityFilter: false,
            stateFilter: false,
            waitForStreet: true,
            target: 'US',
            addresses: false
        }, options);
    }

    /**
     * Maps internal form address fields (keys) to Smarty Street
     * response object
     *
     * @fields {Object} Class level object to store fields map
     */
    getAddressFields(fields = {})
    {
        fields.location = new Map([
                               ['location_zip', {components: ['zipcode', 'plus4_code']}],
                               ['location_city', {components: 'city_name'}],
                               ['location_state', {components: 'state_abbreviation'}],
                               ['location_delivery_point', {components: 'delivery_point'}],
                               ['location_delivery_point_check_digit', {components: 'delivery_point_check_digit'}],
                               ['location_county', {metadata: 'county_name'}],
                               ['location_county_fips', {metadata: 'county_fips'}],
                               ['location_latitude', {metadata: 'latitude'}],
                               ['location_longitude', {metadata: 'longitude'}],
                               ['location_coords_precision', {metadata: 'precision'}],
                               ['location_address_type', {metadata: 'record_type'}],
                               ['location_cbsa', 'cbsa'],
                               ['location_csa', 'csa'],
                               ['location_carrier_route', {metadata: 'carrier_route'}],
                               ['location_elot_sequence', {metadata: 'elot_sequence'}],
                               ['location_elot_sort', {metadata: 'elot_sort'}],
                               ['location_rdi', {metadata: 'rdi'}],
                               ['location_congressional_district', {metadata: 'congressional_district'}],
                               ['location_dst', {metadata: 'dst'}],
                               ['location_time_zone', {metadata: 'time_zone'}],
                               ['location_utc_offset', {metadata: 'utc_offset'}],
                               ['location_address_1', 'delivery_line_1'],
                               ['location_address_2', false],
                               ['location_delivery_point_bar_code', 'delivery_point_barcode']
                               ]);

        fields.mailing = new Map([
                              ['mailing_zip', {components: ['zipcode', 'plus4_code']}],
                              ['mailing_city', {components: 'city_name'}],
                              ['mailing_state', {components: 'state_abbreviation'}],
                              ['mailing_address_1', 'delivery_line_1'],
                              ['mailing_address_2', false],
                              ['mailing_delivery_point_bar_code', 'delivery_point_barcode'],
                              ['mailing_delivery_point', {components: 'delivery_point'}],
                              ['mailing_delivery_point_check_digit', {components: 'delivery_point_check_digit'}],
                              ['mailing_carrier_route', {metadata: 'carrier_route'}]
                              ]);

        return fields;
    }
};
