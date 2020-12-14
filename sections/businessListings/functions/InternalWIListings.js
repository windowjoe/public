class InternalWIListings
{
    constructor(options)
    {
        Object.assign(this, {
            format: 'json',
            responseFields: {},
            resultFormType: options.p.module.plural,
            addSearchInstaller: '#addSearch_search_form [name="installers"]',
            internalRequest: DOMAIN + 'intranet/php/ajax/sections/business-listings/internal-wi-listings.php'}, options);
    }

    init()
    {
        let s = this;

        this.setEventListeners(s.initialized);
        this.initialized = true;
        this.setMasks();
    }

    setMasks()
    {
        let phones = $('.phone-mask');

        phones.removeClass('mask');
        phones.mask('(000) 000-0000');
    }

    /**
     * Sets event listeners for the add form
     *
     * @initialized {Boolean} Declares whether page has been
     *                        initialized already
     *
     * @return      {Boolean} Returns true after events are set
     */
    setEventListeners(initialized)
    {
        if (initialized) return false;

        let s = this;
        let mainContainerID = s.p.containers.main.attributes.id;
        let addContainerID = s.p.containers.add.attributes.id;

        //In the add form, removes an entry without adding it to the new database
        s.eLM.setEventListeners(s.page, addContainerID, {
            selector: '[name="cut"]',
            cancelEventTrigger: true,
            callbacks: [function(options){return s.deleteOrigWI(event);}, {event: true}]
        });

        return true;
    }

    doFetch(event, el = event.srcElement)
    {
        let s = this;

        s.ajax.runCrud({
            event,
            proc: 'fetch',
            submittedFormID: el.form.id,
            selectID: el.id,
            fetchNamesVals: 'proc=fetch&pk=' + el.value,
            doFlashStatusVisuals: false,
            urlType: 'addSearch'
        })
        .then((data) => {
            let companies = new Map(Object.entries(data.results.rows));
            s.populateForm(s.standardizeResponseObject(companies));
            s.aV.verifyAddresses({proc: 'add', formID: 'add_windowInstallers'});
        });
    }

    standardizeResponseObject(listing) {
        let s = this;
        let key = listing.keys().next().value;
            listing = listing.get(key);
        let fields = new Map([['company_name', 'company_name'],
                              ['contact_first', 'first_name'],
                              ['contact_last', 'last_name'],
                              ['contact_title', 'contact_title'],
                              ['contact_gender', 'contact_gender'],
                              ['mailing_address_1', 'address'],
                              ['mailing_address_2', 'address_2'],
                              ['mailing_city', 'city'],
                              ['mailing_state', 'state'],
                              ['mailing_zip', 'zip_code'],
                              ['location_address_1', 'location_address'],
                              ['location_address_2', 'location_address_2'],
                              ['location_city', 'location_address_city'],
                              ['location_state', 'location_address_state'],
                              ['location_zip', 'location_address_zip'],
                              ['location_county', 'county'],
                              ['location_msa', 'metro_area'],
                              ['location_type', 'headquarters_branch'],
                              ['location_year_first_appeared', 'year_1st_appeared'],
                              ['location_carrier_route', 'location_address_carrier_route'],
                              ['location_delivery_point_bar_code', 'location_address_delivery_point_bar_code'],
                              ['mailing_carrier_route', 'mailing_courier_route'],
                              ['mailing_delivery_point_bar_code', 'mailing_delivery_point_bar_code'],
                              ['phone_public_1', 'phone_number'],
                              ['phone_public_1', 'phone_number'],
                              ['email_public_1', 'email'],
                              ['employee_size_actual', 'actual_employee_size'],
                              ['employee_size_range', 'employee_size_range'],
                              ['sales_volume_actual', 'actual_sales_volume'],
                              ['sales_volume_range', 'sales_volume_range'],
                              ['primary_sic_orig', 'primary_sic_orig'],
                              ['primary_sic', 'primary_sic'],
                              ['primary_sic_desc_orig', 'primary_sic_desc_orig'],
                              ['primary_sic_desc', 'primary_sic_desc'],
                              ['second_sic_orig', 'second_sic_orig'],
                              ['second_sic', 'second_sic'],
                              ['second_sic_desc_orig', 'second_sic_desc_orig'],
                              ['second_sic_desc', 'second_sic_desc'],
                              ['third_sic_orig', 'third_sic_orig'],
                              ['third_sic', 'third_sic'],
                              ['third_sic_desc_orig', 'third_sic_desc_orig'],
                              ['third_sic_desc', 'third_sic_desc'],
                              ['credit_score_alpha', 'credit_alpha_score'],
                              ['credit_score_numeric', 'credit_numeric_score'],
                              ['org_type', 'firm_individual'],
                              ['infousa_id', 'infousa_id'],
                              ['yellow_pages_ad_size', 'adsize_in_yellow_pages'],
                              ['website', 'web_address'],
                              ['show_website', 'show_web_address'],
                              ['company_description', 'company_description'],
                              ['window_companies_record_id', 'record_id'],
                              ['listing_claimed', 'claimed'],
                              ['active', 'archived']
                            ]);

        fields.forEach(function(srcFieldName, formFieldName) {
            fields.set(formFieldName, listing[srcFieldName]);
        });

        return fields;
    }

    populateForm(fields)
    {
        if (!fields) return false;

        let s = this;
        //let addForm = s.dpForms.getId(s.page.module.plural);
        let addForm = $('#add_windowInstallers');

        fields.forEach(function(val, fieldName) {
            addForm.find('[name="' + fieldName + '"]').val(val);
        });
    }

    deleteOrigWI(event)
    {
        let s = this;
        let windowCompaniesRecordId = event.target.form.querySelector('[name="window_companies_record_id"]').value;

        s.sVF.delete('delete', event, {
            runCrud: {
                namesVals: 'proc=delete&pk=' + windowCompaniesRecordId,
                ajaxOptions: {url: this.internalRequest}
            }
        });

        removeSelectedIndex(selector);

        let opt = s.addSearchInstallersSelect.find('option[value="IWIL-PK-'+ windowCompaniesRecordId +'"]');
        opt.remove();

        s.proc = '';
    }
};
