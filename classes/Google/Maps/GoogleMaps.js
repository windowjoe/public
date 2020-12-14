class GoogleMaps
{
    constructor(options)
    {
        Object.assign(this, {
            map: false,
            formID: false,
            googleJSMapsAPI: 'https://maps.googleapis.com/maps/api/js?key={{API-KEY}}&libraries=drawing',
            googleMapsAPIKey: 'AIzaSyDZCsj6rq2n5LzlfGpJp7tj5mWD1Y4uxt8',
            oneMileInMeters: 1609.34,
            mapDivName: 'location_service_map',
            latitudeElName: 'location_latitude',
            longitudeElName: 'location_longitude',
            serviceRadiusFieldName: 'location_service_radius',
            companyNameFieldName: 'company_name',
            locationFieldNames: ['company_name', 'location_address_1', 'location_address_2', 'location_city', 'location_state', 'location_zip'],
            locationServiceZipCodesFieldName: 'location_service_zip_codes[]',
            maps: new Map(),
            infoWindowTemplates: new Map(),
            fields: options.p.fields
        }, options);

        this.setInfoWindowTemplatesLocation();
        this.setGoogleJSMapsAPI(this.googleJSMapsAPI, this.googleMapsAPIKey);

        this.loadGoogleMapsAPIPromise = this.loadScriptAsync(this.googleJSMapsAPI);
    }

    init(data)
    {
        let s = this;

        if (data.proc || data.target) {
            let procs = ['add', 'fetch'];

            s.setProc(data);
            s.setContainerName(s.proc);
            s.setContainerID(s.proc);

            if (!s.areValidParams(s.containerID)) return false;

            if (data.target && data.target.className === 'tab-nav-anchor') {
                if (!s.maps.get(s.containerName)) return false;

                let map = s.maps.get(s.containerName);

                s.mapFitBounds(map.map, map.circle.getBounds());
            } /*else if (s.proc === 'update') {
                s.drawMap(s.containerID, s.maps.get(s.containerName), s.mapDivName);
            } else if (s.maps.get(s.containerName)) {
                s.setMapEntities(s.containerID, s.maps.get(s.containerName), s.serviceRadiusFieldName);
            }*/ else if (procs.includes(s.containerName)) {
                s.maps.set(s.containerName, {container: false,
                                             map: false,
                                             center: false,
                                             circle: false,
                                             radiusMeters: 0,
                                             latLngBounds: false,
                                             geoShapes: new Map(),
                                             zips: new Map(),
                                             inactiveZips: new Map(),
                                             inactiveCities: [],
                                             markers: new Map()
                                            });

                let map = s.maps.get(s.containerName);

                s.setMapContainer(s.containerID, map, s.mapDivName);
                s.setCenter(s.containerID, map);

                s.loadGoogleMapsAPIPromise.then(() => {
                    map.map = s.addMap(map.container, map.center);
                    s.initMap(s.containerID, map);

                    s.setMapEntities(s.containerID, map, s.serviceRadiusFieldName, data.results);
                });

                s.setEventListeners(s.initialized);
                s.initialized = true;
            }
        }
    }

    setEventListeners(initialized)
    {
        if (initialized) return false;

        let s = this;
        let mainContainer = s.p.containers.main.attributes.id;
        let form = valClassSelector(s.module + '_form');

        s.eLM.setEventListeners(s.pO, mainContainer, {
            selector: form + ' [name="location_service_zip_codes"] .editable_list_span .fa-times-circle',
            eventTrigger: 'click',
            cancelEventTrigger: true,
            callbacks: (event) => {s.toggleZipCodes(event);}
        });

        s.eLM.setEventListeners(s.pO, mainContainer, {
            selector: form + ' [name="location_service_cities"] .editable_list_span .fa-times-circle',
            eventTrigger: 'click',
            cancelEventTrigger: true,
            callbacks: (event) => {s.toggleCity(event);}
        });
    }

    /**
     * After the map and zip code and city inputs are loaded, this function
     * sets those zip codes and cities which were stored as inactive
     * in the db to inactive on the user's display. By default,
     * all zips and cities display as active until the inactive
     * zips and cities are turned off after page load.
     *
     * @param {Object} map      - The user's current map
     * @param {Object} results  - Data returned from the ajax call for this
     *                            record. Includes all fields on the form.
     */
    getZipsFromData(data)
    {
        if (!data) return false;

        if (Array.isArray(data)) return data;

        if (data.target) return [data.target.parentElement.getElementsByTagName('input')[0].value];

        if (!data.rows) return false;

        let fields = data.rows[Object.keys(data.rows)[0]];
        let inactiveZips = fields.location_service_zip_codes_inactive;

        if (!inactiveZips) return false;

        this.toggleZipCodes(inactiveZips.split(','));
    }

    toggleZipCodes(data)
    {
        if (!data) return false;

        let s = this;
        let zips = s.getZipsFromData(data);
        let map = s.maps.get(s.containerName);

        if (!zips) return false;

        let promise = new Promise(  (resolve, reject) => {
            resolve(s.toggleActiveZipMarkers(map, zips));
        })
        .then((success) => {
            return s.setGeoShapesBoundaries(map, map.zips);
        })
        .then((success) => {
            return s.drawGeoShapes(map);
        });

        return promise;
    }

    toggleActiveZipMarkers(map, zips)
    {
        let s = this;
        let activeZips = false;

        Array.isArray(zips) || (zips = [zips]);

        zips.forEach(function(zip, index) {
            activeZips = s.toggleActiveZips(map, zip);
        });

        return new Promise((resolve, reject) => {
                        if (activeZips) {
                                //zip was active, make inactive
                                s.deleteServiceZipMarkers(map.markers, map.zips, false);
                                resolve(true);

                        } else {
                                //zip was inactive, make active
                                s.addServiceZipMarkers(map.map, map.markers, map.zips);
                                resolve(false);
                        };
                    })
                    .then((success) => {
                        map.circle.setRadius(map.radiusMeters);
                    })
                    .then((success) => {
                       s.toggleCityInputs(map.zips);
                    });
    }

    toggleActiveZips(map, zip)
    {
        let s = this;
        let activeZip = map.zips.get(zip);

        switch(typeof activeZip === 'object') {
            //make zip inactive
            case true:
                map.inactiveZips.set(zip, activeZip);
                map.zips.delete(zip);
                s.toggleZipInputPill(zip);
                return true;
                break;
            default:
                //make zip active
                map.zips.set(zip, map.inactiveZips.get(zip));
                map.inactiveZips.delete(zip);
                s.toggleZipInputPill(zip);
                return false;
        }
    }

    toggleZipInputPill(zip)
    {
        let s = this;
        let container = document.getElementById(s.containerID);
        let zipInput = container.querySelector('form .editable_list_span .location_service_zip_codes_item[value="' + zip + '"]');
        let icon = zipInput.nextSibling;

        s.inputPillToggle(icon);
    }

    inputPillToggle(entity)
    {
        let s = this;
        let inactiveClass = 'editable_list_span_inactive';
        let icon = entity.target || entity;
        let input = icon.previousSibling;
        let span = icon.parentNode;

        span.classList.toggle(inactiveClass);
        input.name = s.toggleInputName(input.name);

        if (span.classList.contains(inactiveClass)) {
            icon.title = s.getDataAttrValue(icon, 'inactive-title');
            span.title = s.getDataAttrValue(span, 'inactive-title');

        } else {
            icon.title = s.getDataAttrValue(icon, 'active-title');
            span.title = s.getDataAttrValue(span, 'active-title');
        }
    }

    toggleInputName(name)
    {
        let pos = name.lastIndexOf('_inactive[]');

        if (pos > 0) return name.substring(0, pos) + '[]';

        return name.substring(0, name.length - 2) + '_inactive[]';
    }

    getDataAttrValue(element, attrName)
    {
        if (!element.attributes['data-' + attrName]) return '';

        return element.attributes['data-' + attrName].value;
    }

    /**
     * Update the city inputs based upon currently active zips
     *
     * @param {Object}  zips                    - A map object with zip codes as keys and
     *                                            zip code info in an object
     * @param {string}  location_service_cities - The html name attribute of
     */
    toggleCityInputs(zips, citiesEl = 'location_service_cities')
    {
        let s = this;
        let inactiveClass = 'editable_list_span_inactive';
        let activeCities = [];
        let container = document.getElementById(this.containerID);
            citiesEl = container.querySelector('[name="' + citiesEl + '"]');
        let cityInputs = citiesEl.getElementsByTagName('input');

        for (let input of cityInputs) {
            input.name = 'location_service_cities_inactive[]';;
            input.nextSibling.title = s.getDataAttrValue(input.nextSibling, 'inactive-title');
            input.parentNode.classList.add(inactiveClass);
            input.parentNode.title = s.getDataAttrValue(input.parentNode, 'inactive-title');
        }

        zips.forEach(function(zip) {
            if (activeCities.includes(zip.city + ' ' + zip.state)) return;

            activeCities.push(zip.city + ' ' + zip.state);

            let input = container.querySelector('form .editable_list_span .location_service_cities_item[value="' + zip.city + ' ' + zip.state + '"]');
            let icon = input.nextSibling;

            s.inputPillToggle(icon);
        });
    }

    /**
     * Turns city input on/off (red/green) border when fa-circle icon is clicked
     *
     * @param {Object} event - The click event that occurs when fa-circle is clicked
     */
    toggleCity(event)
    {
        let s = this;
        let city = event.target.parentElement.getElementsByTagName('input')[0].value;
        let map = s.maps.get(s.containerName);

        let citysZips = s.getCitysZips(map, city);

        s.toggleZipCodes(citysZips);
    }

    /**
     * Returns a list of zips within this city
     *
     * @param {Object}  zips    - The active zips from the user's current map object
     * @param {string}  city    - The 'city st' input value the user clicked on
     *
     * @return {Array} An array of zips found in this city
     */
    getCitysZips(map, city)
    {
        let citysZips = [];

        if (citysZips = this.findCityZips(map.zips, city)) return citysZips;

        return this.findCityZips(map.inactiveZips, city);

    }

    findCityZips(zips, city)
    {
        let citysZips = [];

        zips.forEach(function(o, zip) {
            if (o.city + ' ' + o.state !== city) return;

            citysZips.push(zip);
        });

        if (citysZips.length) return citysZips;

        return false;
    }

    /**
     * Initializes a Google Map with:
     * 1. Draws a circle showing the radius chosen in Service Radius field from the location which is the center of the map
     * 2. Adds a marker for the location of the business at the center of the map
     * 3. Adds an info window to display data about the business location
     *
     * @param {string}  containerID - The html id attribute of the element that contains the form and map
     * @param {Object}  map         - The current instance of this class in the container/form the user is using
     */
    initMap(containerID, map)
    {
        let s = this;

        map.circle = s.drawCircleOverlay(map.map, map.center, map.radiusMeters);
        map.markers.set('location', {marker: s.addBizLocationMarker(map.map, map.center), listeners: {}, infoWindow: false});
        map.markers.get('location').infoWindow = s.createInfoWindow(s.getBizLocationInfoWindowContent(containerID, s.locationFieldNames, s.infoWindowTemplates.location, false, {}));

        s.addInfoWindowListener(map.map, map.markers.get('location'));
    }

    /**
     * Render the map details on the Google Map display
     *
     * @param   {string}    containerID             - The html id attribute of the map's containing element
     * @param   {Object}    map                     - The current GoogleMaps.js instance object and all of its data.
     * @param   {string}    serviceRadiusFieldName  - html name attribute of form field containing the service
     *                                                radius of the location
     * @param   {Object}    [results=false          - The data if a previously saved map is loading
     */
    setMapEntities(containerID, map, serviceRadiusFieldName, results = false)
    {
        let s = this;

        //Set radius from business location at center of map
        //Uses Service Radius field under Service Details section of form
        s.setServiceRadius(containerID, map);

        //Returns all zips at least partially within serviceRadius
        let promise = s.zL.getZipsInRadius(containerID, serviceRadiusFieldName);

        promise.then((data) => {
            //Turns zips and cities into html inputPills for their respective textareas
            return s.zL.processZipsInRadiusResponse(data);
        }).then((success) => {
            //gets lat/long coordinates and kml file names for each zip
            return s.queryZips(containerID, map,  s.locationServiceZipCodesFieldName);
        }).then((zips) => {
            return s.setGeoShapesBoundaries(map, map.zips);
        }).then((success) => {
            return s.drawGeoShapes(map);
        }).then((success) => {
            return s.deleteServiceZipMarkers(map.markers, map.zips);
        }).then((success) => {
            s.addServiceZipMarkers(map.map, map.markers, map.zips);
            map.circle.setRadius(map.radiusMeters);

            return true;
        }).then((success) => {
            s.mapFitBounds(map.map, map.circle.getBounds());

            return true;
        }).then((success) => {
            if (!results) return false;

            s.toggleZipCodes(results);

            return true;
        });
    }

    /**
     * Draws the Google Map in the user's display along with it's customized elements
     *
     * @param {string}  containerID - The html id attribute of the element containing
     *                                the form and the map
     * @param {Object}  map         - The instance of this class in the current container
     * @param {string}  mapDivName  - The html name attribute of the element that
     *                                contains the Google Map display
     */
    drawMap(containerID, map, mapDivName)
    {
        let s = this;

        s.setMapContainer(containerID, map, mapDivName);

        map.map = s.addMap(map.container, map.center);
        map.circle.setMap(map.map);

        let location = map.markers.get('location');
        s.drawMarkers(location.marker, map.map);
        s.addInfoWindowListener(map.map, location);

        s.drawGeoShapes(map);
        s.drawMarkers(map.markers, map.map);

        map.circle.setRadius(map.radiusMeters);

        s.mapFitBounds(map.map, map.circle.getBounds());
    }

    /**
     * Adds a Google Maps map object to an html container
     *
     * @param   {Object} mapContainer         - The html element object that will
     *                                          contain the map display
     * @param   {Object} center               - The object containing the center coordinates
     * @param   {Object} options              - Options for the map
     * @param   {string} options.zoom         - How far to zoom in on the map
     * @param   {Object} options.MapTypeId    - The Google defined map type id
     *
     * @return  {Object} The current GoogleMaps.js instance object and all of its data.
     */
    addMap(mapContainer, center, options)
    {
        let s = this;
        let defaults = Object.assign({center: center, zoom: 9, mapTypeId: google.maps.MapTypeId.ROADMAP}, options);

        return new google.maps.Map(mapContainer, defaults);
    }

    /**
     * Grabs the zip codes from the zipCodesFieldName element
     * and looks up their coordinates and kml file
     * Returns a promse a map with zips as the key and
     * an object as the value which contains data about the zip code
     *
     * @param {string}  containerID         - The HTML id of the container element holding the map
     * @param {Object}  map                 - The current GoogleMaps.js instance object and all of its data.
     * @param {string}  zipCodesFieldName   - Name of the html element containing the zips within the service radius
     *
     * @return {Object} Returns a promise from ajaxProcessing.js
     */
    queryZips(containerID, map, zipCodesFieldName)
    {
        if (!zipCodesFieldName) return false;

        let s = this, zips;

        if (!(zips = document.querySelectorAll('#' + containerID + ' [name="' + zipCodesFieldName + '"]'))) return false;

        return s.zL.queryZips(s.nodesToCSV(zips))
        .then((data) => {
            map.zips = new Map(Object.entries(data));

            return map.zips;
        });
    }

    /**
     * Takes a list of html nodes and extracts the value of each node into a CSV list
     *
     * @param {Object}  list - An html objects list
     *
     * @return {string} A csv strin containing a list of zips
     */
    nodesToCSV(list)
    {
        let csvList = '';
        let comma = '';

        for (let item of list.values()) {
            csvList += comma + item.value;
            comma = ',';
        }

        return csvList;
    }

    /**
     * Sets the geoShape boundaries of each zip into a map with the shape type as the key
     * and each boundary as an entry into an array as the value of that key
     * For example, currently 'Polygon' is the only defined key. All boundaries from all
     * zips are entered into an array to be drawn later
     *
     * @param {Object}  map      - The current GoogleMaps.js instance object and all of its data.
     * @param {Object}  entities - A map with zips as the key and an object as the value
     *                             which contains info about the zip code
     *
     * @return {boolean} Returns true upon completion
     */
    setGeoShapesBoundaries(map, entities)
    {
        let s = this;
            map.geoShapesBoundaries = new Map([['Polygon', []]]);

        entities.forEach(function(entity, entityName) {
            if (Array.isArray(entity.geoShapes)) {
                entity.geoShapes.forEach(function(geoShape) {
                    let boundary = geoShape.outerBoundaryIs || geoShape.innerBoundaryIs;
                        map.geoShapesBoundaries.get(geoShape.type).push(JSON.parse(boundary));
                });
            }
        });

        return true;
    }

    /**
     * Draws the zip code boundaries on the map in the user's display
     *
     * @param {Object} map - The current GoogleMaps.js instance object and all of its data.
     *
     * @return {boolean} Returns true upon completion
     */
    drawGeoShapes(map)
    {
        let s = this;

        map.geoShapesBoundaries.forEach(function(coords, type) {
            let defaults = {paths: coords, strokeColor: '#000000', strokeOpacity: 0.0, strokeWeight: 2, fillColor: '#40d306', fillOpacity: 0.0};

            let shape = map.geoShapes.get(type) || (map.geoShapes.set(type, new google.maps.Polygon(defaults)).get(type));

            let promise = new Promise((resolve, reject) => {
                resolve(s.animateGeoShape(shape));
            }).then((visible) => {
                shape.setPaths(coords);
                s.showGeoShapes(map.map, shape, 'show');
            });
        });

        return true;
    }

    /**
     * Sets each polygon representing zip code boundaries on the maps and shows them
     *
     * @param {Object}  map      - The current GoogleMaps.js instance object and all of its data.
     * @param {Object}  shapes   - An object containing each shape to be added and displayed
     * @param {boolean} show     - Unneeded, remove
     */
    showGeoShapes(map, shapes, show)
    {
        let s = this;

        shapes = Array.isArray(shapes) ? shapes : [shapes];

        shapes.forEach(function(shape) {
                shape.setMap(map);
                s.animateGeoShape(shape, 'show');
        });
    }

    /**
     * Finds the current bounds defined by position of the markers
     * This is used to reposition/zoom the map after Service Radius is
     * changed in order to ensure tha all zip code markers are visible
     *
     * @param {Object} markers - Object containing the Google Maps markers
     *                           currently displayed on the map
     *
     * @return {Object} Returns an object containing the lat/long bounds
     */
    getMarkerBounds(markers)
    {
        let s = this;
        let latLngBounds = s.latLngBounds || new google.maps.LatLngBounds();

        markers.forEach(function(marker, location) {
            if (marker.marker.getVisible()) {
                latLngBounds.extend(marker.marker.getPosition());
            }
        });

        return latLngBounds;
    }

    /**
     * Asynchronously animates the zips' polygon shapes as they are being drawn
     *
     * @param {Object}      polygon         - A Google Maps polygon object
     * @param {boolean}     [show=false]    - If true, show the object, hide otherwise
     *
     * @return {boolean} Returns true upon completion
     */
    async animateGeoShape(polygon, show = false)
    {
        if (polygon.fillOpacity < 0.05 && !show) return false;

        let opacity = show ? 0.0 : -0.35;
        let targetOpacity =  show ? 0.35 : 0.0;
        let step = show ? 0.05 : 0.05;

        for (let i = opacity; i < targetOpacity; i += step) {
            await new Promise((resolve, reject) => {
                setTimeout(function() {
                    let fillOpacity = show ? i : -(i);
                    let strokeOpacity = fillOpacity * 2;

                    polygon.setOptions({fillOpacity: fillOpacity, strokeOpacity: strokeOpacity});

                    resolve();
                }, 50);

            });
        }

        return true;
    }

    /**
     * Draws the zip code markers on the map
     *
     * @param {Object} markers  - A map of Google Maps markers with zip codes as key
     * @param {Object} map      - A Google Maps map object
     */
    drawMarkers(markers, map)
    {
        markers = markers instanceof Map ? markers : new Map([['location', markers]]);

        markers.forEach(function(marker) {
            let result = marker.marker ? marker.marker.setMap(map) : marker.setMap(map);
        });
    }

    /**
     * Adds a Google Maps marker
     *
     * @map     {Object} A Google Map object
     * @center  {Object} The position the marker should be placed at
     *
     * @return  {Object} A Google Maps marker object
     */
    addMarker(map, center, options)
    {
        let s = this;
        let defaults = {map: map, position: center, label: {text: 'A', fontWeight: '700'}, title: '', animation: google.maps.Animation.DROP};

        return new google.maps.Marker(Object.assign(defaults, options));
    }

    /**
     * Removes the zip code markers from the map display
     *
     * @param {Object}  markers - A map of markers with zip as key and marker object as value
     * @param {Object}  zips    - A map of the currently displayed zips with zips as keys
     *
     * @return {boolean} Returns true upon completion
     */
    deleteServiceZipMarkers(markers, zips, removeLocation = true)
    {
        zips = [...zips.keys()];

        zips.push('location');

        markers.forEach(function(marker, zip) {
            if (!zips.includes(zip)) {
                marker.marker.setMap(null);
                markers.delete(zip);
            }
        });

        return true;
    }

    /**
     * Adds a marker representing the location of the business at the center of the map
     *
     * @param {Object}          map                             - A Google Maps map object
     * @param {Object}          center                          - An object with the lat/long coordinates
     * @param {Object}          options                         - User defined map options
     * @param {Object}          options                         - An object with label options for the marker
     * @param {string}          [options.label.text=A]          - The text to be displayed on the marker
     * @param {string}          [options.label.fontWeight=700]  - The css font weight of the title
     * @param {string|boolean}  [options.title=false]           -The hover text for the marker
     * @param {Object}          animation                       - As defined by Google Maps Animation class options
     *
     * @return {Object}         A Google Maps marker object
     */
    addBizLocationMarker(map, center, options)
    {
        let s = this;
        let defaults = {label: {text: 'A', fontWeight: '700'}, title: false, animation: google.maps.Animation.DROP};

        Object.assign(defaults, options);

        defaults.title = s.getBizLocationMarkerTitle(defaults.title);

        return s.addMarker(map, center, defaults);
    }

    /**
     * Adds markers for the zips within the Service Radius
     *
     * @param {Object} map      - A Google Maps map object
     * @param {Object} markers  - A map object with zips as the keys and
     *                            Google Maps marker objects as values
     * @param {Object} zips     - A map with zips as the keys and objects
     *                            containing zip info as the values
     */
    addServiceZipMarkers(map, markers, zips)
    {
        let s = this;

        zips.forEach(function(props, zip) {
            if (!markers.get(zip)) {
                markers.set(zip,
                            {marker: s.addMarker(map, {lat: parseFloat(props.latitude), lng: parseFloat(props.longitude)},
                                {label: {text: String(props.zip), fontWeight: '700'},
                                 title: String(props.zip)
                                }),
                             listeners: {},
                             infoWindow: false
                            });
            }
        });
    }

    /**
     * Generates the title text shown on hover
     *
     * @title {string} If a title is passed, the process is skipped
     *
     * @return {string} If the company name exists on the form, it is returned.
     *                  Otherwise a generic string is returned.
     */
    getBizLocationMarkerTitle(title)
    {
        if (title) return title;

        let s = this;
        let bizName = document.querySelector('#' + s.containerID + ' [name="' + s.companyNameFieldName + '"]').value;

        if (bizName) {
            return bizName;
        }

        return 'Your Business Location';
    }

    /**
     * Creates a Google Maps information windows for a Google Maps marker
     *
     * @content {string} The content to be displayed when the info window is shown
     * @options {Object} Info Window options (future)
     *
     * @return  {Object} Google Maps info window object
     */
    createInfoWindow(content, options)
    {
        if (!Boolean(content)) return false;

        let defaults = Object.assign({content: content}, options);

        return new google.maps.InfoWindow(defaults);
    }

    /**
     * Generates standard content for the business location's info window
     * which is displayed by clicking the location's marker at the center of
     * the map
     *
     * @containerID         {string} The HTML id of the container element holding the map
     * @locationFieldNames  {Array}  An array holding the html field names to include
     *                               in the content
     * @template            {string} An html text template used to generate content
     *
     * @return              {string} The content string to be displayed
     */
    getBizLocationInfoWindowContent(containerID, locationFieldNames, template)
    {
        let s = this;
        let locationMap = s.getFieldsMap(containerID, locationFieldNames);
        let content = template;

        locationMap.forEach(function(value, fieldName) {
            content = content.replace(new RegExp(s.getTemplateSlug(fieldName), 'gi'), value);
        });

        return content;
    }

    /**
     * Takes an array of html field names and returns a map with the
     * field names as keys and the values from the html form as values
     *
     * @containerID {string} The html id of the container holding the form
     * @fieldNames  {Array}  An array holding the names of the html fields whose
     *                       values will be used in the template string
     *
     * @return      {Map}    A map whose keys are the html field names and values
     *                       are the values from the fields on the html form
     */
    getFieldsMap(containerID, fieldNames = false)
    {
        if (!fieldNames) return false;

        let fieldsMap = new Map();

        fieldNames.forEach(function(fieldName) {
            let value = document.querySelector('#' + containerID + ' [name="' + fieldName + '"]').value;

            fieldsMap.set(fieldName, value);
        });

        return fieldsMap;
    }

    /**
     * The html template for the info window on the marker for the business location
     * at the center of the map.  This is broken into a function so that it may be
     * easily altered in the future.
     */
    setInfoWindowTemplatesLocation()
    {
        this.infoWindowTemplates.location = `<div class="info_window">
                                                <div class="company_name">` + this.getTemplateSlug('company_name') + `</div>
                                                <div class="address">
                                                    <div class="location_address_1">` + this.getTemplateSlug('location_address_1') + `</div>
                                                    <div class="location_city_state_zip">` +
                                                        this.getTemplateSlug('location_city') + `, ` +
                                                        this.getTemplateSlug('location_state') + ` ` +
                                                        this.getTemplateSlug('location_zip') +
                                                    `</div>
                                                </div>
                                            </div>`;
    }

    /**
     * Returns a template slug for the given html field name
     * This is present so that individual field names may be given
     * custom template slugs in the future
     *
     * @fieldName   {string}    The html name of the field
     *
     * @return      {string}    The template slug for the field
     */
    getTemplateSlug(fieldName)
    {
        return '{{' + fieldName.toUpperCase() + '}}';
    }

    /**
     * Adds an event listener to a marker to open it's attached info window
     *
     * @map         {Object}    The current GoogleMaps.js instance object and all of its data.
     * @marker      {Object}    A Google Maps map marker object
     * @trigger     {string}    The name of the event to trigger the event
     * @action      {string}    The action that will occur as a result of
     *                          the event
     */
    addInfoWindowListener(map, marker, trigger = 'click', action = 'open')
    {
        if (!Boolean(map) || !Boolean(marker)) return false;

        let s = this;
        let promise;

        s.removeListener(marker.listeners[trigger]);

        marker.listeners[trigger] = marker.marker.addListener(trigger, function() {
            if (s.isInfoWindowOpen(marker.infoWindow)) {
                marker.infoWindow.close();
            } else {
                promise = new Promise((resolve, reject) => {
                            marker.infoWindow.open(map, marker.marker);
                            resolve();
                        });

                        promise.then(() => {
                            s.styleInfoWindow();
                        });
            }
        });
    }

    /**
     * Remove an event listener from a Google Maps marker object
     *
     * @listener {Object} The Google Maps marker event listener
     *
     * @return {Object} The result of the Google Maps removeListener
     *                  function
     */
    removeListener(listener)
    {
        if (!listener) return true;

        return google.maps.event.removeListener(listener);
    }

    /**
     * Checks to see a Google Maps info window is open
     *
     * @param  {Object}     infoWindow - A Google Maps info window object
     *
     * @return {Boolean}    true if it is open, false otherwise
     */
    isInfoWindowOpen(infoWindow){
        let map = infoWindow.getMap();

        return (map !== null && typeof map !== "undefined");
    }

    /**
     * Adds styling to a Google Maps info window
     * Currently only modifies the 'X' in the top right hand corner
     *
     * @param {string} [margin=0]           The css margin
     * @param {string} [marginTip=15px]     The css top margin
     * @param {string} [marginRight=15px]   The css right margin
     */
    styleInfoWindow(margin = '0', marginTop = '15px', marginRight = '15px')
    {
        let x = document.querySelector('.gm-ui-hover-effect>img');
            x.style.margin = margin;
            x.style.marginTop = marginTop;
            x.style.marginRight = marginRight;
    }

    /**
     * Draws the circle overlay representing the service radius from the location's address
     *
     */
    drawCircleOverlay(map, center, radius, options)
    {
        let s = this;
        let defaults = {map: map, center: center, radius: radius, fillColor: '#17f40c', fillOpacity: 0.3, strokeColor: '#fff', strokeWeight: 0};

        return new google.maps.Circle(Object.assign(defaults, options));
    }

    /**
     * Sets the radius around the location marker/address
     *
     * @param   {string}    containerID     - html id attribute of the element containing the map
     * @param   {Object}    map             - Google Maps map object
     */
    setServiceRadius(containerID, map)
    {
        let s = this;
        let radiusMiles = s.getRadius(containerID);

        map.radiusMeters = parseFloat(radiusMiles) * parseFloat(s.oneMileInMeters);
    }

    /**
     * Returns the value of the service radius field from the html form in
     * the current container
     *
     * @return {string} container - The radius around the location in miles.
     *                              If no value is set, returns 0
     */
    getRadius(container)
    {
        let radius = document.querySelector('#' + container + ' [name="' + this.serviceRadiusFieldName + '"]').value;

        return parseInt(radius) || 0;
    }

    /**
     * Adjusts the Google Maps map display to fit within
     * the bounds of the container in which it is displayed
     *
     * @param {Object}  map         - The current GoogleMaps.js instance object and all of its data.
     * @param {Object}  bounds      - Object representing the current bounds
     * @param {string}  [padding=0] - How much css padding to leave between the
     *                                edges of the map its container's edges.
     */
    mapFitBounds(map, bounds, padding = 0)
    {
        map.fitBounds(bounds, padding);
    }

    /**
     * Set the container object for the Google Maps map object
     *
     * @param {string} containerID - The html id attribute of the element containing
     *                               the Google Map display
     * @param {Object} map         - The current GoogleMaps.js instance object and all of its data.
     * @param {Object} mapDivName  - The html name attribute directly containing the
     *                               Google Map displayed
     */
    setMapContainer(containerID, map, mapDivName)
    {
        map.container = document.querySelector('#' + containerID  + ' [name="' + mapDivName + '"]');
    }

    /**
     * Sets the center coordinates object in this instance for use in a Goolge Maps map object
     *
     * @param {string}  containerID - The html id attribute of the div containing the map and form
     * @param   {Object}   map         - The Google Maps map object
     */
    setCenter(containerID, map)
    {
        map.center = {lat: this.getLatitude(containerID), lng: this.getLongitude(containerID)};
    }

    /**
     * Returns the latitude of the business location from the html form dispayed to the user as a float
     *
     * @param  {string}     container - The html id attribute of the element containing the map and form
     *
     * @return {Number}     Latitude represented as a float
     */
    getLatitude(container)
    {
        return parseFloat(document.querySelector('#' + container  + ' [name="' + this.latitudeElName + '"]').value);
    }

    /**
     * Returns the longitude of the business location from the html form dispayed to the user as a float
     *
     * @param  {string}     container - The html id attribute of the element containing the map and form
     *
     * @return {Number}     Longitude represented as a float
     */
    getLongitude(container)
    {
        return parseFloat(document.querySelector('#' + container  + ' [name="' + this.longitudeElName + '"]').value);
    }

    /**
     * Sets the name of the current CRUD process
     *
     * @param {Object} data - The data returned from ajaxProcessing.js in json format
     */
    setProc(data)
    {
        let s = this;
        let procs = ['add', 'update', 'fetch', 'delete'];

        if (procs.includes(data.proc)) {
            //only fetch
            s.proc = data.proc;
        } else {
            let id = data.data.form.id || data.data.form.attr('id');

            if (id.indexOf('add_') === 0) {
                s.proc = 'add';
            } else {
                s.proc = 'fetch';
            }
        }
    }

    /**
     * Sets the name/type of the html container that the user's current form
     * is displayed in. This is either the 'add_<moduleName>' or 'fetch_moduleName'
     * container
     *
     * @param {string}  data    - A string containing the html name attribute of
     *                            the container of the form/map
     */
    setContainerName(data)
    {
        this.containerName = data.indexOf('add') === 0 ? 'add' : 'fetch';
    }

    /**
     * Sets the html id attribute of the html container that the user's current form/map
     * is displayed in
     *
     * @param {string}  data    - The type of container. This will always be 'add' or 'fetch'
     */
    setContainerID(data)
    {
        this.containerID = this.page.containers[data].attributes.id;
    }

    /**
     * Sets the form id from the user's current html form id attribute
     *
     * @param {string}  module      - Name of the user's current module for the page.
     *                                For example, windowInstallers, verticals, etc...
     * @param {string}  containerID - The html id attribute of the container element of
     *                                the currently displayed form/map
     */
    setFormID(module, containerID)
    {
        if (!containerID) this.formID = module;

        this.formID = containerID + '_' + module;
    }

    /**
     * Sets the googleJSMapsAPI variable with the API key
     *
     * @param   {string}    googleJSMapsAPI     - The base url to the Google Maps JS API
     * @param   {string}    googleMapsAPIKey    - The API key given by Google for JS API access
     */
    setGoogleJSMapsAPI(googleJSMapsAPI, googleMapsAPIKey)
    {
        this.googleJSMapsAPI = googleJSMapsAPI.replace(/{{API-KEY}}/, googleMapsAPIKey);
    }

    /**
     * Asynchronously loads the Google Maps JS API into the user's page
     *
     * @param   {string} uri - The fully valid uri with valid
     *                       Google Maps JS API key embedded
     *
     * @return  {Object} A promise object to use once the JS API
     *                   is loaded into the browser
     */
    loadScriptAsync(uri)
    {
        return new Promise((resolve, reject) => {
            var tag = document.createElement('script');

            tag.src = uri;
            tag.async = true;

            tag.onload = () => {
                resolve();
            };

            var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        });
    }

    /**
     * Validates that the radius and center map coordinates are valid for use
     *
     * @param {string} container  - The html id attribute of the element containing
     *                              the user's form/map
     *
     * @return {boolean} If both are valid, returns true else false
     */
    areValidParams(container)
    {
        let s = this;
        let radius = s.isValidRadius(container);
        let center = s.isValidCenter(container);

        if (radius && center) return true;

        s.doReset('fetch', s.dpForms.getContainer(container));

        return false;
    }

    /**
     * Validates that the longitude and latitude are valid values
     *
     * @param {string} container  - The html id attribute of the element containing
     *                              the user's form/map
     *
     * @return {boolean} If both are valid, returns true else false
     */
    isValidCenter(container)
    {
        return this.getLatitude(container) && this.getLongitude(container);
    }

    /**
     * Validates that the service radius is a valid value
     *
     * @param {string} container  - The html id attribute of the element containing
     *                              the user's form/map
     *
     * @return {boolean} If both are valid, returns true else false
     */
    isValidRadius(container)
    {
        return Boolean(this.getRadius(container));
    }

    /**
     * Coordinates resetting the elements of the form used for and
     * with the Google Maps implementation
     *
     * @param {string} proc             - The current CRUD process
     * @param {string} [formID=false]   - The html id attribute of the user's
     *                                    current form
     */
    reset(proc, formID = false)
    {
        if (!formID && !proc.target) return false;

        let s = this;

        formID = formID || proc.target.form.id;
        proc = !proc.target ? proc : 'fetch';

        let containerName = s.dpForms.getContainer(formID);

        s.doReset(proc, containerName, formID);
    }

    /**
     * Resets form elements associated with the map
     *
     * @param {string} proc               - The current CRUD process
     * @param {string} containerName      - The type of container, 'add' or 'fetch'
     * @param {string} [elementID=false]  - The html id attribute of the element
     */
    doReset(proc, containerName, elementID = false)
    {
        let s = this;

        elementID = elementID || s.dpContainers.getID(containerName);

        s.removeMap(proc, containerName);
        s.emptyEditableLists(elementID);
        s.resetServiceRadius(elementID);
    }

    /**
     * Destroys the Google Maps map object and display
     *
     * @param {string} proc               - The current CRUD process
     * @param {string} containerName      - The type of container, 'add' or 'fetch'
     */
    removeMap(proc, containerName)
    {
        let s = this;
        let map;

        if (map = s.maps.get(containerName)) {
            map.container.innerHTML = '';

            if (proc !== 'update') {
                s.maps.delete(containerName);
            }
        }
    }

    /**
     * Removes the html within textarea elements that have editable lists/input ills
     *
     * @param {string}      element - The element which contains the editable lists
     *
     * @return {boolean}    If element is not provided, return false otherwise true
     */
    emptyEditableLists(element)
    {
        if (!element) return false;

        this.rF.emptyEditableLists(['location_service_zip_codes', 'location_service_cities'], element);

        return true;
    }

    /**
     * Resets the Service Radius select element to the first index
     *
     * @param {string}      element - The element which contains the editable lists
     *
     * @return {boolean}    If element is not provided, return false otherwise true
     */
    resetServiceRadius(element)
    {
        if (!element) return false;

        document.querySelector('#' + element + ' [name="' + this.serviceRadiusFieldName + '"]').selectedIndex = 0;

        return true;
    }
};