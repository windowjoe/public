class ZipLocations
{
    constructor(options)
    {
        Object.assign(this, {
            geocodeUrl: DOMAIN + PHPAJAX + 'classes/common/location/zips/geocode.php',
            geoShapesUrl: DOMAIN + PHPAJAX + 'classes/common/location/zips/geo-shapes.php',
            searchRadiusUrl: DOMAIN + PHPAJAX + 'classes/common/location/zips/search-by-radius.php',
            apiURL: 'https://www.zipcodeapi.com/rest/',
            apiKey: 'js-gyXuvTvbHc1Pj8o1kWKGlhcTfoWU8V8p8JSQOnfsnRFUVbj0EyPQ4DTwIX9g1gAg'
        }, options);
    }

    getZipsInRadius(containerID, radiusFieldName = 'location_service_radius', options = {})
    {
        let s = this, container, radius;

        s.containerID = s.dpContainers.getID(containerID.target) || containerID;
        container = document.getElementById(containerID);
        radius = container.querySelector('[name="' + radiusFieldName + '"]').value;

        if (!radius) return false;

        let {namesVals = false, zip = false, zipEl = 'location_zip',
             zipsEl = 'location_service_zip_codes', citiesEl = 'location_service_cities',
             runOptions = {url: s.searchRadiusUrl}} = options;

        zip = container.querySelector('[name="' + zipEl + '"]').value.substring(0, 5);

        namesVals = 'proc=fetch&zipCode=' + zip + '&radius=' + radius;

        s.zipsEl = container.querySelector('[name="' + zipsEl + '"]');
        s.citiesEl = container.querySelector('[name="' + citiesEl + '"]');

        return s.ajax.ajaxProcessing(namesVals, runOptions);
    }


    processZipsInRadiusResponse(data, zipsEl = this.zipsEl, citiesEl = this.citiesEl)
    {
        if (!data) return false;

        let s = this;
        let results = this.getListsFromResponse(new Map(Object.entries(data)));

        zipsEl.innerHTML = s.iP.createEditableList(zipsEl, results.zips,
                                                  {activeTitle: 'Click to remove zip code from service area',
                                                   inactiveTitle: 'Click to add zip code to service area'
                                               });
        citiesEl.innerHTML = s.iP.createEditableList(citiesEl, results.cities,
                                                  {activeTitle: 'Click to remove city from service area',
                                                   inactiveTitle: 'Click to add city to service area'
                                               });

        s.iP.fitInputWidths(citiesEl, '.location_service_cities_item');

        return true;
    }

    setElValue(el, val)
    {
        if (!(el || val)) return false;

        val = Array.isArray(val) ? val.join(',') : val;

        el.value = val;
    }

    getListsFromResponse(data)
    {
        let s = this;
        let zips = new Array();
        let cities = new Array();
        let states = new Array();

        data.forEach(function(o) {
            zips.push(o.zip);

            if (!cities.includes(o.city + ' ' + o.state)) cities.push(o.city + ' ' + o.state);

            if (!states.includes(o.state)) states.push(o.state);
        });

        let results = {};
            results.zips = zips.sort();
            results.cities = cities.sort();
            results.states = states.sort();

        return results;
    }

    checkMaxDistance(maxDistance, distance)
    {
        let max = distance > maxDistance ? distance : maxDistance;

        return max;
    }

    setMaxServieDistanceField(maxServiceDistance, formID)
    {
        let el = document.querySelector('#' + formID + ' [name="location_max_service_distance"]');
            el.value = maxServiceDistance;
    }

    queryZips(zips = false, geoShapes = true)
    {
        if (!zips) return false;

        let that = this;
        let fetchNamesVals = 'proc=fetch&geoShapes=' + geoShapes + '&zips=' + zips;
        let geocodeUrl = this.geocodeUrl;

        return this.ajax.ajaxProcessing(fetchNamesVals, {url: geocodeUrl});
    }


    /*
    createEditableList(item, container, list, options)
    {
        let s = this;
        let htmlList = '';

        let input = '<input type="text" name="' + container.attributes.getNamedItem('name').value + '[]" value="{{VALUE}}" class="' + item + '_list_' + item + '" />';
        let icon = '<i class="far fa-times-circle"></i>';

        list.forEach(function(value) {
            htmlList += '<span class="editable_list_span">' + input.replace(/{{VALUE}}/ig, value) + icon + '</span>';
        });

        container.innerHTML = htmlList;
    }

    fitInputWidths(container, inputClass)
    {
        for (let item of container.querySelectorAll(inputClass).values()) {
            item.style.width = this.calcInputWidth(item.value);
        }
    }

    calcInputWidth(value)
    {
        return (((value.length) * 8) - 5) + 'px';
    }
    */

}
