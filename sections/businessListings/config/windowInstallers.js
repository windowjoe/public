var dP = new DataPage('windowInstallers', 'window-installers', 'business-listings/window-installers');

//dP.dpForms.addDPBtn('add', 'cut');
dP.dpForms.addDPBtn('add', 'cut', 'crud');
dP.dpForms.rmDPBtn('update', 'update_order');

dP.setup(
    {
        objects: {
            instances: {
                sH: {
                    args: {
                        shSectionsBtns: {
                            containers: {
                                addSearch:
                                {
                                    icon: 'search',
                                    meta: true,
                                    title: 'Show Add Search',
                                    containerCollapsed: true,
                                    collapseContainer: '.addSearch_div_windowInstallers, .add_div_windowInstallers'
                                },
                                view:
                                {
                                    icon: 'eye',
                                    meta: true,
                                    title: 'Show View Search',
                                    containerCollapsed: true,
                                    collapseContainer: '.view_div_windowInstallers, .fetch_div_windowInstallers'

                                },
                                add: false
                            }
                        }
                    }
                }
            }
        },
        containers: [
            {name: 'addSearch', order: '300', parentContainer: 'headerBar'},
            {name: 'view', order: '301', parentContainer: 'headerBar'}
        ],
        forms: {
            common: {
                className: ''
            },
            standardForms: {
                add: {
                    dataAttributes: {updateDom: false},
                },
                update: {
                    initDoFetch: false,
                },
                addSearch: {
                    has: true,
                    parents: ['addSearch'],
                    layout: 'addSearch'
                },
                viewSearch: {
                    has: true,
                    parents: ['view'],
                    layout: 'viewSearch'
                }
            },
            layout: {
                addSearch: {
                    rows: {
                        searchBar: {
                            cols: {
                                st: {fieldNames: ['type', 'st'], colspan: 2},
                                city: {fieldNames: ['city'], colspan: 2},
                                installers: {fieldNames: ['installers'], colspan: 4}
                            }
                        }
                    }
                },
                viewSearch: {
                    rows: {
                        searchBar: {
                            cols: {
                                st: {fieldNames: ['view_state'], colspan: 2},
                                city: {fieldNames: ['view_city'], colspan: 2},
                                installers: {fieldNames: ['view_installer'], colspan: 4}
                            }
                        }
                    }
                },
                standardForms: {
                    rows: {
                        company: {
                            rowHeader: 'Company Information',
                            btns: true,
                            tabs: {
                                contact: {
                                    tabHeader: 'Contact',
                                    //active: true,
                                    cols: {
                                            contact_00: {
                                                fieldNames: ['company_name', 'contact_first', 'contact_last', 'contact_title', 'contact_gender'],
                                                colspan: 4,
                                                fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                            },
                                            contact_20: {
                                                fieldNames: ['phone_public_1', 'phone_public_2', 'phone_private_1', 'fax'],
                                                colspan: 4,
                                                fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                            },
                                            contact_30: {
                                                fieldNames: ['email_public_1', 'email_private_1', 'website', 'show_website', 'listing_claimed', 'active'],
                                                colspan: 4,
                                                fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                            }
                                        }
                                },
                                location: {
                                    tabHeader: 'Location',
                                    cols: {
                                            location_00: {
                                                fieldNames: ['location_zip', 'location_address_1', 'location_address_2', 'location_city', 'location_state', 'location_county',
                                                             'location_county_fips',
                                                             'location_cbsa', 'location_csa', 'location_latitude', 'location_longitude', 'location_coords_precision', 'location_address_type',
                                                             'location_type', 'location_year_first_appeared'],
                                                colspan: 4,
                                                fieldSettings: {addOnLeft: {className: 'addOn50Percent'}}
                                            },
                                            location_10: {
                                                fieldNames: ['mailing_zip', 'mailing_address_1', 'mailing_address_2', 'mailing_city', 'mailing_state'],
                                                colspan: 4,
                                                fieldSettings: {addOnLeft: {className: 'addOn50Percent'}}
                                            },
                                            location_20: {
                                                fieldNames: ['days_open', 'time_open', 'time_closed', 'location_time_zone', 'location_utc_offset', 'location_dst'],
                                                colspan: 2,
                                                fieldSettings: {addOnLeft: {className: 'addOn50Percent'}}
                                            },
                                            location_30: {
                                                fieldNames: ['location_carrier_route', 'location_delivery_point', 'location_delivery_point_check_digit',
                                                             'location_delivery_point_bar_code',
                                                             'location_elot_sequence', 'location_elot_sort', 'location_rdi', 'location_congressional_district',
                                                             'mailing_carrier_route', 'mailing_delivery_point', 'mailing_delivery_point_check_digit',
                                                             'mailing_delivery_point_bar_code'],
                                                colspan: 2,
                                                fieldSettings: {addOnLeft: {className: 'addOn60Percent'}}
                                            }
                                        }
                                },
                                company_details_01: {
                                    tabHeader: 'Company Details',
                                    cols: {
                                        company_description: {
                                            fieldNames: ['company_description'],
                                            colspan: 12,
                                            fieldSettings: {addOnLeft: {className: 'addOn70'}}
                                        }
                                    }
                                },
                                service_details: {
                                    tabHeader: 'Service Details',
                                    active: true,
                                    cols: {
                                        co_details_col_1: {
                                            fieldNames: ['categories_code', 'location_service_radius'],
                                            colspan: 2,
                                            fieldSettings: {addOnLeft: {className: 'addOn50Percent'}}
                                        },
                                        co_details_col_2: {
                                            fieldNames: ['location_service_map'],
                                            colspan: 5
                                        },
                                        co_details_col_3: {
                                            fieldNames: ['location_service_zip_codes', 'location_service_cities'],
                                            colspan: 5,
                                            fieldSettings: {addOnLeft: {className: 'addOn70'}}
                                        }
                                    }
                                },
                                marketing: {
                                    tabHeader: 'Marketing',
                                    cols: {
                                            stats_00: {
                                                fieldNames: ['employee_size_actual', 'employee_size_range', 'sales_volume_actual', 'sales_volume_range', 'credit_score_alpha', 'credit_score_numeric', 'org_type', 'infousa_id', 'window_companies_record_id'],
                                                colspan: 2,
                                                fieldSettings: {addOnLeft: {className: 'addOn55Percent'}}
                                            },
                                            stats_10: {
                                                fieldNames: ['primary_sic_orig', 'primary_sic', 'primary_sic_desc_orig', 'primary_sic_desc'],
                                                colspan: 3,
                                                fieldSettings: {addOnLeft: {className: 'addOn35Percent'}}
                                            },
                                            stats_11: {
                                                fieldNames: ['second_sic_orig', 'second_sic', 'second_sic_desc_orig', 'second_sic_desc'],
                                                colspan: 3,
                                                fieldSettings: {addOnLeft: {className: 'addOn35Percent'}}
                                            },
                                            stats_12: {
                                                fieldNames: ['third_sic_orig', 'third_sic', 'third_sic_desc_orig', 'third_sic_desc'],
                                                colspan: 3,
                                                fieldSettings: {addOnLeft: {className: 'addOn35Percent'}}
                                            }
                                        }
                                },
                                facebook_01: {
                                    tabHeader: 'Facebook',
                                    cols: {
                                        facebook_col_01: {fieldNames: ['facebook_url', 'facebook_username', 'facebook_id', 'facebook_is_claimed'], colspan: 2, fieldSettings: {addOnLeft: {className: 'addOn130'}}},
                                        facebook_col_02: {fieldNames: ['facebook_num_page_likes', 'facebook_num_of_ratings', 'facebook_avg_rating', 'facebook_prime_cat'], colspan: 2, fieldSettings: {addOnLeft: {className: 'addOn130'}}},
                                        facebook_col_03: {fieldNames: ['facebook_cats'], colspan: 4, fieldSettings: {addOnLeft: {className: 'addOn40'}}}
                                    }

                                },
                                yellow_pages_01: {
                                    tabHeader: 'Yellow Pages',
                                    cols: {
                                        yellow_pages_col_01: {fieldNames: ['yellow_pages_url', 'yellow_pages_id', 'yellow_pages_is_claimed'], colspan: 2, fieldSettings: {addOnLeft: {className: 'addOn130'}}},
                                        yellow_pages_col_02: {fieldNames: ['yellow_pages_num_of_ratings', 'yellow_pages_avg_rating', 'yellow_pages_prime_cat'], colspan: 2, fieldSettings: {addOnLeft: {className: 'addOn130'}}},
                                        yellow_pages_col_03: {fieldNames: ['yellow_pages_cats'], colspan: 4, fieldSettings: {addOnLeft: {className: 'addOn40'}}},
                                        yellow_pages_col_04: {fieldNames: ['yellow_pages_ad_size'], colspan: 2, fieldSettings: {addOnLeft: {className: 'addOn40'}}}
                                    }
                                },
                                instgram_01: {
                                    tabHeader: 'Instagram',
                                    cols: {
                                        instagram: {fieldNames: ['instagram_url'], className: 'col_13_percent'}
                                    }
                                },
                                linked_in_01: {
                                    tabHeader: 'LinkedIn',
                                    cols: {
                                        linked_in: {fieldNames: ['linked_in_url'], className: 'col_13_percent'},
                                    }
                                },
                                pinterest_01: {
                                    tabHeader: 'Pinterest',
                                    cols: {
                                        pinterest: {fieldNames: ['pinterest_url'], className: 'col_13_percent'},
                                    }
                                },
                                twitter_01: {
                                    tabHeader: 'Twitter',
                                    cols: {
                                        twitter: {fieldNames: ['twitter_url'], className: 'col_13_percent'},
                                    }
                                },
                                yelp_01: {
                                    tabHeader: 'Yelp',
                                    cols: {
                                        yelp: {fieldNames: ['yelp_url'], className: 'col_13_percent'},
                                    }
                                },
                                you_tube_01: {
                                    tabHeader: 'You Tube',
                                    cols: {
                                        youtube: {fieldNames: ['you_tube_url'], className: 'col_13_percent'}
                                    }
                                },
                                internal_notes_01: {
                                    tabHeader: 'Internal',
                                    cols: {
                                        internal_notes_01: {
                                            fieldNames: ['internal_notes'],
                                            colspan: 12
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        fieldsArr: {
            standardForms: [
                'company_name',
                'contact_first',
                'contact_last',
                'contact_title',
                {contact_gender: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, {htmlStr: 'Male', value: 'Male'}, {htmlStr: 'Female', value: 'Female'}],
                    }
                }},
                {phone_public_1: {element: {id: 'phone_public_1', addClassName: 'mask phone-mask'}}},
                {phone_public_2: {element: {id: 'phone_public_2', addClassName: 'mask phone-mask'}}},
                {phone_private_1: {element: {id: 'phone_private_1', addClassName: 'mask phone-mask'}}},
                {fax: {element: {id: 'fax', addClassName: 'mask phone-mask'}}},
                'email_public_1',
                'email_private_1',
                {website: {
                    element: {
                        dataAttributes: {'addon-url': 'http://'},
                        addOnRight: {icon: 'external-link', htmlStr: '', className: 'add_on_slim pop_external_link_inactive', title: 'Add Link to Make Active'}
                    }
                }},
                {show_website: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, {htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}],
                    }
                }},
                {active: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, {htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}],
                    }
                }},
                {listing_claimed: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, {htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}],
                    }
                }},
                {mailing_zip: {
                    element: {
                        addClassName: 'zip',
                        attributes: {id: 'mailing_zip'}
                    }
                }},
                {mailing_address_1: ['id']},
                {mailing_address_2: ['id']},
                {mailing_city: ['id']},
                {mailing_state: {
                    element: {
                        tagName: 'select',
                        attributes: {id: 'state'},
                        optionVals: [{value: '', htmlStr: 'Choose'}, {value: 'AL', htmlStr: 'Alabama'}, {value: 'AK', htmlStr: 'Alaska'}, {value: 'AZ', htmlStr: 'Arizona'}, {value: 'AR', htmlStr: 'Arkansas'}, {value: 'CA', htmlStr: 'California'}, {value: 'CO', htmlStr: 'Colorado'}, {value: 'CT', htmlStr: 'Connecticut'}, {value: 'DE', htmlStr: 'Delaware'}, {value: 'FL', htmlStr: 'Florida'}, {value: 'GA', htmlStr: 'Georgia'}, {value: 'HI', htmlStr: 'Hawaii'}, {value: 'ID', htmlStr: 'Idaho'}, {value: 'IL', htmlStr: 'Illinois'}, {value: 'IN', htmlStr: 'Indiana'}, {value: 'IA', htmlStr: 'Iowa'}, {value: 'KS', htmlStr: 'Kansas'}, {value: 'KY', htmlStr: 'Kentucky'}, {value: 'LA', htmlStr: 'Louisiana'}, {value: 'ME', htmlStr: 'Maine'}, {value: 'MD', htmlStr: 'Maryland'}, {value: 'MA', htmlStr: 'Massachusetts'}, {value: 'MI', htmlStr: 'Michigan'}, {value: 'MN', htmlStr: 'Minnesota'}, {value: 'MS', htmlStr: 'Mississippi'}, {value: 'MO', htmlStr: 'Missouri'}, {value: 'MT', htmlStr: 'Montana'}, {value: 'NE', htmlStr: 'Nebraska'}, {value: 'NV', htmlStr: 'Nevada'}, {value: 'NH', htmlStr: 'New Hampshire'}, {value: 'NJ', htmlStr: 'New Jersey'}, {value: 'NM', htmlStr: 'New Mexico'}, {value: 'NY', htmlStr: 'New York'}, {value: 'ND', htmlStr: 'North Carolina'}, {value: 'NC', htmlStr: 'North Dakota'}, {value: 'OH', htmlStr: 'Ohio'}, {value: 'OK', htmlStr: 'Oklahoma'}, {value: 'OR', htmlStr: 'Oregon'}, {value: 'PA', htmlStr: 'Pennsylvania'}, {value: 'RI', htmlStr: 'Rhode Island'}, {value: 'SC', htmlStr: 'South Carolina'}, {value: 'SD', htmlStr: 'South Dakota'}, {value: 'TN', htmlStr: 'Tennessee'}, {value: 'TX', htmlStr: 'Texas'}, {value: 'UT', htmlStr: 'Utah'}, {value: 'VT', htmlStr: 'Vermont'}, {value: 'VA', htmlStr: 'Virginia'}, {value: 'WA', htmlStr: 'Washington'}, {value: 'DC', htmlStr: 'Washington DC'}, {value: 'WV', htmlStr: 'West Virginia'}, {value: 'WI', htmlStr: 'Wisconsin'}, {value: 'WY', htmlStr: 'Wyoming'}],
                    }
                }},
                'mailing_carrier_route',
                'mailing_delivery_point',
                {'mailing_delivery_point_check_digit': {
                    placeholder: 'Mailing Point Check Digit'
                }},
                {'mailing_delivery_point_bar_code': {
                    placeholder: 'Mailing Point Bar Code'
                }},
                {location_zip: {
                    element: {
                        addClassName: 'zip',
                        attributes: {id: 'location_zip'}
                    }
                }},
                {location_address_1: ['id']},
                {location_address_2: ['id']},
                {location_city: ['id']},
                {location_state: {
                    element: {
                        tagName: 'select',
                        attributes: {id: 'state'},
                        optionVals: [{value: '', htmlStr: 'State'}, {value: 'AL', htmlStr: 'Alabama'}, {value: 'AK', htmlStr: 'Alaska'}, {value: 'AZ', htmlStr: 'Arizona'}, {value: 'AR', htmlStr: 'Arkansas'}, {value: 'CA', htmlStr: 'California'}, {value: 'CO', htmlStr: 'Colorado'}, {value: 'CT', htmlStr: 'Connecticut'}, {value: 'DE', htmlStr: 'Delaware'}, {value: 'FL', htmlStr: 'Florida'}, {value: 'GA', htmlStr: 'Georgia'}, {value: 'HI', htmlStr: 'Hawaii'}, {value: 'ID', htmlStr: 'Idaho'}, {value: 'IL', htmlStr: 'Illinois'}, {value: 'IN', htmlStr: 'Indiana'}, {value: 'IA', htmlStr: 'Iowa'}, {value: 'KS', htmlStr: 'Kansas'}, {value: 'KY', htmlStr: 'Kentucky'}, {value: 'LA', htmlStr: 'Louisiana'}, {value: 'ME', htmlStr: 'Maine'}, {value: 'MD', htmlStr: 'Maryland'}, {value: 'MA', htmlStr: 'Massachusetts'}, {value: 'MI', htmlStr: 'Michigan'}, {value: 'MN', htmlStr: 'Minnesota'}, {value: 'MS', htmlStr: 'Mississippi'}, {value: 'MO', htmlStr: 'Missouri'}, {value: 'MT', htmlStr: 'Montana'}, {value: 'NE', htmlStr: 'Nebraska'}, {value: 'NV', htmlStr: 'Nevada'}, {value: 'NH', htmlStr: 'New Hampshire'}, {value: 'NJ', htmlStr: 'New Jersey'}, {value: 'NM', htmlStr: 'New Mexico'}, {value: 'NY', htmlStr: 'New York'}, {value: 'ND', htmlStr: 'North Carolina'}, {value: 'NC', htmlStr: 'North Dakota'}, {value: 'OH', htmlStr: 'Ohio'}, {value: 'OK', htmlStr: 'Oklahoma'}, {value: 'OR', htmlStr: 'Oregon'}, {value: 'PA', htmlStr: 'Pennsylvania'}, {value: 'RI', htmlStr: 'Rhode Island'}, {value: 'SC', htmlStr: 'South Carolina'}, {value: 'SD', htmlStr: 'South Dakota'}, {value: 'TN', htmlStr: 'Tennessee'}, {value: 'TX', htmlStr: 'Texas'}, {value: 'UT', htmlStr: 'Utah'}, {value: 'VT', htmlStr: 'Vermont'}, {value: 'VA', htmlStr: 'Virginia'}, {value: 'WA', htmlStr: 'Washington'}, {value: 'DC', htmlStr: 'Washington DC'}, {value: 'WV', htmlStr: 'West Virginia'}, {value: 'WI', htmlStr: 'Wisconsin'}, {value: 'WY', htmlStr: 'Wyoming'}],
                        multiSelect: false
                    }
                }},
                'location_county',
                {location_county_fips: {
                    placeholder: 'Location County FIPS'
                }},
                'location_latitude',
                'location_longitude',
                {location_coords_precision: {
                    element: {
                        tagName: 'select',
                        optionVals: [{htmlStr: 'Coords Precision', value: ''}, {htmlStr: 'Zip9 - Block', value: 'Zip9'}, {htmlStr: 'Zip8', value: 'Zip8'}, {htmlStr: 'Zip7', value: 'Zip7'}, {htmlStr: 'Zip6', value: 'Zip6'}, {htmlStr: 'Zip5 - City', value: 'Zip5'}]
                    }
                }},
                {location_address_type: {
                    element: {
                        tagName: 'select',
                        placeholder: 'Address Record Type',
                        optionVals: [{htmlStr: 'Record Type', value: ''}, {htmlStr: 'Firm', value: 'F'}, {htmlStr: 'General Delivery', value: 'G'}, {htmlStr: 'High Rise', value: 'H'}, {htmlStr: 'PO Box', value: 'P'}, {htmlStr: 'Rural Route', value: 'R'}, {htmlStr: 'Street Address', value: 'S'}]
                    }
                }},
                {location_type: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Location Type'}, 'Branch', 'Headquarters', 'Single Loc'],
                    }
                }},
                {location_cbsa: {
                    element: {
                        tagName: 'select',
                        placeholder: 'Location CBSA',
                        optionVals: [{htmlStr:'Location CBSA', value: ''}, {htmlStr: 'No CBSA', value: '-1'}, {htmlStr: 'Aberdeen, SD', value: '10100'}, {htmlStr: 'Aberdeen, WA', value: '10140'}, {htmlStr: 'Abilene, TX', value: '10180'}, {htmlStr: 'Ada, OK', value: '10220'}, {htmlStr: 'Adrian, MI', value: '10300'}, {htmlStr: 'Aguadilla-Isabela, PR', value: '10380'}, {htmlStr: 'Akron, OH', value: '10420'}, {htmlStr: 'Alamogordo, NM', value: '10460'}, {htmlStr: 'Albany, GA', value: '10500'}, {htmlStr: 'Albany-Lebanon, OR', value: '10540'}, {htmlStr: 'Albany-Schenectady-Troy, NY', value: '10580'}, {htmlStr: 'Albemarle, NC', value: '10620'}, {htmlStr: 'Albert Lea, MN', value: '10660'}, {htmlStr: 'Albertville, AL', value: '10700'}, {htmlStr: 'Albuquerque, NM', value: '10740'}, {htmlStr: 'Alexander City, AL', value: '10760'}, {htmlStr: 'Alexandria, LA', value: '10780'}, {htmlStr: 'Alexandria, MN', value: '10820'}, {htmlStr: 'Alice, TX', value: '10860'}, {htmlStr: 'Allentown-Bethlehem-Easton, PA-NJ', value: '10900'}, {htmlStr: 'Alma, MI', value: '10940'}, {htmlStr: 'Alpena, MI', value: '10980'}, {htmlStr: 'Altoona, PA', value: '11020'}, {htmlStr: 'Altus, OK', value: '11060'}, {htmlStr: 'Amarillo, TX', value: '11100'}, {htmlStr: 'Americus, GA', value: '11140'}, {htmlStr: 'Ames, IA', value: '11180'}, {htmlStr: 'Amsterdam, NY', value: '11220'}, {htmlStr: 'Anchorage, AK', value: '11260'}, {htmlStr: 'Andrews, TX', value: '11380'}, {htmlStr: 'Angola, IN', value: '11420'}, {htmlStr: 'Ann Arbor, MI', value: '11460'}, {htmlStr: 'Anniston-Oxford, AL', value: '11500'}, {htmlStr: 'Appleton, WI', value: '11540'}, {htmlStr: 'Arcadia, FL', value: '11580'}, {htmlStr: 'Ardmore, OK', value: '11620'}, {htmlStr: 'Arecibo, PR', value: '11640'}, {htmlStr: 'Arkadelphia, AR', value: '11660'}, {htmlStr: 'Asheville, NC', value: '11700'}, {htmlStr: 'Ashland, OH', value: '11740'}, {htmlStr: 'Ashtabula, OH', value: '11780'}, {htmlStr: 'Astoria, OR', value: '11820'}, {htmlStr: 'Atchison, KS', value: '11860'}, {htmlStr: 'Athens, OH', value: '11900'}, {htmlStr: 'Athens, TN', value: '11940'}, {htmlStr: 'Athens, TX', value: '11980'}, {htmlStr: 'Athens-Clarke County, GA', value: '12020'}, {htmlStr: 'Atlanta-Sandy Springs-Alpharetta, GA', value: '12060'}, {htmlStr: 'Atlantic City-Hammonton, NJ', value: '12100'}, {htmlStr: 'Atmore, AL', value: '12120'}, {htmlStr: 'Auburn, IN', value: '12140'}, {htmlStr: 'Auburn, NY', value: '12180'}, {htmlStr: 'Auburn-Opelika, AL', value: '12220'}, {htmlStr: 'Augusta-Richmond County, GA-SC', value: '12260'}, {htmlStr: 'Augusta-Waterville, ME', value: '12300'}, {htmlStr: 'Austin, MN', value: '12380'}, {htmlStr: 'Austin-Round Rock-Georgetown, TX', value: '12420'}, {htmlStr: 'Bainbridge, GA', value: '12460'}, {htmlStr: 'Bakersfield, CA', value: '12540'}, {htmlStr: 'Baltimore-Columbia-Towson, MD', value: '12580'}, {htmlStr: 'Bangor, ME', value: '12620'}, {htmlStr: 'Baraboo, WI', value: '12660'}, {htmlStr: 'Bardstown, KY', value: '12680'}, {htmlStr: 'Barnstable Town, MA', value: '12700'}, {htmlStr: 'Barre, VT', value: '12740'}, {htmlStr: 'Bartlesville, OK', value: '12780'}, {htmlStr: 'Batavia, NY', value: '12860'}, {htmlStr: 'Batesville, AR', value: '12900'}, {htmlStr: 'Baton Rouge, LA', value: '12940'}, {htmlStr: 'Battle Creek, MI', value: '12980'}, {htmlStr: 'Bay City, MI', value: '13020'}, {htmlStr: 'Bay City, TX', value: '13060'}, {htmlStr: 'Beatrice, NE', value: '13100'}, {htmlStr: 'Beaumont-Port Arthur, TX', value: '13140'}, {htmlStr: 'Beaver Dam, WI', value: '13180'}, {htmlStr: 'Beckley, WV', value: '13220'}, {htmlStr: 'Bedford, IN', value: '13260'}, {htmlStr: 'Beeville, TX', value: '13300'}, {htmlStr: 'Bellefontaine, OH', value: '13340'}, {htmlStr: 'Bellingham, WA', value: '13380'}, {htmlStr: 'Bemidji, MN', value: '13420'}, {htmlStr: 'Bend, OR', value: '13460'}, {htmlStr: 'Bennettsville, SC', value: '13500'}, {htmlStr: 'Bennington, VT', value: '13540'}, {htmlStr: 'Berlin, NH', value: '13620'}, {htmlStr: 'Big Rapids, MI', value: '13660'}, {htmlStr: 'Big Spring, TX', value: '13700'}, {htmlStr: 'Big Stone Gap, VA', value: '13720'}, {htmlStr: 'Billings, MT', value: '13740'}, {htmlStr: 'Binghamton, NY', value: '13780'}, {htmlStr: 'Birmingham-Hoover, AL', value: '13820'}, {htmlStr: 'Bismarck, ND', value: '13900'}, {htmlStr: 'Blackfoot, ID', value: '13940'}, {htmlStr: 'Blacksburg-Christiansburg, VA', value: '13980'}, {htmlStr: 'Bloomington, IL', value: '14010'}, {htmlStr: 'Bloomington, IN', value: '14020'}, {htmlStr: 'Bloomsburg-Berwick, PA', value: '14100'}, {htmlStr: 'Bluefield, WV-VA', value: '14140'}, {htmlStr: 'Blytheville, AR', value: '14180'}, {htmlStr: 'Bogalusa, LA', value: '14220'}, {htmlStr: 'Boise City, ID', value: '14260'}, {htmlStr: 'Bonham, TX', value: '14300'}, {htmlStr: 'Boone, NC', value: '14380'}, {htmlStr: 'Borger, TX', value: '14420'}, {htmlStr: 'Boston-Cambridge-Newton, MA-NH', value: '14460'}, {htmlStr: 'Boston-Cambridge-Newton, MA-NH', value: '14460'}, {htmlStr: 'Boston-Cambridge-Newton, MA-NH', value: '14460'}, {htmlStr: 'Boulder, CO', value: '14500'}, {htmlStr: 'Bowling Green, KY', value: '14540'}, {htmlStr: 'Bozeman, MT', value: '14580'}, {htmlStr: 'Bradford, PA', value: '14620'}, {htmlStr: 'Brainerd, MN', value: '14660'}, {htmlStr: 'Branson, MO', value: '14700'}, {htmlStr: 'Breckenridge, CO', value: '14720'}, {htmlStr: 'Bremerton-Silverdale-Port Orchard, WA', value: '14740'}, {htmlStr: 'Brenham, TX', value: '14780'}, {htmlStr: 'Brevard, NC', value: '14820'}, {htmlStr: 'Bridgeport-Stamford-Norwalk, CT', value: '14860'}, {htmlStr: 'Brookhaven, MS', value: '15020'}, {htmlStr: 'Brookings, OR', value: '15060'}, {htmlStr: 'Brookings, SD', value: '15100'}, {htmlStr: 'Brownsville, TN', value: '15140'}, {htmlStr: 'Brownsville-Harlingen, TX', value: '15180'}, {htmlStr: 'Brownwood, TX', value: '15220'}, {htmlStr: 'Brunswick, GA', value: '15260'}, {htmlStr: 'Bucyrus-Galion, OH', value: '15340'}, {htmlStr: 'Buffalo-Cheektowaga, NY', value: '15380'}, {htmlStr: 'Burley, ID', value: '15420'}, {htmlStr: 'Burlington, IA-IL', value: '15460'}, {htmlStr: 'Burlington, NC', value: '15500'}, {htmlStr: 'Burlington-South Burlington, VT', value: '15540'}, {htmlStr: 'Butte-Silver Bow, MT', value: '15580'}, {htmlStr: 'Ca?on City, CO', value: '15860'}, {htmlStr: 'Cadillac, MI', value: '15620'}, {htmlStr: 'Calhoun, GA', value: '15660'}, {htmlStr: 'California-Lexington Park, MD', value: '15680'}, {htmlStr: 'Cambridge, MD', value: '15700'}, {htmlStr: 'Cambridge, OH', value: '15740'}, {htmlStr: 'Camden, AR', value: '15780'}, {htmlStr: 'Campbellsville, KY', value: '15820'}, {htmlStr: 'Canton-Massillon, OH', value: '15940'}, {htmlStr: 'Cape Coral-Fort Myers, FL', value: '15980'}, {htmlStr: 'Cape Girardeau, MO-IL', value: '16020'}, {htmlStr: 'Carbondale-Marion, IL', value: '16060'}, {htmlStr: 'Carlsbad-Artesia, NM', value: '16100'}, {htmlStr: 'Carroll, IA', value: '16140'}, {htmlStr: 'Carson City, NV', value: '16180'}, {htmlStr: 'Casper, WY', value: '16220'}, {htmlStr: 'Cedar City, UT', value: '16260'}, {htmlStr: 'Cedar Rapids, IA', value: '16300'}, {htmlStr: 'Cedartown, GA', value: '16340'}, {htmlStr: 'Celina, OH', value: '16380'}, {htmlStr: 'Central City, KY', value: '16420'}, {htmlStr: 'Centralia, IL', value: '16460'}, {htmlStr: 'Centralia, WA', value: '16500'}, {htmlStr: 'Chambersburg-Waynesboro, PA', value: '16540'}, {htmlStr: 'Champaign-Urbana, IL', value: '16580'}, {htmlStr: 'Charleston, WV', value: '16620'}, {htmlStr: 'Charleston-Mattoon, IL', value: '16660'}, {htmlStr: 'Charleston-North Charleston, SC', value: '16700'}, {htmlStr: 'Charlotte-Concord-Gastonia, NC-SC', value: '16740'}, {htmlStr: 'Charlottesville, VA', value: '16820'}, {htmlStr: 'Chattanooga, TN-GA', value: '16860'}, {htmlStr: 'Cheyenne, WY', value: '16940'}, {htmlStr: 'Chicago-Naperville-Elgin, IL-IN-WI', value: '16980'}, {htmlStr: 'Chicago-Naperville-Elgin, IL-IN-WI', value: '16980'}, {htmlStr: 'Chicago-Naperville-Elgin, IL-IN-WI', value: '16980'}, {htmlStr: 'Chicago-Naperville-Elgin, IL-IN-WI', value: '16980'}, {htmlStr: 'Chico, CA', value: '17020'}, {htmlStr: 'Chillicothe, OH', value: '17060'}, {htmlStr: 'Cincinnati, OH-KY-IN', value: '17140'}, {htmlStr: 'Clarksburg, WV', value: '17220'}, {htmlStr: 'Clarksdale, MS', value: '17260'}, {htmlStr: 'Clarksville, TN-KY', value: '17300'}, {htmlStr: 'Clearlake, CA', value: '17340'}, {htmlStr: 'Cleveland, MS', value: '17380'}, {htmlStr: 'Cleveland, TN', value: '17420'}, {htmlStr: 'Cleveland-Elyria, OH', value: '17460'}, {htmlStr: 'Clewiston, FL', value: '17500'}, {htmlStr: 'Clinton, IA', value: '17540'}, {htmlStr: 'Clovis, NM', value: '17580'}, {htmlStr: 'Coamo, PR', value: '17620'}, {htmlStr: 'Coco, PR', value: '17640'}, {htmlStr: 'Coeur dAlene, ID', value: '17660'}, {htmlStr: 'Coffeyville, KS', value: '17700'}, {htmlStr: 'Coldwater, MI', value: '17740'}, {htmlStr: 'College Station-Bryan, TX', value: '17780'}, {htmlStr: 'Colorado Springs, CO', value: '17820'}, {htmlStr: 'Columbia, MO', value: '17860'}, {htmlStr: 'Columbia, SC', value: '17900'}, {htmlStr: 'Columbus, GA-AL', value: '17980'}, {htmlStr: 'Columbus, IN', value: '18020'}, {htmlStr: 'Columbus, MS', value: '18060'}, {htmlStr: 'Columbus, NE', value: '18100'}, {htmlStr: 'Columbus, OH', value: '18140'}, {htmlStr: 'Concord, NH', value: '18180'}, {htmlStr: 'Connersville, IN', value: '18220'}, {htmlStr: 'Cookeville, TN', value: '18260'}, {htmlStr: 'Coos Bay, OR', value: '18300'}, {htmlStr: 'Cordele, GA', value: '18380'}, {htmlStr: 'Corinth, MS', value: '18420'}, {htmlStr: 'Cornelia, GA', value: '18460'}, {htmlStr: 'Corning, NY', value: '18500'}, {htmlStr: 'Corpus Christi, TX', value: '18580'}, {htmlStr: 'Corsicana, TX', value: '18620'}, {htmlStr: 'Cortland, NY', value: '18660'}, {htmlStr: 'Corvallis, OR', value: '18700'}, {htmlStr: 'Coshocton, OH', value: '18740'}, {htmlStr: 'Craig, CO', value: '18780'}, {htmlStr: 'Crawfordsville, IN', value: '18820'}, {htmlStr: 'Crescent City, CA', value: '18860'}, {htmlStr: 'Crestview-Fort Walton Beach-Destin, FL', value: '18880'}, {htmlStr: 'Crossville, TN', value: '18900'}, {htmlStr: 'Cullman, AL', value: '18980'}, {htmlStr: 'Cullowhee, NC', value: '19000'}, {htmlStr: 'Cumberland, MD-WV', value: '19060'}, {htmlStr: 'Dallas-Fort Worth-Arlington, TX', value: '19100'}, {htmlStr: 'Dallas-Fort Worth-Arlington, TX', value: '19100'}, {htmlStr: 'Dalton, GA', value: '19140'}, {htmlStr: 'Danville, IL', value: '19180'}, {htmlStr: 'Danville, KY', value: '19220'}, {htmlStr: 'Danville, VA', value: '19260'}, {htmlStr: 'Daphne-Fairhope-Foley, AL', value: '19300'}, {htmlStr: 'Davenport-Moline-Rock Island, IA-IL', value: '19340'}, {htmlStr: 'Dayton, TN', value: '19420'}, {htmlStr: 'Dayton-Kettering, OH', value: '19430'}, {htmlStr: 'Decatur, AL', value: '19460'}, {htmlStr: 'Decatur, IL', value: '19500'}, {htmlStr: 'Decatur, IN', value: '19540'}, {htmlStr: 'Defiance, OH', value: '19580'}, {htmlStr: 'Del Rio, TX', value: '19620'}, {htmlStr: 'Deltona-Daytona Beach-Ormond Beach, FL', value: '19660'}, {htmlStr: 'Deming, NM', value: '19700'}, {htmlStr: 'Denver-Aurora-Lakewood, CO', value: '19740'}, {htmlStr: 'DeRidder, LA', value: '19760'}, {htmlStr: 'Des Moines-West Des Moines, IA', value: '19780'}, {htmlStr: 'Detroit-Warren-Dearborn, MI', value: '19820'}, {htmlStr: 'Detroit-Warren-Dearborn, MI', value: '19820'}, {htmlStr: 'Dickinson, ND', value: '19860'}, {htmlStr: 'Dixon, IL', value: '19940'}, {htmlStr: 'Dodge City, KS', value: '19980'}, {htmlStr: 'Dothan, AL', value: '20020'}, {htmlStr: 'Douglas, GA', value: '20060'}, {htmlStr: 'Dover, DE', value: '20100'}, {htmlStr: 'Dublin, GA', value: '20140'}, {htmlStr: 'DuBois, PA', value: '20180'}, {htmlStr: 'Dubuque, IA', value: '20220'}, {htmlStr: 'Duluth, MN-WI', value: '20260'}, {htmlStr: 'Dumas, TX', value: '20300'}, {htmlStr: 'Duncan, OK', value: '20340'}, {htmlStr: 'Durango, CO', value: '20420'}, {htmlStr: 'Durant, OK', value: '20460'}, {htmlStr: 'Durham-Chapel Hill, NC', value: '20500'}, {htmlStr: 'Dyersburg, TN', value: '20540'}, {htmlStr: 'Eagle Pass, TX', value: '20580'}, {htmlStr: 'East Stroudsburg, PA', value: '20700'}, {htmlStr: 'Easton, MD', value: '20660'}, {htmlStr: 'Eau Claire, WI', value: '20740'}, {htmlStr: 'Edwards, CO', value: '20780'}, {htmlStr: 'Effingham, IL', value: '20820'}, {htmlStr: 'El Campo, TX', value: '20900'}, {htmlStr: 'El Centro, CA', value: '20940'}, {htmlStr: 'El Dorado, AR', value: '20980'}, {htmlStr: 'El Paso, TX', value: '21340'}, {htmlStr: 'Elizabeth City, NC', value: '21020'}, {htmlStr: 'Elizabethtown-Fort Knox, KY', value: '21060'}, {htmlStr: 'Elk City, OK', value: '21120'}, {htmlStr: 'Elkhart-Goshen, IN', value: '21140'}, {htmlStr: 'Elkins, WV', value: '21180'}, {htmlStr: 'Elko, NV', value: '21220'}, {htmlStr: 'Ellensburg, WA', value: '21260'}, {htmlStr: 'Elmira, NY', value: '21300'}, {htmlStr: 'Emporia, KS', value: '21380'}, {htmlStr: 'Enid, OK', value: '21420'}, {htmlStr: 'Enterprise, AL', value: '21460'}, {htmlStr: 'Erie, PA', value: '21500'}, {htmlStr: 'Escanaba, MI', value: '21540'}, {htmlStr: 'Espa?ola, NM', value: '21580'}, {htmlStr: 'Eufaula, AL-GA', value: '21640'}, {htmlStr: 'Eugene-Springfield, OR', value: '21660'}, {htmlStr: 'Eureka-Arcata, CA', value: '21700'}, {htmlStr: 'Evanston, WY', value: '21740'}, {htmlStr: 'Evansville, IN-KY', value: '21780'}, {htmlStr: 'Fairbanks, AK', value: '21820'}, {htmlStr: 'Fairfield, IA', value: '21840'}, {htmlStr: 'Fairmont, MN', value: '21860'}, {htmlStr: 'Fairmont, WV', value: '21900'}, {htmlStr: 'Fallon, NV', value: '21980'}, {htmlStr: 'Fargo, ND-MN', value: '22020'}, {htmlStr: 'Faribault-Northfield, MN', value: '22060'}, {htmlStr: 'Farmington, MO', value: '22100'}, {htmlStr: 'Farmington, NM', value: '22140'}, {htmlStr: 'Fayetteville, NC', value: '22180'}, {htmlStr: 'Fayetteville-Springdale-Rogers, AR', value: '22220'}, {htmlStr: 'Fergus Falls, MN', value: '22260'}, {htmlStr: 'Fernley, NV', value: '22280'}, {htmlStr: 'Findlay, OH', value: '22300'}, {htmlStr: 'Fitzgerald, GA', value: '22340'}, {htmlStr: 'Flagstaff, AZ', value: '22380'}, {htmlStr: 'Flint, MI', value: '22420'}, {htmlStr: 'Florence, SC', value: '22500'}, {htmlStr: 'Florence-Muscle Shoals, AL', value: '22520'}, {htmlStr: 'Fond du Lac, WI', value: '22540'}, {htmlStr: 'Forest City, NC', value: '22580'}, {htmlStr: 'Forrest City, AR', value: '22620'}, {htmlStr: 'Fort Collins, CO', value: '22660'}, {htmlStr: 'Fort Dodge, IA', value: '22700'}, {htmlStr: 'Fort Leonard Wood, MO', value: '22780'}, {htmlStr: 'Fort Madison-Keokuk, IA-IL-MO', value: '22800'}, {htmlStr: 'Fort Morgan, CO', value: '22820'}, {htmlStr: 'Fort Payne, AL', value: '22840'}, {htmlStr: 'Fort Polk South, LA', value: '22860'}, {htmlStr: 'Fort Smith, AR-OK', value: '22900'}, {htmlStr: 'Fort Wayne, IN', value: '23060'}, {htmlStr: 'Frankfort, IN', value: '23140'}, {htmlStr: 'Frankfort, KY', value: '23180'}, {htmlStr: 'Fredericksburg, TX', value: '23240'}, {htmlStr: 'Freeport, IL', value: '23300'}, {htmlStr: 'Fremont, NE', value: '23340'}, {htmlStr: 'Fremont, OH', value: '23380'}, {htmlStr: 'Fresno, CA', value: '23420'}, {htmlStr: 'Gadsden, AL', value: '23460'}, {htmlStr: 'Gaffney, SC', value: '23500'}, {htmlStr: 'Gainesville, FL', value: '23540'}, {htmlStr: 'Gainesville, GA', value: '23580'}, {htmlStr: 'Gainesville, TX', value: '23620'}, {htmlStr: 'Galesburg, IL', value: '23660'}, {htmlStr: 'Gallup, NM', value: '23700'}, {htmlStr: 'Garden City, KS', value: '23780'}, {htmlStr: 'Gardnerville Ranchos, NV', value: '23820'}, {htmlStr: 'Georgetown, SC', value: '23860'}, {htmlStr: 'Gettysburg, PA', value: '23900'}, {htmlStr: 'Gillette, WY', value: '23940'}, {htmlStr: 'Glasgow, KY', value: '23980'}, {htmlStr: 'Glens Falls, NY', value: '24020'}, {htmlStr: 'Glenwood Springs, CO', value: '24060'}, {htmlStr: 'Gloversville, NY', value: '24100'}, {htmlStr: 'Goldsboro, NC', value: '24140'}, {htmlStr: 'Granbury, TX', value: '24180'}, {htmlStr: 'Grand Forks, ND-MN', value: '24220'}, {htmlStr: 'Grand Island, NE', value: '24260'}, {htmlStr: 'Grand Junction, CO', value: '24300'}, {htmlStr: 'Grand Rapids, MN', value: '24330'}, {htmlStr: 'Grand Rapids-Kentwood, MI', value: '24340'}, {htmlStr: 'Grants Pass, OR', value: '24420'}, {htmlStr: 'Grants, NM', value: '24380'}, {htmlStr: 'Great Bend, KS', value: '24460'}, {htmlStr: 'Great Falls, MT', value: '24500'}, {htmlStr: 'Greeley, CO', value: '24540'}, {htmlStr: 'Green Bay, WI', value: '24580'}, {htmlStr: 'Greeneville, TN', value: '24620'}, {htmlStr: 'Greensboro-High Point, NC', value: '24660'}, {htmlStr: 'Greensburg, IN', value: '24700'}, {htmlStr: 'Greenville, MS', value: '24740'}, {htmlStr: 'Greenville, NC', value: '24780'}, {htmlStr: 'Greenville, OH', value: '24820'}, {htmlStr: 'Greenville-Anderson, SC', value: '24860'}, {htmlStr: 'Greenwood, MS', value: '24900'}, {htmlStr: 'Greenwood, SC', value: '24940'}, {htmlStr: 'Grenada, MS', value: '24980'}, {htmlStr: 'Guayama, PR', value: '25020'}, {htmlStr: 'Gulfport-Biloxi, MS', value: '25060'}, {htmlStr: 'Guymon, OK', value: '25100'}, {htmlStr: 'Hagerstown-Martinsburg, MD-WV', value: '25180'}, {htmlStr: 'Hailey, ID', value: '25200'}, {htmlStr: 'Hammond, LA', value: '25220'}, {htmlStr: 'Hanford-Corcoran, CA', value: '25260'}, {htmlStr: 'Hannibal, MO', value: '25300'}, {htmlStr: 'Harrisburg-Carlisle, PA', value: '25420'}, {htmlStr: 'Harrison, AR', value: '25460'}, {htmlStr: 'Harrisonburg, VA', value: '25500'}, {htmlStr: 'Hartford-East Hartford-Middletown, CT', value: '25540'}, {htmlStr: 'Hastings, NE', value: '25580'}, {htmlStr: 'Hattiesburg, MS', value: '25620'}, {htmlStr: 'Hays, KS', value: '25700'}, {htmlStr: 'Heber, UT', value: '25720'}, {htmlStr: 'Helena, MT', value: '25740'}, {htmlStr: 'Helena-West Helena, AR', value: '25760'}, {htmlStr: 'Henderson, NC', value: '25780'}, {htmlStr: 'Hereford, TX', value: '25820'}, {htmlStr: 'Hermiston-Pendleton, OR', value: '25840'}, {htmlStr: 'Hickory-Lenoir-Morganton, NC', value: '25860'}, {htmlStr: 'Hillsdale, MI', value: '25880'}, {htmlStr: 'Hilo, HI', value: '25900'}, {htmlStr: 'Hilton Head Island-Bluffton, SC', value: '25940'}, {htmlStr: 'Hinesville, GA', value: '25980'}, {htmlStr: 'Hobbs, NM', value: '26020'}, {htmlStr: 'Holland, MI', value: '26090'}, {htmlStr: 'Homosassa Springs, FL', value: '26140'}, {htmlStr: 'Hood River, OR', value: '26220'}, {htmlStr: 'Hope, AR', value: '26260'}, {htmlStr: 'Hot Springs, AR', value: '26300'}, {htmlStr: 'Houghton, MI', value: '26340'}, {htmlStr: 'Houma-Thibodaux, LA', value: '26380'}, {htmlStr: 'Houston-The Woodlands-Sugar Land, TX', value: '26420'}, {htmlStr: 'Hudson, NY', value: '26460'}, {htmlStr: 'Huntingdon, PA', value: '26500'}, {htmlStr: 'Huntington, IN', value: '26540'}, {htmlStr: 'Huntington-Ashland, WV-KY-OH', value: '26580'}, {htmlStr: 'Huntsville, AL', value: '26620'}, {htmlStr: 'Huntsville, TX', value: '26660'}, {htmlStr: 'Huron, SD', value: '26700'}, {htmlStr: 'Hutchinson, KS', value: '26740'}, {htmlStr: 'Hutchinson, MN', value: '26780'}, {htmlStr: 'Idaho Falls, ID', value: '26820'}, {htmlStr: 'Indiana, PA', value: '26860'}, {htmlStr: 'Indianapolis-Carmel-Anderson, IN', value: '26900'}, {htmlStr: 'Indianola, MS', value: '26940'}, {htmlStr: 'Iowa City, IA', value: '26980'}, {htmlStr: 'Iron Mountain, MI-WI', value: '27020'}, {htmlStr: 'Ithaca, NY', value: '27060'}, {htmlStr: 'Jackson, MI', value: '27100'}, {htmlStr: 'Jackson, MS', value: '27140'}, {htmlStr: 'Jackson, OH', value: '27160'}, {htmlStr: 'Jackson, TN', value: '27180'}, {htmlStr: 'Jackson, WY-ID', value: '27220'}, {htmlStr: 'Jacksonville, FL', value: '27260'}, {htmlStr: 'Jacksonville, IL', value: '27300'}, {htmlStr: 'Jacksonville, NC', value: '27340'}, {htmlStr: 'Jacksonville, TX', value: '27380'}, {htmlStr: 'Jamestown, ND', value: '27420'}, {htmlStr: 'Jamestown-Dunkirk-Fredonia, NY', value: '27460'}, {htmlStr: 'Janesville-Beloit, WI', value: '27500'}, {htmlStr: 'Jasper, AL', value: '27530'}, {htmlStr: 'Jasper, IN', value: '27540'}, {htmlStr: 'Jayuya, PR', value: '27580'}, {htmlStr: 'Jefferson City, MO', value: '27620'}, {htmlStr: 'Jefferson, GA', value: '27600'}, {htmlStr: 'Jennings, LA', value: '27660'}, {htmlStr: 'Jesup, GA', value: '27700'}, {htmlStr: 'Johnson City, TN', value: '27740'}, {htmlStr: 'Johnstown, PA', value: '27780'}, {htmlStr: 'Jonesboro, AR', value: '27860'}, {htmlStr: 'Joplin, MO', value: '27900'}, {htmlStr: 'Juneau, AK', value: '27940'}, {htmlStr: 'Kahului-Wailuku-Lahaina, HI', value: '27980'}, {htmlStr: 'Kalamazoo-Portage, MI', value: '28020'}, {htmlStr: 'Kalispell, MT', value: '28060'}, {htmlStr: 'Kankakee, IL', value: '28100'}, {htmlStr: 'Kansas City, MO-KS', value: '28140'}, {htmlStr: 'Kapaa, HI', value: '28180'}, {htmlStr: 'Kearney, NE', value: '28260'}, {htmlStr: 'Keene, NH', value: '28300'}, {htmlStr: 'Kendallville, IN', value: '28340'}, {htmlStr: 'Kennett, MO', value: '28380'}, {htmlStr: 'Kennewick-Richland, WA', value: '28420'}, {htmlStr: 'Kerrville, TX', value: '28500'}, {htmlStr: 'Ketchikan, AK', value: '28540'}, {htmlStr: 'Key West, FL', value: '28580'}, {htmlStr: 'Kill Devil Hills, NC', value: '28620'}, {htmlStr: 'Killeen-Temple, TX', value: '28660'}, {htmlStr: 'Kingsport-Bristol, TN-VA', value: '28700'}, {htmlStr: 'Kingston, NY', value: '28740'}, {htmlStr: 'Kingsville, TX', value: '28780'}, {htmlStr: 'Kinston, NC', value: '28820'}, {htmlStr: 'Kirksville, MO', value: '28860'}, {htmlStr: 'Klamath Falls, OR', value: '28900'}, {htmlStr: 'Knoxville, TN', value: '28940'}, {htmlStr: 'Kokomo, IN', value: '29020'}, {htmlStr: 'La Crosse-Onalaska, WI-MN', value: '29100'}, {htmlStr: 'La Grande, OR', value: '29260'}, {htmlStr: 'Laconia, NH', value: '29060'}, {htmlStr: 'Lafayette, LA', value: '29180'}, {htmlStr: 'Lafayette-West Lafayette, IN', value: '29200'}, {htmlStr: 'LaGrange, GA-AL', value: '29300'}, {htmlStr: 'Lake Charles, LA', value: '29340'}, {htmlStr: 'Lake City, FL', value: '29380'}, {htmlStr: 'Lake Havasu City-Kingman, AZ', value: '29420'}, {htmlStr: 'Lakeland-Winter Haven, FL', value: '29460'}, {htmlStr: 'Lamesa, TX', value: '29500'}, {htmlStr: 'Lancaster, PA', value: '29540'}, {htmlStr: 'Lansing-East Lansing, MI', value: '29620'}, {htmlStr: 'Laramie, WY', value: '29660'}, {htmlStr: 'Laredo, TX', value: '29700'}, {htmlStr: 'Las Cruces, NM', value: '29740'}, {htmlStr: 'Las Vegas, NM', value: '29780'}, {htmlStr: 'Las Vegas-Henderson-Paradise, NV', value: '29820'}, {htmlStr: 'Laurel, MS', value: '29860'}, {htmlStr: 'Laurinburg, NC', value: '29900'}, {htmlStr: 'Lawrence, KS', value: '29940'}, {htmlStr: 'Lawrenceburg, TN', value: '29980'}, {htmlStr: 'Lawton, OK', value: '30020'}, {htmlStr: 'Lebanon, MO', value: '30060'}, {htmlStr: 'Lebanon, NH-VT', value: '30100'}, {htmlStr: 'Lebanon, PA', value: '30140'}, {htmlStr: 'Levelland, TX', value: '30220'}, {htmlStr: 'Lewisburg, PA', value: '30260'}, {htmlStr: 'Lewisburg, TN', value: '30280'}, {htmlStr: 'Lewiston, ID-WA', value: '30300'}, {htmlStr: 'Lewiston-Auburn, ME', value: '30340'}, {htmlStr: 'Lewistown, PA', value: '30380'}, {htmlStr: 'Lexington, NE', value: '30420'}, {htmlStr: 'Lexington-Fayette, KY', value: '30460'}, {htmlStr: 'Liberal, KS', value: '30580'}, {htmlStr: 'Lima, OH', value: '30620'}, {htmlStr: 'Lincoln, IL', value: '30660'}, {htmlStr: 'Lincoln, NE', value: '30700'}, {htmlStr: 'Little Rock-North Little Rock-Conway, AR', value: '30780'}, {htmlStr: 'Lock Haven, PA', value: '30820'}, {htmlStr: 'Logan, UT-ID', value: '30860'}, {htmlStr: 'Logansport, IN', value: '30900'}, {htmlStr: 'London, KY', value: '30940'}, {htmlStr: 'Longview, TX', value: '30980'}, {htmlStr: 'Longview, WA', value: '31020'}, {htmlStr: 'Los Alamos, NM', value: '31060'}, {htmlStr: 'Los Angeles-Long Beach-Anaheim, CA', value: '31080'}, {htmlStr: 'Los Angeles-Long Beach-Anaheim, CA', value: '31080'}, {htmlStr: 'Louisville/Jefferson County, KY-IN', value: '31140'}, {htmlStr: 'Lubbock, TX', value: '31180'}, {htmlStr: 'Ludington, MI', value: '31220'}, {htmlStr: 'Lufkin, TX', value: '31260'}, {htmlStr: 'Lumberton, NC', value: '31300'}, {htmlStr: 'Lynchburg, VA', value: '31340'}, {htmlStr: 'Macomb, IL', value: '31380'}, {htmlStr: 'Macon-Bibb County, GA', value: '31420'}, {htmlStr: 'Madera, CA', value: '31460'}, {htmlStr: 'Madison, IN', value: '31500'}, {htmlStr: 'Madison, WI', value: '31540'}, {htmlStr: 'Madisonville, KY', value: '31580'}, {htmlStr: 'Magnolia, AR', value: '31620'}, {htmlStr: 'Malone, NY', value: '31660'}, {htmlStr: 'Malvern, AR', value: '31680'}, {htmlStr: 'Manchester-Nashua, NH', value: '31700'}, {htmlStr: 'Manhattan, KS', value: '31740'}, {htmlStr: 'Manitowoc, WI', value: '31820'}, {htmlStr: 'Mankato, MN', value: '31860'}, {htmlStr: 'Mansfield, OH', value: '31900'}, {htmlStr: 'Marietta, OH', value: '31930'}, {htmlStr: 'Marinette, WI-MI', value: '31940'}, {htmlStr: 'Marion, IN', value: '31980'}, {htmlStr: 'Marion, NC', value: '32000'}, {htmlStr: 'Marion, OH', value: '32020'}, {htmlStr: 'Marquette, MI', value: '32100'}, {htmlStr: 'Marshall, MN', value: '32140'}, {htmlStr: 'Marshall, MO', value: '32180'}, {htmlStr: 'Marshalltown, IA', value: '32260'}, {htmlStr: 'Martin, TN', value: '32280'}, {htmlStr: 'Martinsville, VA', value: '32300'}, {htmlStr: 'Maryville, MO', value: '32340'}, {htmlStr: 'Mason City, IA', value: '32380'}, {htmlStr: 'Mayag?ez, PR', value: '32420'}, {htmlStr: 'Mayfield, KY', value: '32460'}, {htmlStr: 'Maysville, KY', value: '32500'}, {htmlStr: 'McAlester, OK', value: '32540'}, {htmlStr: 'McAllen-Edinburg-Mission, TX', value: '32580'}, {htmlStr: 'McComb, MS', value: '32620'}, {htmlStr: 'McMinnville, TN', value: '32660'}, {htmlStr: 'McPherson, KS', value: '32700'}, {htmlStr: 'Meadville, PA', value: '32740'}, {htmlStr: 'Medford, OR', value: '32780'}, {htmlStr: 'Memphis, TN-MS-AR', value: '32820'}, {htmlStr: 'Menomonie, WI', value: '32860'}, {htmlStr: 'Merced, CA', value: '32900'}, {htmlStr: 'Meridian, MS', value: '32940'}, {htmlStr: 'Mexico, MO', value: '33020'}, {htmlStr: 'Miami, OK', value: '33060'}, {htmlStr: 'Miami-Fort Lauderdale-Pompano Beach, FL', value: '33100'}, {htmlStr: 'Miami-Fort Lauderdale-Pompano Beach, FL', value: '33100'}, {htmlStr: 'Miami-Fort Lauderdale-Pompano Beach, FL', value: '33100'}, {htmlStr: 'Michigan City-La Porte, IN', value: '33140'}, {htmlStr: 'Middlesborough, KY', value: '33180'}, {htmlStr: 'Midland, MI', value: '33220'}, {htmlStr: 'Midland, TX', value: '33260'}, {htmlStr: 'Milledgeville, GA', value: '33300'}, {htmlStr: 'Milwaukee-Waukesha, WI', value: '33340'}, {htmlStr: 'Minden, LA', value: '33380'}, {htmlStr: 'Mineral Wells, TX', value: '33420'}, {htmlStr: 'Minneapolis-St. Paul-Bloomington, MN-WI', value: '33460'}, {htmlStr: 'Minot, ND', value: '33500'}, {htmlStr: 'Missoula, MT', value: '33540'}, {htmlStr: 'Mitchell, SD', value: '33580'}, {htmlStr: 'Moberly, MO', value: '33620'}, {htmlStr: 'Mobile, AL', value: '33660'}, {htmlStr: 'Modesto, CA', value: '33700'}, {htmlStr: 'Monroe, LA', value: '33740'}, {htmlStr: 'Monroe, MI', value: '33780'}, {htmlStr: 'Montgomery, AL', value: '33860'}, {htmlStr: 'Montrose, CO', value: '33940'}, {htmlStr: 'Morehead City, NC', value: '33980'}, {htmlStr: 'Morgan City, LA', value: '34020'}, {htmlStr: 'Morgantown, WV', value: '34060'}, {htmlStr: 'Morristown, TN', value: '34100'}, {htmlStr: 'Moscow, ID', value: '34140'}, {htmlStr: 'Moses Lake, WA', value: '34180'}, {htmlStr: 'Moultrie, GA', value: '34220'}, {htmlStr: 'Mount Airy, NC', value: '34340'}, {htmlStr: 'Mount Gay-Shamrock, WV', value: '34350'}, {htmlStr: 'Mount Pleasant, MI', value: '34380'}, {htmlStr: 'Mount Pleasant, TX', value: '34420'}, {htmlStr: 'Mount Sterling, KY', value: '34460'}, {htmlStr: 'Mount Vernon, IL', value: '34500'}, {htmlStr: 'Mount Vernon, OH', value: '34540'}, {htmlStr: 'Mount Vernon-Anacortes, WA', value: '34580'}, {htmlStr: 'Mountain Home, AR', value: '34260'}, {htmlStr: 'Mountain Home, ID', value: '34300'}, {htmlStr: 'Muncie, IN', value: '34620'}, {htmlStr: 'Murray, KY', value: '34660'}, {htmlStr: 'Muscatine, IA', value: '34700'}, {htmlStr: 'Muskegon, MI', value: '34740'}, {htmlStr: 'Muskogee, OK', value: '34780'}, {htmlStr: 'Myrtle Beach-Conway-North Myrtle Beach, SC-NC', value: '34820'}, {htmlStr: 'Nacogdoches, TX', value: '34860'}, {htmlStr: 'Napa, CA', value: '34900'}, {htmlStr: 'Naples-Marco Island, FL', value: '34940'}, {htmlStr: 'Nashville-Davidson--Murfreesboro--Franklin, TN', value: '34980'}, {htmlStr: 'Natchez, MS-LA', value: '35020'}, {htmlStr: 'Natchitoches, LA', value: '35060'}, {htmlStr: 'New Bern, NC', value: '35100'}, {htmlStr: 'New Castle, IN', value: '35220'}, {htmlStr: 'New Castle, PA', value: '35260'}, {htmlStr: 'New Haven-Milford, CT', value: '35300'}, {htmlStr: 'New Orleans-Metairie, LA', value: '35380'}, {htmlStr: 'New Philadelphia-Dover, OH', value: '35420'}, {htmlStr: 'New Ulm, MN', value: '35580'}, {htmlStr: 'New York-Newark-Jersey City, NY-NJ-PA', value: '35620'}, {htmlStr: 'New York-Newark-Jersey City, NY-NJ-PA', value: '35620'}, {htmlStr: 'New York-Newark-Jersey City, NY-NJ-PA', value: '35620'}, {htmlStr: 'New York-Newark-Jersey City, NY-NJ-PA', value: '35620'}, {htmlStr: 'Newberry, SC', value: '35140'}, {htmlStr: 'Newport, OR', value: '35440'}, {htmlStr: 'Newport, TN', value: '35460'}, {htmlStr: 'Niles, MI', value: '35660'}, {htmlStr: 'Nogales, AZ', value: '35700'}, {htmlStr: 'Norfolk, NE', value: '35740'}, {htmlStr: 'North Platte, NE', value: '35820'}, {htmlStr: 'North Port-Sarasota-Bradenton, FL', value: '35840'}, {htmlStr: 'North Vernon, IN', value: '35860'}, {htmlStr: 'North Wilkesboro, NC', value: '35900'}, {htmlStr: 'Norwalk, OH', value: '35940'}, {htmlStr: 'Norwich-New London, CT', value: '35980'}, {htmlStr: 'Oak Harbor, WA', value: '36020'}, {htmlStr: 'Ocala, FL', value: '36100'}, {htmlStr: 'Ocean City, NJ', value: '36140'}, {htmlStr: 'Odessa, TX', value: '36220'}, {htmlStr: 'Ogden-Clearfield, UT', value: '36260'}, {htmlStr: 'Ogdensburg-Massena, NY', value: '36300'}, {htmlStr: 'Oil City, PA', value: '36340'}, {htmlStr: 'Okeechobee, FL', value: '36380'}, {htmlStr: 'Oklahoma City, OK', value: '36420'}, {htmlStr: 'Olean, NY', value: '36460'}, {htmlStr: 'Olympia-Lacey-Tumwater, WA', value: '36500'}, {htmlStr: 'Omaha-Council Bluffs, NE-IA', value: '36540'}, {htmlStr: 'Oneonta, NY', value: '36580'}, {htmlStr: 'Ontario, OR-ID', value: '36620'}, {htmlStr: 'Opelousas, LA', value: '36660'}, {htmlStr: 'Orangeburg, SC', value: '36700'}, {htmlStr: 'Orlando-Kissimmee-Sanford, FL', value: '36740'}, {htmlStr: 'Oshkosh-Neenah, WI', value: '36780'}, {htmlStr: 'Oskaloosa, IA', value: '36820'}, {htmlStr: 'Othello, WA', value: '36830'}, {htmlStr: 'Ottawa, IL', value: '36837'}, {htmlStr: 'Ottawa, KS', value: '36840'}, {htmlStr: 'Ottumwa, IA', value: '36900'}, {htmlStr: 'Owatonna, MN', value: '36940'}, {htmlStr: 'Owensboro, KY', value: '36980'}, {htmlStr: 'Oxford, MS', value: '37060'}, {htmlStr: 'Oxnard-Thousand Oaks-Ventura, CA', value: '37100'}, {htmlStr: 'Ozark, AL', value: '37120'}, {htmlStr: 'Paducah, KY-IL', value: '37140'}, {htmlStr: 'Pahrump, NV', value: '37220'}, {htmlStr: 'Palatka, FL', value: '37260'}, {htmlStr: 'Palestine, TX', value: '37300'}, {htmlStr: 'Palm Bay-Melbourne-Titusville, FL', value: '37340'}, {htmlStr: 'Pampa, TX', value: '37420'}, {htmlStr: 'Panama City, FL', value: '37460'}, {htmlStr: 'Paragould, AR', value: '37500'}, {htmlStr: 'Paris, TN', value: '37540'}, {htmlStr: 'Paris, TX', value: '37580'}, {htmlStr: 'Parkersburg-Vienna, WV', value: '37620'}, {htmlStr: 'Parsons, KS', value: '37660'}, {htmlStr: 'Payson, AZ', value: '37740'}, {htmlStr: 'Pearsall, TX', value: '37770'}, {htmlStr: 'Pecos, TX', value: '37780'}, {htmlStr: 'Pella, IA', value: '37800'}, {htmlStr: 'Pensacola-Ferry Pass-Brent, FL', value: '37860'}, {htmlStr: 'Peoria, IL', value: '37900'}, {htmlStr: 'Peru, IN', value: '37940'}, {htmlStr: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD', value: '37980'}, {htmlStr: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD', value: '37980'}, {htmlStr: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD', value: '37980'}, {htmlStr: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD', value: '37980'}, {htmlStr: 'Phoenix-Mesa-Chandler, AZ', value: '38060'}, {htmlStr: 'Picayune, MS', value: '38100'}, {htmlStr: 'Pierre, SD', value: '38180'}, {htmlStr: 'Pine Bluff, AR', value: '38220'}, {htmlStr: 'Pinehurst-Southern Pines, NC', value: '38240'}, {htmlStr: 'Pittsburg, KS', value: '38260'}, {htmlStr: 'Pittsburgh, PA', value: '38300'}, {htmlStr: 'Pittsfield, MA', value: '38340'}, {htmlStr: 'Plainview, TX', value: '38380'}, {htmlStr: 'Platteville, WI', value: '38420'}, {htmlStr: 'Plattsburgh, NY', value: '38460'}, {htmlStr: 'Plymouth, IN', value: '38500'}, {htmlStr: 'Pocatello, ID', value: '38540'}, {htmlStr: 'Point Pleasant, WV-OH', value: '38580'}, {htmlStr: 'Ponca City, OK', value: '38620'}, {htmlStr: 'Ponce, PR', value: '38660'}, {htmlStr: 'Pontiac, IL', value: '38700'}, {htmlStr: 'Poplar Bluff, MO', value: '38740'}, {htmlStr: 'Port Angeles, WA', value: '38820'}, {htmlStr: 'Port Lavaca, TX', value: '38920'}, {htmlStr: 'Port St. Lucie, FL', value: '38940'}, {htmlStr: 'Portales, NM', value: '38780'}, {htmlStr: 'Portland-South Portland, ME', value: '38860'}, {htmlStr: 'Portland-Vancouver-Hillsboro, OR-WA', value: '38900'}, {htmlStr: 'Portsmouth, OH', value: '39020'}, {htmlStr: 'Pottsville, PA', value: '39060'}, {htmlStr: 'Poughkeepsie-Newburgh-Middletown, NY', value: '39100'}, {htmlStr: 'Prescott Valley-Prescott, AZ', value: '39150'}, {htmlStr: 'Price, UT', value: '39220'}, {htmlStr: 'Prineville, OR', value: '39260'}, {htmlStr: 'Providence-Warwick, RI-MA', value: '39300'}, {htmlStr: 'Provo-Orem, UT', value: '39340'}, {htmlStr: 'Pueblo, CO', value: '39380'}, {htmlStr: 'Pullman, WA', value: '39420'}, {htmlStr: 'Punta Gorda, FL', value: '39460'}, {htmlStr: 'Quincy, IL-MO', value: '39500'}, {htmlStr: 'Racine, WI', value: '39540'}, {htmlStr: 'Raleigh-Cary, NC', value: '39580'}, {htmlStr: 'Rapid City, SD', value: '39660'}, {htmlStr: 'Raymondville, TX', value: '39700'}, {htmlStr: 'Reading, PA', value: '39740'}, {htmlStr: 'Red Bluff, CA', value: '39780'}, {htmlStr: 'Red Wing, MN', value: '39860'}, {htmlStr: 'Redding, CA', value: '39820'}, {htmlStr: 'Reno, NV', value: '39900'}, {htmlStr: 'Rexburg, ID', value: '39940'}, {htmlStr: 'Richmond, IN', value: '39980'}, {htmlStr: 'Richmond, VA', value: '40060'}, {htmlStr: 'Richmond-Berea, KY', value: '40080'}, {htmlStr: 'Rio Grande City-Roma, TX', value: '40100'}, {htmlStr: 'Riverside-San Bernardino-Ontario, CA', value: '40140'}, {htmlStr: 'Riverton, WY', value: '40180'}, {htmlStr: 'Roanoke Rapids, NC', value: '40260'}, {htmlStr: 'Roanoke, VA', value: '40220'}, {htmlStr: 'Rochelle, IL', value: '40300'}, {htmlStr: 'Rochester, MN', value: '40340'}, {htmlStr: 'Rochester, NY', value: '40380'}, {htmlStr: 'Rock Springs, WY', value: '40540'}, {htmlStr: 'Rockford, IL', value: '40420'}, {htmlStr: 'Rockingham, NC', value: '40460'}, {htmlStr: 'Rockport, TX', value: '40530'}, {htmlStr: 'Rocky Mount, NC', value: '40580'}, {htmlStr: 'Rolla, MO', value: '40620'}, {htmlStr: 'Rome, GA', value: '40660'}, {htmlStr: 'Roseburg, OR', value: '40700'}, {htmlStr: 'Roswell, NM', value: '40740'}, {htmlStr: 'Ruidoso, NM', value: '40760'}, {htmlStr: 'Russellville, AR', value: '40780'}, {htmlStr: 'Ruston, LA', value: '40820'}, {htmlStr: 'Rutland, VT', value: '40860'}, {htmlStr: 'Sacramento-Roseville-Folsom, CA', value: '40900'}, {htmlStr: 'Safford, AZ', value: '40940'}, {htmlStr: 'Saginaw, MI', value: '40980'}, {htmlStr: 'Salem, OH', value: '41400'}, {htmlStr: 'Salem, OR', value: '41420'}, {htmlStr: 'Salina, KS', value: '41460'}, {htmlStr: 'Salinas, CA', value: '41500'}, {htmlStr: 'Salisbury, MD-DE', value: '41540'}, {htmlStr: 'Salt Lake City, UT', value: '41620'}, {htmlStr: 'San Angelo, TX', value: '41660'}, {htmlStr: 'San Antonio-New Braunfels, TX', value: '41700'}, {htmlStr: 'San Diego-Chula Vista-Carlsbad, CA', value: '41740'}, {htmlStr: 'San Francisco-Oakland-Berkeley, CA', value: '41860'}, {htmlStr: 'San Francisco-Oakland-Berkeley, CA', value: '41860'}, {htmlStr: 'San Francisco-Oakland-Berkeley, CA', value: '41860'}, {htmlStr: 'San Germ?n, PR', value: '41900'}, {htmlStr: 'San Jose-Sunnyvale-Santa Clara, CA', value: '41940'}, {htmlStr: 'San Juan-Bayam?n-Caguas, PR', value: '41980'}, {htmlStr: 'San Luis Obispo-Paso Robles, CA', value: '42020'}, {htmlStr: 'Sandpoint, ID', value: '41760'}, {htmlStr: 'Sandusky, OH', value: '41780'}, {htmlStr: 'Sanford, NC', value: '41820'}, {htmlStr: 'Santa Cruz-Watsonville, CA', value: '42100'}, {htmlStr: 'Santa Fe, NM', value: '42140'}, {htmlStr: 'Santa Isabel, PR', value: '42180'}, {htmlStr: 'Santa Maria-Santa Barbara, CA', value: '42200'}, {htmlStr: 'Santa Rosa-Petaluma, CA', value: '42220'}, {htmlStr: 'Sault Ste. Marie, MI', value: '42300'}, {htmlStr: 'Savannah, GA', value: '42340'}, {htmlStr: 'Sayre, PA', value: '42380'}, {htmlStr: 'Scottsbluff, NE', value: '42420'}, {htmlStr: 'Scottsboro, AL', value: '42460'}, {htmlStr: 'Scottsburg, IN', value: '42500'}, {htmlStr: 'Scranton--Wilkes-Barre, PA', value: '42540'}, {htmlStr: 'Searcy, AR', value: '42620'}, {htmlStr: 'Seattle-Tacoma-Bellevue, WA', value: '42660'}, {htmlStr: 'Seattle-Tacoma-Bellevue, WA', value: '42660'}, {htmlStr: 'Sebastian-Vero Beach, FL', value: '42680'}, {htmlStr: 'Sebring-Avon Park, FL', value: '42700'}, {htmlStr: 'Sedalia, MO', value: '42740'}, {htmlStr: 'Selinsgrove, PA', value: '42780'}, {htmlStr: 'Selma, AL', value: '42820'}, {htmlStr: 'Seneca Falls, NY', value: '42900'}, {htmlStr: 'Seneca, SC', value: '42860'}, {htmlStr: 'Sevierville, TN', value: '42940'}, {htmlStr: 'Seymour, IN', value: '42980'}, {htmlStr: 'Shawano, WI', value: '43020'}, {htmlStr: 'Shawnee, OK', value: '43060'}, {htmlStr: 'Sheboygan, WI', value: '43100'}, {htmlStr: 'Shelby, NC', value: '43140'}, {htmlStr: 'Shelbyville, TN', value: '43180'}, {htmlStr: 'Shelton, WA', value: '43220'}, {htmlStr: 'Sheridan, WY', value: '43260'}, {htmlStr: 'Sherman-Denison, TX', value: '43300'}, {htmlStr: 'Show Low, AZ', value: '43320'}, {htmlStr: 'Shreveport-Bossier City, LA', value: '43340'}, {htmlStr: 'Sidney, OH', value: '43380'}, {htmlStr: 'Sierra Vista-Douglas, AZ', value: '43420'}, {htmlStr: 'Sikeston, MO', value: '43460'}, {htmlStr: 'Silver City, NM', value: '43500'}, {htmlStr: 'Sioux City, IA-NE-SD', value: '43580'}, {htmlStr: 'Sioux Falls, SD', value: '43620'}, {htmlStr: 'Snyder, TX', value: '43660'}, {htmlStr: 'Somerset, KY', value: '43700'}, {htmlStr: 'Somerset, PA', value: '43740'}, {htmlStr: 'Sonora, CA', value: '43760'}, {htmlStr: 'South Bend-Mishawaka, IN-MI', value: '43780'}, {htmlStr: 'Spartanburg, SC', value: '43900'}, {htmlStr: 'Spearfish, SD', value: '43940'}, {htmlStr: 'Spencer, IA', value: '43980'}, {htmlStr: 'Spirit Lake, IA', value: '44020'}, {htmlStr: 'Spokane-Spokane Valley, WA', value: '44060'}, {htmlStr: 'Springfield, IL', value: '44100'}, {htmlStr: 'Springfield, MA', value: '44140'}, {htmlStr: 'Springfield, MO', value: '44180'}, {htmlStr: 'Springfield, OH', value: '44220'}, {htmlStr: 'St. Cloud, MN', value: '41060'}, {htmlStr: 'St. George, UT', value: '41100'}, {htmlStr: 'St. Joseph, MO-KS', value: '41140'}, {htmlStr: 'St. Louis, MO-IL', value: '41180'}, {htmlStr: 'St. Marys, GA', value: '41220'}, {htmlStr: 'St. Marys, PA', value: '41260'}, {htmlStr: 'Starkville, MS', value: '44260'}, {htmlStr: 'State College, PA', value: '44300'}, {htmlStr: 'Statesboro, GA', value: '44340'}, {htmlStr: 'Staunton, VA', value: '44420'}, {htmlStr: 'Steamboat Springs, CO', value: '44460'}, {htmlStr: 'Stephenville, TX', value: '44500'}, {htmlStr: 'Sterling, CO', value: '44540'}, {htmlStr: 'Sterling, IL', value: '44580'}, {htmlStr: 'Stevens Point, WI', value: '44620'}, {htmlStr: 'Stillwater, OK', value: '44660'}, {htmlStr: 'Stockton, CA', value: '44700'}, {htmlStr: 'Storm Lake, IA', value: '44740'}, {htmlStr: 'Sturgis, MI', value: '44780'}, {htmlStr: 'Sulphur Springs, TX', value: '44860'}, {htmlStr: 'Summerville, GA', value: '44900'}, {htmlStr: 'Sumter, SC', value: '44940'}, {htmlStr: 'Sunbury, PA', value: '44980'}, {htmlStr: 'Susanville, CA', value: '45000'}, {htmlStr: 'Sweetwater, TX', value: '45020'}, {htmlStr: 'Syracuse, NY', value: '45060'}, {htmlStr: 'Tahlequah, OK', value: '45140'}, {htmlStr: 'Talladega-Sylacauga, AL', value: '45180'}, {htmlStr: 'Tallahassee, FL', value: '45220'}, {htmlStr: 'Tampa-St. Petersburg-Clearwater, FL', value: '45300'}, {htmlStr: 'Taos, NM', value: '45340'}, {htmlStr: 'Taylorville, IL', value: '45380'}, {htmlStr: 'Terre Haute, IN', value: '45460'}, {htmlStr: 'Texarkana, TX-AR', value: '45500'}, {htmlStr: 'The Dalles, OR', value: '45520'}, {htmlStr: 'The Villages, FL', value: '45540'}, {htmlStr: 'Thomaston, GA', value: '45580'}, {htmlStr: 'Thomasville, GA', value: '45620'}, {htmlStr: 'Tiffin, OH', value: '45660'}, {htmlStr: 'Tifton, GA', value: '45700'}, {htmlStr: 'Toccoa, GA', value: '45740'}, {htmlStr: 'Toledo, OH', value: '45780'}, {htmlStr: 'Topeka, KS', value: '45820'}, {htmlStr: 'Torrington, CT', value: '45860'}, {htmlStr: 'Traverse City, MI', value: '45900'}, {htmlStr: 'Trenton-Princeton, NJ', value: '45940'}, {htmlStr: 'Troy, AL', value: '45980'}, {htmlStr: 'Truckee-Grass Valley, CA', value: '46020'}, {htmlStr: 'Tucson, AZ', value: '46060'}, {htmlStr: 'Tullahoma-Manchester, TN', value: '46100'}, {htmlStr: 'Tulsa, OK', value: '46140'}, {htmlStr: 'Tupelo, MS', value: '46180'}, {htmlStr: 'Tuscaloosa, AL', value: '46220'}, {htmlStr: 'Twin Falls, ID', value: '46300'}, {htmlStr: 'Tyler, TX', value: '46340'}, {htmlStr: 'Ukiah, CA', value: '46380'}, {htmlStr: 'Union City, TN', value: '46460'}, {htmlStr: 'Union, SC', value: '46420'}, {htmlStr: 'Urban Honolulu, HI', value: '46520'}, {htmlStr: 'Urbana, OH', value: '46500'}, {htmlStr: 'Utica-Rome, NY', value: '46540'}, {htmlStr: 'Uvalde, TX', value: '46620'}, {htmlStr: 'Valdosta, GA', value: '46660'}, {htmlStr: 'Vallejo, CA', value: '46700'}, {htmlStr: 'Van Wert, OH', value: '46780'}, {htmlStr: 'Vermillion, SD', value: '46820'}, {htmlStr: 'Vernal, UT', value: '46860'}, {htmlStr: 'Vernon, TX', value: '46900'}, {htmlStr: 'Vicksburg, MS', value: '46980'}, {htmlStr: 'Victoria, TX', value: '47020'}, {htmlStr: 'Vidalia, GA', value: '47080'}, {htmlStr: 'Vincennes, IN', value: '47180'}, {htmlStr: 'Vineland-Bridgeton, NJ', value: '47220'}, {htmlStr: 'Vineyard Haven, MA', value: '47240'}, {htmlStr: 'Virginia Beach-Norfolk-Newport News, VA-NC', value: '47260'}, {htmlStr: 'Visalia, CA', value: '47300'}, {htmlStr: 'Wabash, IN', value: '47340'}, {htmlStr: 'Waco, TX', value: '47380'}, {htmlStr: 'Wahpeton, ND-MN', value: '47420'}, {htmlStr: 'Walla Walla, WA', value: '47460'}, {htmlStr: 'Wapakoneta, OH', value: '47540'}, {htmlStr: 'Warner Robins, GA', value: '47580'}, {htmlStr: 'Warren, PA', value: '47620'}, {htmlStr: 'Warrensburg, MO', value: '47660'}, {htmlStr: 'Warsaw, IN', value: '47700'}, {htmlStr: 'Washington Court House, OH', value: '47920'}, {htmlStr: 'Washington, IN', value: '47780'}, {htmlStr: 'Washington, NC', value: '47820'}, {htmlStr: 'Washington-Arlington-Alexandria, DC-VA-MD-WV', value: '47900'}, {htmlStr: 'Washington-Arlington-Alexandria, DC-VA-MD-WV', value: '47900'}, {htmlStr: 'Waterloo-Cedar Falls, IA', value: '47940'}, {htmlStr: 'Watertown, SD', value: '47980'}, {htmlStr: 'Watertown-Fort Atkinson, WI', value: '48020'}, {htmlStr: 'Watertown-Fort Drum, NY', value: '48060'}, {htmlStr: 'Wauchula, FL', value: '48100'}, {htmlStr: 'Wausau-Weston, WI', value: '48140'}, {htmlStr: 'Waycross, GA', value: '48180'}, {htmlStr: 'Weatherford, OK', value: '48220'}, {htmlStr: 'Weirton-Steubenville, WV-OH', value: '48260'}, {htmlStr: 'Wenatchee, WA', value: '48300'}, {htmlStr: 'West Plains, MO', value: '48460'}, {htmlStr: 'West Point, MS', value: '48500'}, {htmlStr: 'Wheeling, WV-OH', value: '48540'}, {htmlStr: 'Whitewater, WI', value: '48580'}, {htmlStr: 'Wichita Falls, TX', value: '48660'}, {htmlStr: 'Wichita, KS', value: '48620'}, {htmlStr: 'Williamsport, PA', value: '48700'}, {htmlStr: 'Williston, ND', value: '48780'}, {htmlStr: 'Willmar, MN', value: '48820'}, {htmlStr: 'Wilmington, NC', value: '48900'}, {htmlStr: 'Wilmington, OH', value: '48940'}, {htmlStr: 'Wilson, NC', value: '48980'}, {htmlStr: 'Winchester, VA-WV', value: '49020'}, {htmlStr: 'Winfield, KS', value: '49060'}, {htmlStr: 'Winnemucca, NV', value: '49080'}, {htmlStr: 'Winona, MN', value: '49100'}, {htmlStr: 'Winston-Salem, NC', value: '49180'}, {htmlStr: 'Wisconsin Rapids-Marshfield, WI', value: '49220'}, {htmlStr: 'Woodward, OK', value: '49260'}, {htmlStr: 'Wooster, OH', value: '49300'}, {htmlStr: 'Worcester, MA-CT', value: '49340'}, {htmlStr: 'Worthington, MN', value: '49380'}, {htmlStr: 'Yakima, WA', value: '49420'}, {htmlStr: 'Yankton, SD', value: '49460'}, {htmlStr: 'Yauco, PR', value: '49500'}, {htmlStr: 'York-Hanover, PA', value: '49620'}, {htmlStr: 'Youngstown-Warren-Boardman, OH-PA', value: '49660'}, {htmlStr: 'Yuba City, CA', value: '49700'}, {htmlStr: 'Yuma, AZ', value: '49740'}, {htmlStr: 'Zanesville, OH', value: '49780'}, {htmlStr: 'Zapata, TX', value: '49820'}]
                    }
                }},
                {location_csa: {
                    element: {
                        tagName: 'select',
                        placeholder: 'Location CSA',
                        optionVals: [{htmlStr: 'Location CSA', value: ''}, {htmlStr: 'No CSA', value: '-1'}, {htmlStr: 'Albany-Schenectady, NY', value: '104'}, {htmlStr: 'Albuquerque-Santa Fe-Las Vegas, NM', value: '106'}, {htmlStr: 'Altoona-Huntingdon, PA', value: '107'}, {htmlStr: 'Amarillo-Pampa-Borger, TX', value: '108'}, {htmlStr: 'Appleton-Oshkosh-Neenah, WI', value: '118'}, {htmlStr: 'Asheville-Marion-Brevard, NC', value: '120'}, {htmlStr: 'Atlanta--Athens-Clarke County--Sandy Springs, GA-AL', value: '122'}, {htmlStr: 'Bend-Prineville, OR', value: '140'}, {htmlStr: 'Birmingham-Hoover-Talladega, AL', value: '142'}, {htmlStr: 'Bloomington-Bedford, IN', value: '144'}, {htmlStr: 'Bloomington-Pontiac, IL', value: '145'}, {htmlStr: 'Bloomsburg-Berwick-Sunbury, PA', value: '146'}, {htmlStr: 'Boise City-Mountain Home-Ontario, ID-OR', value: '147'}, {htmlStr: 'Boston-Worcester-Providence, MA-RI-NH-CT', value: '148'}, {htmlStr: 'Bowling Green-Glasgow, KY', value: '150'}, {htmlStr: 'Brownsville-Harlingen-Raymondville, TX', value: '154'}, {htmlStr: 'Buffalo-Cheektowaga-Olean, NY', value: '160'}, {htmlStr: 'Burlington-Fort Madison-Keokuk, IA-IL-MO', value: '161'}, {htmlStr: 'Burlington-South Burlington-Barre, VT', value: '162'}, {htmlStr: 'Cape Coral-Fort Myers-Naples, FL', value: '163'}, {htmlStr: 'Cape Girardeau-Sikeston, MO-IL', value: '164'}, {htmlStr: 'Cedar Rapids-Iowa City, IA', value: '168'}, {htmlStr: 'Charleston-Huntington-Ashland, WV-OH-KY', value: '170'}, {htmlStr: 'Charlotte-Concord, NC-SC', value: '172'}, {htmlStr: 'Chattanooga-Cleveland-Dalton, TN-GA', value: '174'}, {htmlStr: 'Chicago-Naperville, IL-IN-WI', value: '176'}, {htmlStr: 'Cincinnati-Wilmington-Maysville, OH-KY-IN', value: '178'}, {htmlStr: 'Cleveland-Akron-Canton, OH', value: '184'}, {htmlStr: 'Cleveland-Indianola, MS', value: '185'}, {htmlStr: 'Clovis-Portales, NM', value: '188'}, {htmlStr: 'Columbia-Moberly-Mexico, MO', value: '190'}, {htmlStr: 'Columbia-Orangeburg-Newberry, SC', value: '192'}, {htmlStr: 'Columbus-Auburn-Opelika, GA-AL', value: '194'}, {htmlStr: 'Columbus-Marion-Zanesville, OH', value: '198'}, {htmlStr: 'Columbus-West Point, MS', value: '200'}, {htmlStr: 'Corpus Christi-Kingsville-Alice, TX', value: '204'}, {htmlStr: 'Dallas-Fort Worth, TX-OK', value: '206'}, {htmlStr: 'Davenport-Moline, IA-IL', value: '209'}, {htmlStr: 'Dayton-Springfield-Kettering, OH', value: '212'}, {htmlStr: 'Denver-Aurora, CO', value: '216'}, {htmlStr: 'DeRidder-Fort Polk South, LA', value: '217'}, {htmlStr: 'Des Moines-Ames-West Des Moines, IA', value: '218'}, {htmlStr: 'Detroit-Warren-Ann Arbor, MI', value: '220'}, {htmlStr: 'Dixon-Sterling, IL', value: '221'}, {htmlStr: 'Dothan-Ozark, AL', value: '222'}, {htmlStr: 'Eau Claire-Menomonie, WI', value: '232'}, {htmlStr: 'Edwards-Glenwood Springs, CO', value: '233'}, {htmlStr: 'Elmira-Corning, NY', value: '236'}, {htmlStr: 'El Paso-Las Cruces, TX-NM', value: '238'}, {htmlStr: 'Erie-Meadville, PA', value: '240'}, {htmlStr: 'Fargo-Wahpeton, ND-MN', value: '244'}, {htmlStr: 'Fayetteville-Sanford-Lumberton, NC', value: '246'}, {htmlStr: 'Fort Wayne-Huntington-Auburn, IN', value: '258'}, {htmlStr: 'Fresno-Madera-Hanford, CA', value: '260'}, {htmlStr: 'Gainesville-Lake City, FL', value: '264'}, {htmlStr: 'Grand Rapids-Kentwood-Muskegon, MI', value: '266'}, {htmlStr: 'Green Bay-Shawano, WI', value: '267'}, {htmlStr: 'Greensboro--Winston-Salem--High Point, NC', value: '268'}, {htmlStr: 'Greenville-Kinston-Washington, NC', value: '272'}, {htmlStr: 'Greenville-Spartanburg-Anderson, SC', value: '273'}, {htmlStr: 'Harrisburg-York-Lebanon, PA', value: '276'}, {htmlStr: 'Harrisonburg-Staunton, VA', value: '277'}, {htmlStr: 'Hartford-East Hartford, CT', value: '278'}, {htmlStr: 'Hattiesburg-Laurel, MS', value: '279'}, {htmlStr: 'Hot Springs-Malvern, AR', value: '284'}, {htmlStr: 'Houston-The Woodlands, TX', value: '288'}, {htmlStr: 'Huntsville-Decatur, AL', value: '290'}, {htmlStr: 'Idaho Falls-Rexburg-Blackfoot, ID', value: '292'}, {htmlStr: 'Indianapolis-Carmel-Muncie, IN', value: '294'}, {htmlStr: 'Ithaca-Cortland, NY', value: '296'}, {htmlStr: 'Jackson-Brownsville, TN', value: '297'}, {htmlStr: 'Jackson-Vicksburg-Brookhaven, MS', value: '298'}, {htmlStr: 'Jacksonville-St. Marys-Palatka, FL-GA', value: '300'}, {htmlStr: 'Johnson City-Kingsport-Bristol, TN-VA', value: '304'}, {htmlStr: 'Johnstown-Somerset, PA', value: '306'}, {htmlStr: 'Jonesboro-Paragould, AR', value: '308'}, {htmlStr: 'Joplin-Miami, MO-OK', value: '309'}, {htmlStr: 'Kalamazoo-Battle Creek-Portage, MI', value: '310'}, {htmlStr: 'Kansas City-Overland Park-Kansas City, MO-KS', value: '312'}, {htmlStr: 'Kennewick-Richland-Walla Walla, WA', value: '313'}, {htmlStr: 'Kerrville-Fredericksburg, TX', value: '314'}, {htmlStr: 'Knoxville-Morristown-Sevierville, TN', value: '315'}, {htmlStr: 'Kokomo-Peru, IN', value: '316'}, {htmlStr: 'Lafayette-Opelousas-Morgan City, LA', value: '318'}, {htmlStr: 'Lafayette-West Lafayette-Frankfort, IN', value: '320'}, {htmlStr: 'Lake Charles-Jennings, LA', value: '324'}, {htmlStr: 'Las Vegas-Henderson, NV', value: '332'}, {htmlStr: 'Lexington-Fayette--Richmond--Frankfort, KY', value: '336'}, {htmlStr: 'Lima-Van Wert-Celina, OH', value: '338'}, {htmlStr: 'Lincoln-Beatrice, NE', value: '339'}, {htmlStr: 'Little Rock-North Little Rock, AR', value: '340'}, {htmlStr: 'Los Angeles-Long Beach, CA', value: '348'}, {htmlStr: 'Louisville/Jefferson County--Elizabethtown--Bardstown, KY-IN', value: '350'}, {htmlStr: 'Lubbock-Plainview-Levelland, TX', value: '352'}, {htmlStr: 'Macon-Bibb County--Warner Robins, GA', value: '356'}, {htmlStr: 'Madison-Janesville-Beloit, WI', value: '357'}, {htmlStr: 'Mankato-New Ulm, MN', value: '359'}, {htmlStr: 'Mansfield-Ashland-Bucyrus, OH', value: '360'}, {htmlStr: 'Marinette-Iron Mountain, WI-MI', value: '361'}, {htmlStr: 'Martin-Union City, TN', value: '362'}, {htmlStr: 'Mayag?ez-San Germ?n, PR', value: '364'}, {htmlStr: 'McAllen-Edinburg, TX', value: '365'}, {htmlStr: 'Medford-Grants Pass, OR', value: '366'}, {htmlStr: 'Memphis-Forrest City, TN-MS-AR', value: '368'}, {htmlStr: 'Miami-Port St. Lucie-Fort Lauderdale, FL', value: '370'}, {htmlStr: 'Midland-Odessa, TX', value: '372'}, {htmlStr: 'Milwaukee-Racine-Waukesha, WI', value: '376'}, {htmlStr: 'Minneapolis-St. Paul, MN-WI', value: '378'}, {htmlStr: 'Mobile-Daphne-Fairhope, AL', value: '380'}, {htmlStr: 'Monroe-Ruston, LA', value: '384'}, {htmlStr: 'Montgomery-Selma-Alexander City, AL', value: '388'}, {htmlStr: 'Morgantown-Fairmont, WV', value: '390'}, {htmlStr: 'Moses Lake-Othello, WA', value: '393'}, {htmlStr: 'Mount Pleasant-Alma, MI', value: '394'}, {htmlStr: 'Myrtle Beach-Conway, SC-NC', value: '396'}, {htmlStr: 'Nashville-Davidson--Murfreesboro, TN', value: '400'}, {htmlStr: 'New Bern-Morehead City, NC', value: '404'}, {htmlStr: 'New Orleans-Metairie-Hammond, LA-MS', value: '406'}, {htmlStr: 'New York-Newark, NY-NJ-CT-PA', value: '408'}, {htmlStr: 'North Port-Sarasota, FL', value: '412'}, {htmlStr: 'Oklahoma City-Shawnee, OK', value: '416'}, {htmlStr: 'Omaha-Council Bluffs-Fremont, NE-IA', value: '420'}, {htmlStr: 'Orlando-Lakeland-Deltona, FL', value: '422'}, {htmlStr: 'Paducah-Mayfield, KY-IL', value: '424'}, {htmlStr: 'Parkersburg-Marietta-Vienna, WV-OH', value: '425'}, {htmlStr: 'Pensacola-Ferry Pass, FL-AL', value: '426'}, {htmlStr: 'Philadelphia-Reading-Camden, PA-NJ-DE-MD', value: '428'}, {htmlStr: 'Phoenix-Mesa, AZ', value: '429'}, {htmlStr: 'Pittsburgh-New Castle-Weirton, PA-OH-WV', value: '430'}, {htmlStr: 'Ponce-Yauco-Coamo, PR', value: '434'}, {htmlStr: 'Portland-Lewiston-South Portland, ME', value: '438'}, {htmlStr: 'Portland-Vancouver-Salem, OR-WA', value: '440'}, {htmlStr: 'Pueblo-Ca?on City, CO', value: '444'}, {htmlStr: 'Pullman-Moscow, WA-ID', value: '446'}, {htmlStr: 'Quincy-Hannibal, IL-MO', value: '448'}, {htmlStr: 'Raleigh-Durham-Cary, NC', value: '450'}, {htmlStr: 'Rapid City-Spearfish, SD', value: '452'}, {htmlStr: 'Redding-Red Bluff, CA', value: '454'}, {htmlStr: 'Reno-Carson City-Fernley, NV', value: '456'}, {htmlStr: 'Richmond-Connersville, IN', value: '458'}, {htmlStr: 'Rochester-Austin, MN', value: '462'}, {htmlStr: 'Rochester-Batavia-Seneca Falls, NY', value: '464'}, {htmlStr: 'Rockford-Freeport-Rochelle, IL', value: '466'}, {htmlStr: 'Rocky Mount-Wilson-Roanoke Rapids, NC', value: '468'}, {htmlStr: 'Sacramento-Roseville, CA', value: '472'}, {htmlStr: 'Saginaw-Midland-Bay City, MI', value: '474'}, {htmlStr: 'St. Louis-St. Charles-Farmington, MO-IL', value: '476'}, {htmlStr: 'Salisbury-Cambridge, MD-DE', value: '480'}, {htmlStr: 'Salt Lake City-Provo-Orem, UT', value: '482'}, {htmlStr: 'San Antonio-New Braunfels-Pearsall, TX', value: '484'}, {htmlStr: 'San Jose-San Francisco-Oakland, CA', value: '488'}, {htmlStr: 'San Juan-Bayam?n, PR', value: '490'}, {htmlStr: 'Savannah-Hinesville-Statesboro, GA', value: '496'}, {htmlStr: 'Scottsboro-Fort Payne, AL', value: '497'}, {htmlStr: 'Seattle-Tacoma, WA', value: '500'}, {htmlStr: 'Shreveport-Bossier City-Minden, LA', value: '508'}, {htmlStr: 'South Bend-Elkhart-Mishawaka, IN-MI', value: '515'}, {htmlStr: 'Spencer-Spirit Lake, IA', value: '517'}, {htmlStr: 'Spokane-Spokane Valley-Coeur dAlene, WA-ID', value: '518'}, {htmlStr: 'Springfield-Jacksonville-Lincoln, IL', value: '522'}, {htmlStr: 'State College-DuBois, PA', value: '524'}, {htmlStr: 'Steamboat Springs-Craig, CO', value: '525'}, {htmlStr: 'Syracuse-Auburn, NY', value: '532'}, {htmlStr: 'Toledo-Findlay-Tiffin, OH', value: '534'}, {htmlStr: 'Tucson-Nogales, AZ', value: '536'}, {htmlStr: 'Tulsa-Muskogee-Bartlesville, OK', value: '538'}, {htmlStr: 'Tupelo-Corinth, MS', value: '539'}, {htmlStr: 'Tyler-Jacksonville, TX', value: '540'}, {htmlStr: 'Victoria-Port Lavaca, TX', value: '544'}, {htmlStr: 'Virginia Beach-Norfolk, VA-NC', value: '545'}, {htmlStr: 'Washington-Baltimore-Arlington, DC-MD-VA-WV-PA', value: '548'}, {htmlStr: 'Wausau-Stevens Point-Wisconsin Rapids, WI', value: '554'}, {htmlStr: 'Wichita-Winfield, KS', value: '556'}, {htmlStr: 'Williamsport-Lock Haven, PA', value: '558'}, {htmlStr: 'Youngstown-Warren, OH-PA', value: '566'}]
                    }
                }},
                {location_year_first_appeared: {
                    element: {
                        tagName: 'select',
                        placeholder: 'Year First Appeared',
                        optionVals: [{value: '', htmlStr: 'Choose'}, '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', '1954', '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', '1945', '1944', '1943', '1942', '1941', '1940', '1939', '1938', '1937', '1936', '1935', '1934', '1933', '1932', '1931', '1930', '1929', '1928', '1927', '1926', '1925', '1924', '1923', '1922', '1921', '1920', '1919', '1918', '1917', '1916', '1915', '1914', '1913', '1912', '1911', '1910', '1909', '1908', '1907', '1906', '1905', '1904', '1903', '1902', '1901', '1900']
                    }
                }},
                'location_carrier_route',
                'location_delivery_point',
                {'location_delivery_point_check_digit': {
                    placeholder: 'Location Point Check Digit'
                }},
                {'location_delivery_point_bar_code': {
                    placeholder: 'Location Point Bar Code'
                }},
                'location_elot_sequence',
                'location_elot_sort',
                {'location_rdi': {
                    placeholder: 'Location RDI'
                }},
                {'location_congressional_district': {
                    placeholder: 'Location Cong District'
                }},
                'employee_size_actual',
                {employee_size_range: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, '1 to 4', '5 to 9', '10 to 19', '20 to 49', '50 to 99', '100 to 249', '250 to 499', '500 to 999', '1000 to 4999', '5000 to 9999', '10000+']
                    }
                }},
                'sales_volume_actual',
                {sales_volume_range: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, 'Less Than $500,000', '$500,000 - 1 Million', '$1 - 2.5 Million', '$2.5 - 5 Million', '$5 - 10 Million', '$10 - 20 Million', '$20 - 50 Million', '$50 - 100 Million', '$100 - 500 Million', '$500 Million - $1 Bi', 'Over $1 Billion']
                    }
                }},
    /*            optionVals: ['5211-07', '5211-10', '5211-18', '5211-26', '5211-28', '5211-31', '5211-32', '5211-38', '5211-42', '5231-06', '5231-07', '5231-10', '5251-01', '5251-04', '5261-01', '5261-02', '5261-04', '5261-08', '5261-09', '5261-32', '0782-04', '0782-06', '0782-07', '0783-01', '0851-02', '1521-03', '1521-05', '1521-13', '1521-14', '1521-39', '1542-13', '1611-01', '1611-02', '1623-07', '1711-02', '1711-03', '1711-05', '1711-07', '1711-08', '1711-10', '1711-14', '1711-17', '1711-26', '1721-01', '1731-01', '1741-01', '1742-03', '1742-05', '1743-01', '1751-02', '1751-03', '1751-06', '1752-03', '1761-03', '1761-09', '1761-11', '1771-05', '1791-03', '1794-03', '1794-05', '1795-02', '1799-05', '1799-11', '1799-21', '5311-02', '5311-04', '5331-01', '5399-01', '8711-06', '8711-11', '8712-02', '8712-10', '8713-01']*/
                {primary_sic_orig: {
                    forms: ['add']
                }},
                {primary_sic: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, '521107', '521110', '521118', '521126', '521128', '521131', '521132', '521138', '521142', '523106', '523107', '523110', '525101', '525104', '526101', '526102', '526104', '526108', '526109', '526132', '078204', '078206', '078207', '078301', '085102', '152103', '152105', '152113', '152114', '152139', '154213', '161101', '161102', '162307', '171102', '171103', '171105', '171107', '171108', '171110', '171114', '171117', '171126', '172101', '173101', '174101', '174203', '174205', '174301', '175102', '175103', '175106', '175203', '176103', '176109', '176111', '177105', '179103', '179403', '179405', '179502', '179905', '179911', '179921', '531102', '531104', '533101', '539901', '871106', '871111', '871202', '871210', '871301']
                    }
                }},
                {primary_sic_desc_orig: {
                    forms: ['add']
                }},
                {primary_sic_desc: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, 'Accountants', 'Accountants-Certified-General', 'Accountants-Chartered', 'Accounting & Bookkeeping General Service', 'Air Conditioning Contractors & Systems', 'Architects', 'Bathroom Remodeling', 'Building Construction-Consultants', 'Building Contractors', 'Building Materials', 'Business Management Consultants', 'Cabinet Makers', 'Carpenters', 'Communications Consultants', 'Concrete-Ready Mixed', 'Concrete Contractors', 'Demolition Contractors', 'Department Stores', 'Discount Stores', 'Doors', 'Doors-Overhead Type', 'Dry Wall Contractors', 'Electric Contractors', 'Engineers', 'Engineers-Consulting', 'Engines-gas', 'Environmental & Ecological Svcs.', 'Excavating Contractors', 'Fire Damage Restoration', 'Floor Laying Refinishing & Resurfacing', 'Foundation Contractors', 'Furnace-Repair & Cleaning', 'Garden Centres', 'General Contractors', 'General Merchandise-Retail', 'Glass-Auto Plate Window & Etc.', 'Gutters & Downspouts', 'Hardware - Retail', 'Heating Contractors', 'Home Centers', 'Home Improvements', 'Insulation Contractors-Cold & Heat', 'Landscape Contractors', 'Lawn & Garden Equip & Supplies-Retail', 'Lawn & Grounds Maintenance', 'Lawn Mowers', 'Lumber-Retail', 'Marketing Consultants', 'Masonry Contractors', 'Mechanical Contractors', 'Nurserymen', 'Paint - Retail', 'Painters', 'Paving Contractors', 'Pet Services', 'Pet Washing & Grooming', 'Plumbing Contractors', 'Plumbing Fixtures & Supplies New-Retail', 'Railings', 'Refrigeration Contractors', 'Remodeling & Repairing Bldg Contractors', 'Road Building Contractors', 'Roofing Contractors', 'Sandblasting', 'Saws', 'Septic Tanks', 'Septic Tanks/Systems-Cleaning/Repairing', 'Sewer Contractors', 'Sheet Metal Work Contractors', 'Siding Contractors', 'Siding Materials', 'Snow Removal Equip-Retail', 'Steel Fabricators', 'Surveyors-Land', 'Swimming Pool Contractors Dealers & Designers', 'Tax Consultants', 'Tile-Ceramic-Contractors & Dealers', 'Topsoil', 'Tree Service', 'Variety Stores', 'Veterinarians', 'Wallpapers & Wallcoverings Retail', 'Windows', 'Woodworkers']
                    }
                }},
                {second_sic_orig: {
                    forms: ['add']
                }},
                {second_sic: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, '521107', '521110', '521118', '521126', '521128', '521131', '521132', '521138', '521142', '523106', '523107', '523110', '525101', '525104', '526101', '526102', '526104', '526108', '526109', '526132', '078204', '078206', '078207', '078301', '085102', '152103', '152105', '152113', '152114', '152139', '154213', '161101', '161102', '162307', '171102', '171103', '171105', '171107', '171108', '171110', '171114', '171117', '171126', '172101', '173101', '174101', '174203', '174205', '174301', '175102', '175103', '175106', '175203', '176103', '176109', '176111', '177105', '179103', '179403', '179405', '179502', '179905', '179911', '179921', '531102', '531104', '533101', '539901', '871106', '871111', '871202', '871210', '871301']
                    }
                }},
                {second_sic_desc_orig: {
                    forms: ['add']
                }},
                {second_sic_desc: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, 'Accountants', 'Accountants-Certified-General', 'Accountants-Chartered', 'Accounting & Bookkeeping General Service', 'Air Conditioning Contractors & Systems', 'Architects', 'Bathroom Remodeling', 'Building Construction-Consultants', 'Building Contractors', 'Building Materials', 'Business Management Consultants', 'Cabinet Makers', 'Carpenters', 'Communications Consultants', 'Concrete-Ready Mixed', 'Concrete Contractors', 'Demolition Contractors', 'Department Stores', 'Discount Stores', 'Doors', 'Doors-Overhead Type', 'Dry Wall Contractors', 'Electric Contractors', 'Engineers', 'Engineers-Consulting', 'Engines-gas', 'Environmental & Ecological Svcs.', 'Excavating Contractors', 'Fire Damage Restoration', 'Floor Laying Refinishing & Resurfacing', 'Foundation Contractors', 'Furnace-Repair & Cleaning', 'Garden Centres', 'General Contractors', 'General Merchandise-Retail', 'Glass-Auto Plate Window & Etc.', 'Gutters & Downspouts', 'Hardware - Retail', 'Heating Contractors', 'Home Centers', 'Home Improvements', 'Insulation Contractors-Cold & Heat', 'Landscape Contractors', 'Lawn & Garden Equip & Supplies-Retail', 'Lawn & Grounds Maintenance', 'Lawn Mowers', 'Lumber-Retail', 'Marketing Consultants', 'Masonry Contractors', 'Mechanical Contractors', 'Nurserymen', 'Paint - Retail', 'Painters', 'Paving Contractors', 'Pet Services', 'Pet Washing & Grooming', 'Plumbing Contractors', 'Plumbing Fixtures & Supplies New-Retail', 'Railings', 'Refrigeration Contractors', 'Remodeling & Repairing Bldg Contractors', 'Road Building Contractors', 'Roofing Contractors', 'Sandblasting', 'Saws', 'Septic Tanks', 'Septic Tanks/Systems-Cleaning/Repairing', 'Sewer Contractors', 'Sheet Metal Work Contractors', 'Siding Contractors', 'Siding Materials', 'Snow Removal Equip-Retail', 'Steel Fabricators', 'Surveyors-Land', 'Swimming Pool Contractors Dealers & Designers', 'Tax Consultants', 'Tile-Ceramic-Contractors & Dealers', 'Topsoil', 'Tree Service', 'Variety Stores', 'Veterinarians', 'Wallpapers & Wallcoverings Retail', 'Windows', 'Woodworkers']
                    }
                }},
                {third_sic_orig: {
                    forms: ['add']
                }},
                {third_sic: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, '521107', '521110', '521118', '521126', '521128', '521131', '521132', '521138', '521142', '523106', '523107', '523110', '525101', '525104', '526101', '526102', '526104', '526108', '526109', '526132', '078204', '078206', '078207', '078301', '085102', '152103', '152105', '152113', '152114', '152139', '154213', '161101', '161102', '162307', '171102', '171103', '171105', '171107', '171108', '171110', '171114', '171117', '171126', '172101', '173101', '174101', '174203', '174205', '174301', '175102', '175103', '175106', '175203', '176103', '176109', '176111', '177105', '179103', '179403', '179405', '179502', '179905', '179911', '179921', '531102', '531104', '533101', '539901', '871106', '871111', '871202', '871210', '871301']
                    }
                }},
                {third_sic_desc_orig: {
                    forms: ['add']
                }},
                {third_sic_desc: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, 'Accountants', 'Accountants-Certified-General', 'Accountants-Chartered', 'Accounting & Bookkeeping General Service', 'Air Conditioning Contractors & Systems', 'Architects', 'Bathroom Remodeling', 'Building Construction-Consultants', 'Building Contractors', 'Building Materials', 'Business Management Consultants', 'Cabinet Makers', 'Carpenters', 'Communications Consultants', 'Concrete-Ready Mixed', 'Concrete Contractors', 'Demolition Contractors', 'Department Stores', 'Discount Stores', 'Doors', 'Doors-Overhead Type', 'Dry Wall Contractors', 'Electric Contractors', 'Engineers', 'Engineers-Consulting', 'Engines-gas', 'Environmental & Ecological Svcs.', 'Excavating Contractors', 'Fire Damage Restoration', 'Floor Laying Refinishing & Resurfacing', 'Foundation Contractors', 'Furnace-Repair & Cleaning', 'Garden Centres', 'General Contractors', 'General Merchandise-Retail', 'Glass-Auto Plate Window & Etc.', 'Gutters & Downspouts', 'Hardware - Retail', 'Heating Contractors', 'Home Centers', 'Home Improvements', 'Insulation Contractors-Cold & Heat', 'Landscape Contractors', 'Lawn & Garden Equip & Supplies-Retail', 'Lawn & Grounds Maintenance', 'Lawn Mowers', 'Lumber-Retail', 'Marketing Consultants', 'Masonry Contractors', 'Mechanical Contractors', 'Nurserymen', 'Paint - Retail', 'Painters', 'Paving Contractors', 'Pet Services', 'Pet Washing & Grooming', 'Plumbing Contractors', 'Plumbing Fixtures & Supplies New-Retail', 'Railings', 'Refrigeration Contractors', 'Remodeling & Repairing Bldg Contractors', 'Road Building Contractors', 'Roofing Contractors', 'Sandblasting', 'Saws', 'Septic Tanks', 'Septic Tanks/Systems-Cleaning/Repairing', 'Sewer Contractors', 'Sheet Metal Work Contractors', 'Siding Contractors', 'Siding Materials', 'Snow Removal Equip-Retail', 'Steel Fabricators', 'Surveyors-Land', 'Swimming Pool Contractors Dealers & Designers', 'Tax Consultants', 'Tile-Ceramic-Contractors & Dealers', 'Topsoil', 'Tree Service', 'Variety Stores', 'Veterinarians', 'Wallpapers & Wallcoverings Retail', 'Windows', 'Woodworkers']
                    }
                }},
                {credit_score_alpha: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, 'A', 'A+', 'B', 'B+', 'C', 'C+', 'I', 'P', 'U']
                    }
                }},
                {credit_score_numeric: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
                    }
                }},
                {org_type: {
                    element: {
                        tagName: 'select',
                        optionVals: [{value: '', htmlStr: 'Choose'}, 'Firm/Business', 'Individual', 'LLC', 'Sole Proprietor', 'C-Corp', 'S-Corp']
                    }
                }},
                'infousa_id',
                {window_companies_record_id: {
                    placeholder: 'WC Record Id'
                }},
                {days_open: {
                        element: {
                            name: 'days_open[]',
                            tagName: 'select',
                            attributes: {multiple: 'multiple', style: 'height: 125px;'},
                            optionVals: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            multiSelect: {buttonWidth: '100%'}
                        }
                }},
                {
                    time_open: {
                        element: {
                            tagName: 'select',
                            optionVals: [{value: '', htmlStr: 'Choose'}, {value: '21600', htmlStr: '6:00 AM'}, {value: '22500', htmlStr: '6:15 AM'}, {value: '23400', htmlStr: '6:30 AM'}, {value: '24300', htmlStr: '6:45 AM'}, {value: '25200', htmlStr: '7:00 AM'}, {value: '26100', htmlStr: '7:15 AM'}, {value: '27000', htmlStr: '7:30 AM'}, {value: '27900', htmlStr: '7:45 AM'}, {value: '28800', htmlStr: '8:00 AM'}, {value: '29700', htmlStr: '8:15 AM'}, {value: '30600', htmlStr: '8:30 AM'}, {value: '31500', htmlStr: '8:45 AM'}, {value: '32400', htmlStr: '9:00 AM'}, {value: '33300', htmlStr: '9:15 AM'}, {value: '34200', htmlStr: '9:30 AM'}, {value: '35100', htmlStr: '9:45 AM'}, {value: '36000', htmlStr: '10:00 AM'}, {value: '36900', htmlStr: '10:15 AM'}, {value: '37800', htmlStr: '10:30 AM'}, {value: '38700', htmlStr: '10:45 AM'}, {value: '39600', htmlStr: '11:00 AM'}, {value: '40500', htmlStr: '11:15 AM'}, {value: '41400', htmlStr: '11:30 AM'}, {value: '42300', htmlStr: '11:45 AM'}, {value: '43200', htmlStr: '12:00 PM'}, {value: '44100', htmlStr: '12:15 PM'}, {value: '45000', htmlStr: '12:30 PM'}, {value: '45900', htmlStr: '12:45 PM'}, {value: '46800', htmlStr: '1:00 PM'}, {value: '47700', htmlStr: '1:15 PM'}, {value: '48600', htmlStr: '1:30 PM'}, {value: '49500', htmlStr: '1:45 PM'}, {value: '50400', htmlStr: '2:00 PM'}, {value: '51300', htmlStr: '2:15 PM'}, {value: '52200', htmlStr: '2:30 PM'}, {value: '53100', htmlStr: '2:45 PM'}, {value: '54000', htmlStr: '3:00 PM'}, {value: '54900', htmlStr: '3:15 PM'}, {value: '55800', htmlStr: '3:30 PM'}, {value: '56700', htmlStr: '3:45 PM'}, {value: '57600', htmlStr: '4:00 PM'}, {value: '58500', htmlStr: '4:15 PM'}, {value: '59400', htmlStr: '4:30 PM'}, {value: '60300', htmlStr: '4:45 PM'}, {value: '61200', htmlStr: '5:00 PM'}, {value: '62100', htmlStr: '5:15 PM'}, {value: '63000', htmlStr: '5:30 PM'}, {value: '63900', htmlStr: '5:45 PM'}, {value: '64800', htmlStr: '6:00 PM'}, {value: '65700', htmlStr: '6:15 PM'}, {value: '66600', htmlStr: '6:30 PM'}, {value: '67500', htmlStr: '6:45 PM'}, {value: '68400', htmlStr: '7:00 PM'}, {value: '69300', htmlStr: '7:15 PM'}, {value: '70200', htmlStr: '7:30 PM'}, {value: '71100', htmlStr: '7:45 PM'}, {value: '72000', htmlStr: '8:00 PM'}, {value: '72900', htmlStr: '8:15 PM'}, {value: '73800', htmlStr: '8:30 PM'}, {value: '74700', htmlStr: '8:45 PM'}, {value: '75600', htmlStr: '9:00 PM'}, {value: '76500', htmlStr: '9:15 PM'}, {value: '77400', htmlStr: '9:30 PM'}, {value: '78300', htmlStr: '9:45 PM'}, {value: '79200', htmlStr: '10:00 PM'}, {value: '80100', htmlStr: '10:15 PM'}, {value: '81000', htmlStr: '10:30 PM'}, {value: '81900', htmlStr: '10:45 PM'}, {value: '82800', htmlStr: '11:00 PM'}, {value: '83700', htmlStr: '11:15 PM'}, {value: '84600', htmlStr: '11:30 PM'}, {value: '85500', htmlStr: '11:45 PM'}, {value: '43200', htmlStr: '12:00 AM'}, {value: '44100', htmlStr: '12:15 AM'}, {value: '45000', htmlStr: '12:30 AM'}, {value: '45900', htmlStr: '12:45 AM'}, {value: '3600', htmlStr: '1:00 AM'}, {value: '4500', htmlStr: '1:15 AM'}, {value: '5400', htmlStr: '1:30 AM'}, {value: '6300', htmlStr: '1:45 AM'}, {value: '7200', htmlStr: '2:00 AM'}, {value: '8100', htmlStr: '2:15 AM'}, {value: '9000', htmlStr: '2:30 AM'}, {value: '9900', htmlStr: '2:45 AM'}, {value: '10800', htmlStr: '3:00 AM'}, {value: '11700', htmlStr: '3:15 AM'}, {value: '12600', htmlStr: '3:30 AM'}, {value: '13500', htmlStr: '3:45 AM'}, {value: '14400', htmlStr: '4:00 AM'}, {value: '15300', htmlStr: '4:15 AM'}, {value: '16200', htmlStr: '4:30 AM'}, {value: '17100', htmlStr: '4:45 AM'}, {value: '18000', htmlStr: '5:00 AM'}, {value: '18900', htmlStr: '5:15 AM'}, {value: '19800', htmlStr: '5:30 AM'}, {value: '20700', htmlStr: '5:45 AM'}],
                            multiSelect: {buttonWidth: '100%'}
                        }
                    }
                },
                {
                    time_closed: {
                        element: {
                            tagName: 'select',
                            optionVals: [{value: '', htmlStr: 'Choose'}, {value: '21600', htmlStr: '6:00 AM'}, {value: '22500', htmlStr: '6:15 AM'}, {value: '23400', htmlStr: '6:30 AM'}, {value: '24300', htmlStr: '6:45 AM'}, {value: '25200', htmlStr: '7:00 AM'}, {value: '26100', htmlStr: '7:15 AM'}, {value: '27000', htmlStr: '7:30 AM'}, {value: '27900', htmlStr: '7:45 AM'}, {value: '28800', htmlStr: '8:00 AM'}, {value: '29700', htmlStr: '8:15 AM'}, {value: '30600', htmlStr: '8:30 AM'}, {value: '31500', htmlStr: '8:45 AM'}, {value: '32400', htmlStr: '9:00 AM'}, {value: '33300', htmlStr: '9:15 AM'}, {value: '34200', htmlStr: '9:30 AM'}, {value: '35100', htmlStr: '9:45 AM'}, {value: '36000', htmlStr: '10:00 AM'}, {value: '36900', htmlStr: '10:15 AM'}, {value: '37800', htmlStr: '10:30 AM'}, {value: '38700', htmlStr: '10:45 AM'}, {value: '39600', htmlStr: '11:00 AM'}, {value: '40500', htmlStr: '11:15 AM'}, {value: '41400', htmlStr: '11:30 AM'}, {value: '42300', htmlStr: '11:45 AM'}, {value: '43200', htmlStr: '12:00 PM'}, {value: '44100', htmlStr: '12:15 PM'}, {value: '45000', htmlStr: '12:30 PM'}, {value: '45900', htmlStr: '12:45 PM'}, {value: '46800', htmlStr: '1:00 PM'}, {value: '47700', htmlStr: '1:15 PM'}, {value: '48600', htmlStr: '1:30 PM'}, {value: '49500', htmlStr: '1:45 PM'}, {value: '50400', htmlStr: '2:00 PM'}, {value: '51300', htmlStr: '2:15 PM'}, {value: '52200', htmlStr: '2:30 PM'}, {value: '53100', htmlStr: '2:45 PM'}, {value: '54000', htmlStr: '3:00 PM'}, {value: '54900', htmlStr: '3:15 PM'}, {value: '55800', htmlStr: '3:30 PM'}, {value: '56700', htmlStr: '3:45 PM'}, {value: '57600', htmlStr: '4:00 PM'}, {value: '58500', htmlStr: '4:15 PM'}, {value: '59400', htmlStr: '4:30 PM'}, {value: '60300', htmlStr: '4:45 PM'}, {value: '61200', htmlStr: '5:00 PM'}, {value: '62100', htmlStr: '5:15 PM'}, {value: '63000', htmlStr: '5:30 PM'}, {value: '63900', htmlStr: '5:45 PM'}, {value: '64800', htmlStr: '6:00 PM'}, {value: '65700', htmlStr: '6:15 PM'}, {value: '66600', htmlStr: '6:30 PM'}, {value: '67500', htmlStr: '6:45 PM'}, {value: '68400', htmlStr: '7:00 PM'}, {value: '69300', htmlStr: '7:15 PM'}, {value: '70200', htmlStr: '7:30 PM'}, {value: '71100', htmlStr: '7:45 PM'}, {value: '72000', htmlStr: '8:00 PM'}, {value: '72900', htmlStr: '8:15 PM'}, {value: '73800', htmlStr: '8:30 PM'}, {value: '74700', htmlStr: '8:45 PM'}, {value: '75600', htmlStr: '9:00 PM'}, {value: '76500', htmlStr: '9:15 PM'}, {value: '77400', htmlStr: '9:30 PM'}, {value: '78300', htmlStr: '9:45 PM'}, {value: '79200', htmlStr: '10:00 PM'}, {value: '80100', htmlStr: '10:15 PM'}, {value: '81000', htmlStr: '10:30 PM'}, {value: '81900', htmlStr: '10:45 PM'}, {value: '82800', htmlStr: '11:00 PM'}, {value: '83700', htmlStr: '11:15 PM'}, {value: '84600', htmlStr: '11:30 PM'}, {value: '85500', htmlStr: '11:45 PM'}, {value: '43200', htmlStr: '12:00 AM'}, {value: '44100', htmlStr: '12:15 AM'}, {value: '45000', htmlStr: '12:30 AM'}, {value: '45900', htmlStr: '12:45 AM'}, {value: '3600', htmlStr: '1:00 AM'}, {value: '4500', htmlStr: '1:15 AM'}, {value: '5400', htmlStr: '1:30 AM'}, {value: '6300', htmlStr: '1:45 AM'}, {value: '7200', htmlStr: '2:00 AM'}, {value: '8100', htmlStr: '2:15 AM'}, {value: '9000', htmlStr: '2:30 AM'}, {value: '9900', htmlStr: '2:45 AM'}, {value: '10800', htmlStr: '3:00 AM'}, {value: '11700', htmlStr: '3:15 AM'}, {value: '12600', htmlStr: '3:30 AM'}, {value: '13500', htmlStr: '3:45 AM'}, {value: '14400', htmlStr: '4:00 AM'}, {value: '15300', htmlStr: '4:15 AM'}, {value: '16200', htmlStr: '4:30 AM'}, {value: '17100', htmlStr: '4:45 AM'}, {value: '18000', htmlStr: '5:00 AM'}, {value: '18900', htmlStr: '5:15 AM'}, {value: '19800', htmlStr: '5:30 AM'}, {value: '20700', htmlStr: '5:45 AM'}],
                            multiSelect: {buttonWidth: '100%'}
                        }
                    }
                },
                {'location_time_zone': {
                    element: {
                        tagName: 'select',
                        optionVals: [{htmlStr: 'Time Zone', value: ''}, {htmlStr: 'Eastern', value: 'Eastern'}, {htmlStr: 'Central', value: 'Central'}, {htmlStr: 'Mountain', value: 'Mountain'}, {htmlStr: 'Pacific', value: 'Pacific'}, {htmlStr: 'Alaska', value: 'Alaska'}, {htmlStr: 'Hawaii', value: 'Hawaii'}],
                    }
                }},
                {'location_utc_offset': {
                    element: {
                        tagName: 'select',
                        placeholder: 'Location UTC Offset',
                        optionVals: [{htmlStr: 'UTC Offset', value: ''}, {htmlStr: '-5', value: '-5'}, {htmlStr: '-6', value: '-6'}, {htmlStr: '-7', value: '-7'}, {htmlStr: '-8', value: '-8'}, {htmlStr: '-9', value: '-9'}, {htmlStr: '-10', value: '-10'}],
                    }
                }},
                {'location_dst': {
                    element: {
                       tagName: 'select',
                       placeholder: 'Location DST',
                       optionVals: [{htmlStr: 'DST', value: ''}, {htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}]
                   }
                }},
                {facebook_url: {
                    element: {
                        dataAttributes: {'addon-url': 'https://www.facebook.com/', 'sm-network': 'facebook'},
                        addOnLeft: {icon: 'facebook-f', htmlStr: '', className: 'addOn130 web_link'},
                        addOnRight: {icon: 'external-link', className: 'add_on_slim pop_external_link_inactive', title: 'Add Link to Make Active'}
                    }
                }},
                {facebook_username: {
                    element: {
                        placeholder: 'Username',
                        dataAttributes: {'sm-network': 'facebook'}
                    }
                }},
                {facebook_is_claimed: {
                    element: {
                        tagName: 'select',
                        dataAttributes: {'sm-network': 'facebook'},
                        optionVals: [{value: '', htmlStr: 'Choose'}, {htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}],
                        addOnLeft: {htmlStr: 'Claimed'}
                    }
                }},
                {facebook_num_page_likes: {
                    element: {
                        placeholder: 'Likes',
                        dataAttributes: {'sm-network': 'facebook'}
                    }
                }},
                {facebook_num_of_ratings: {
                    element: {
                        placeholder: '# Rtngs',
                        dataAttributes: {'sm-network': 'facebook'}
                    }
                }},
                {facebook_avg_rating: {
                    element: {
                        placeholder: 'Avg Rtng',
                        dataAttributes: {'sm-network': 'facebook'}
                    }
                }},
                {facebook_prime_cat: {
                    element: {
                        placeholder: 'Prime Category',
                        dataAttributes: {'sm-network': 'facebook'},
                        addOnLeft: {htmlStr:'Prime Cat'}
                    }
                }},
                {facebook_cats: {
                    element: {
                        placeholder: 'All Categories',
                        tagName: 'textarea',
                        attributes: {style: 'height: 129px;'},
                        dataAttributes: {'sm-network': 'facebook'},
                    }
                }},
                {facebook_id: {
                    element: {
                        placeholder: 'User ID',
                        dataAttributes: {'sm-network': 'facebook'},
                    }
                }},
                {yellow_pages_url: {
                    element: {
                        placeholder: 'URL',
                        dataAttributes: {'addon-url': 'https://www.yellowpages.com/', 'sm-network': 'yellow_pages'},
                        addOnLeft: {htmlStr: '', icon: 'address-book', className: 'addOn130 web_link'},
                        addOnRight: {icon: 'external-link', className: 'add_on_slim pop_external_link_inactive', title: 'Add Link to Make Active'}
                    }
                }},
                {yellow_pages_is_claimed: {
                    element: {
                        tagName: 'select',
                        dataAttributes: {'sm-network': 'yellow_pages'},
                        optionVals: [{value: '', htmlStr: 'Choose'}, {htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}],
                        addOnLeft: {htmlStr: 'Claimed'}
                    }
                }},
                {yellow_pages_num_of_ratings: {
                    element: {
                        placeholder: '# Rtngs',
                        dataAttributes: {'sm-network': 'yellow_pages'}
                    }
                }},
                {yellow_pages_avg_rating: {
                    element: {
                        placeholder: 'Avg Rtng',
                        dataAttributes: {'sm-network': 'yellow_pages'}
                    }
                }},
                {yellow_pages_prime_cat: {
                    element: {
                        placeholder: 'Prime Cat',
                        dataAttributes: {'sm-network': 'yellow_pages'}
                    }
                }},
                {yellow_pages_cats: {
                    element: {
                        placeholder: 'All Categories',
                        tagName: 'textarea',
                        attributes: {style: 'height: 96px;'},
                        dataAttributes: {'sm-network': 'yellow_pages'}
                    }
                }},
                {yellow_pages_id: {
                    element: {
                        placeholder: 'ID',
                        dataAttributes: {'sm-network': 'yellow_pages'}
                    }
                }},
                {yellow_pages_ad_size: {
                    element: {
                        placeholder: 'Ad Size'
                    }
                }},
                {instagram_url: {
                    element: {
                        placeholder: 'Instagram Handle',
                        dataAttributes: {'addon-url': 'https://www.instagram.com/'},
                        addOnLeft: {htmlStr: '', icon: 'instagram', className: 'addOn40 web_link'},
                        addOnRight: {icon: 'external-link', className: 'add_on_slim pop_external_link_inactive', title: 'Add Link to Make Active'}
                    }
                }},
                {linked_in_url: {
                    element: {
                        placeholder: 'LinkedIn Handle',
                        dataAttributes: {'addon-url': 'https://www.linkedin.com/'},
                        addOnLeft: {htmlStr: '', icon: 'linkedin', className: 'addOn40 web_link'},
                        addOnRight: {icon: 'external-link', className: 'add_on_slim pop_external_link_inactive', title: 'Add Link to Make Active'}
                    }
                }},
                {pinterest_url: {
                    element: {
                        placeholder: 'Pinterest Handle',
                        dataAttributes: {'addon-url': 'https://www.pinterest.com/'},
                        addOnLeft: {htmlStr: '', icon: 'pinterest-p', className: 'addOn40 web_link'},
                        addOnRight: {icon: 'external-link', className: 'add_on_slim pop_external_link_inactive', title: 'Add Link to Make Active'}
                    }
                }},
                {twitter_url: {
                    element: {
                        placeholder: 'Twitter Handle',
                        dataAttributes: {'addon-url': 'https://www.twitter.com/'},
                        addOnLeft: {htmlStr: '', icon: 'twitter', className: 'addOn40 web_link'},
                        addOnRight: {icon: 'external-link', className: 'add_on_slim pop_external_link_inactive', title: 'Add Link to Make Active'}
                    }
                }},
                {yelp_url: {
                    element: {
                        placeholder: 'Yelp Handle',
                        dataAttributes: {'addon-url': 'https://www.yelp.com/'},
                        addOnLeft: {htmlStr: '', icon: 'yelp', className: 'addOn40 web_link'},
                        addOnRight: {icon: 'external-link', className: 'add_on_slim pop_external_link_inactive', title: 'Add Link to Make Active'}
                    }
                }},
                {you_tube_url: {
                    element: {
                        placeholder: 'You Tube Handle',
                        dataAttributes: {'addon-url': 'https://www.youtube.com/'},
                        addOnLeft: {htmlStr: '', icon: 'youtube', className: 'addOn40 web_link'},
                        addOnRight: {icon: 'external-link', className: 'add_on_slim pop_external_link_inactive', title: 'Add Link to Make Active'}
                    }
                }},
                {company_description: {
                    element: {
                        tagName: 'textarea',
                        attributes: {style: 'height:300px;'}
                    }
                }},
                {categories_code: {
                    element: {
                        name: 'categories_code[]',
                        tagName: 'select',
                        attributes: ['multiple'],
                        title: 'Service Categories',
                        optionTextFields: ['description'],
                    }
                }},
                {location_service_radius: {
                    placeholder: 'Service Radius',
                    element: {
                        tagName: 'select',
                        attributes: {id: 'location_service_radius'},
                        optionVals: [{value: '', htmlStr: 'Choose'},
                                     {htmlStr: '5 miles', value: '5'  },
                                     {htmlStr: '10 miles', value: '10' },
                                     {htmlStr: '15 miles', value: '15' },
                                     {htmlStr: '20 miles', value: '20' },
                                     {htmlStr: '25 miles', value: '25' },
                                     {htmlStr: '30 miles', value: '30' },
                                     {htmlStr: '35 miles', value: '35' },
                                     {htmlStr: '40 miles', value: '40' },
                                     {htmlStr: '45 miles', value: '45' },
                                     {htmlStr: '50 miles', value: '50' },
                                     {htmlStr: '55 miles', value: '55' },
                                     {htmlStr: '60 miles', value: '60' },
                                     {htmlStr: '70 miles', value: '70' },
                                     {htmlStr: '80 miles', value: '80' },
                                     {htmlStr: '90 miles', value: '90' },
                                     {htmlStr: '100 miles', value: '100' },
                                     {htmlStr: '500 miles', value: '500' }
                                     ],
                    }
                }},
                {location_service_map: {
                    element: {
                        tagName: 'div',
                        attributes: {id: 'location_service_map'},
                        addOnLeft: false
                    }
                }},
                {location_service_zip_codes: {
                    element: {
                        tagName: 'div',
                        dataAttributes: {iseditablelist: true, editablelistitemtype: 'zip'},
                        addOnLeft: false
                    }
                }},
                {location_service_cities: {
                    element: {
                        tagName: 'div',
                        dataAttributes: {iseditablelist: true, editablelistitemtype: 'city'},
                        addOnLeft: false
                    }
                }},
                {internal_notes: {
                    element: {
                        tagName: 'textarea',
                        attributes: {style: 'height:200px;'}
                    }
                }}
            ],
            addSearch: [
                    {type: {
                        element: {
                            type: 'hidden',
                            defaultVal: 'intWIListings'
                        }
                    }},
                    {st: {
                        element: {
                            tagName: 'select',
                            attributes: {id: 'st'},
                            addClassName: 'select_reset_form',
                            placeholder: 'State',
                            optionVals: [{value: '', htmlStr: 'Choose'}, {value: 'AL', htmlStr: 'Alabama'}, {value: 'AK', htmlStr: 'Alaska'}, {value: 'AZ', htmlStr: 'Arizona'}, {value: 'AR', htmlStr: 'Arkansas'}, {value: 'CA', htmlStr: 'California'}, {value: 'CO', htmlStr: 'Colorado'}, {value: 'CT', htmlStr: 'Connecticut'}, {value: 'DE', htmlStr: 'Delaware'}, {value: 'FL', htmlStr: 'Florida'}, {value: 'GA', htmlStr: 'Georgia'}, {value: 'HI', htmlStr: 'Hawaii'}, {value: 'ID', htmlStr: 'Idaho'}, {value: 'IL', htmlStr: 'Illinois'}, {value: 'IN', htmlStr: 'Indiana'}, {value: 'IA', htmlStr: 'Iowa'}, {value: 'KS', htmlStr: 'Kansas'}, {value: 'KY', htmlStr: 'Kentucky'}, {value: 'LA', htmlStr: 'Louisiana'}, {value: 'ME', htmlStr: 'Maine'}, {value: 'MD', htmlStr: 'Maryland'}, {value: 'MA', htmlStr: 'Massachusetts'}, {value: 'MI', htmlStr: 'Michigan'}, {value: 'MN', htmlStr: 'Minnesota'}, {value: 'MS', htmlStr: 'Mississippi'}, {value: 'MO', htmlStr: 'Missouri'}, {value: 'MT', htmlStr: 'Montana'}, {value: 'NE', htmlStr: 'Nebraska'}, {value: 'NV', htmlStr: 'Nevada'}, {value: 'NH', htmlStr: 'New Hampshire'}, {value: 'NJ', htmlStr: 'New Jersey'}, {value: 'NM', htmlStr: 'New Mexico'}, {value: 'NY', htmlStr: 'New York'}, {value: 'ND', htmlStr: 'North Carolina'}, {value: 'NC', htmlStr: 'North Dakota'}, {value: 'OH', htmlStr: 'Ohio'}, {value: 'OK', htmlStr: 'Oklahoma'}, {value: 'OR', htmlStr: 'Oregon'}, {value: 'PA', htmlStr: 'Pennsylvania'}, {value: 'RI', htmlStr: 'Rhode Island'}, {value: 'SC', htmlStr: 'South Carolina'}, {value: 'SD', htmlStr: 'South Dakota'}, {value: 'TN', htmlStr: 'Tennessee'}, {value: 'TX', htmlStr: 'Texas'}, {value: 'UT', htmlStr: 'Utah'}, {value: 'VT', htmlStr: 'Vermont'}, {value: 'VA', htmlStr: 'Virginia'}, {value: 'WA', htmlStr: 'Washington'}, {value: 'DC', htmlStr: 'Washington DC'}, {value: 'WV', htmlStr: 'West Virginia'}, {value: 'WI', htmlStr: 'Wisconsin'}, {value: 'WY', htmlStr: 'Wyoming'}]
                        }
                    }},
                    {city: {
                        element: {
                            tagName: 'select',
                            attributes: {id: 'city'},
                            addClassName: 'select_reset_form',
                            optionVals: [{value: '', htmlStr: 'Choose'}]
                        }
                    }},
                    {installers: {
                        element: {
                            tagName: 'select',
                            attributes: {id: 'installers'},
                            addClassName: 'select_reset_form',
                            optionVals: [{value: '', htmlStr: 'Choose'}]
                        }
                    }},
            ],
            viewSearch: [
                    {view_state: {
                        element: {
                            tagName: 'select',
                            attributes: {id: 'view_state'},
                            placeholder: 'State',
                            optionVals: [{value: '', htmlStr: 'Choose'}, {value: 'AL', htmlStr: 'Alabama'}, {value: 'AK', htmlStr: 'Alaska'}, {value: 'AZ', htmlStr: 'Arizona'}, {value: 'AR', htmlStr: 'Arkansas'}, {value: 'CA', htmlStr: 'California'}, {value: 'CO', htmlStr: 'Colorado'}, {value: 'CT', htmlStr: 'Connecticut'}, {value: 'DE', htmlStr: 'Delaware'}, {value: 'FL', htmlStr: 'Florida'}, {value: 'GA', htmlStr: 'Georgia'}, {value: 'HI', htmlStr: 'Hawaii'}, {value: 'ID', htmlStr: 'Idaho'}, {value: 'IL', htmlStr: 'Illinois'}, {value: 'IN', htmlStr: 'Indiana'}, {value: 'IA', htmlStr: 'Iowa'}, {value: 'KS', htmlStr: 'Kansas'}, {value: 'KY', htmlStr: 'Kentucky'}, {value: 'LA', htmlStr: 'Louisiana'}, {value: 'ME', htmlStr: 'Maine'}, {value: 'MD', htmlStr: 'Maryland'}, {value: 'MA', htmlStr: 'Massachusetts'}, {value: 'MI', htmlStr: 'Michigan'}, {value: 'MN', htmlStr: 'Minnesota'}, {value: 'MS', htmlStr: 'Mississippi'}, {value: 'MO', htmlStr: 'Missouri'}, {value: 'MT', htmlStr: 'Montana'}, {value: 'NE', htmlStr: 'Nebraska'}, {value: 'NV', htmlStr: 'Nevada'}, {value: 'NH', htmlStr: 'New Hampshire'}, {value: 'NJ', htmlStr: 'New Jersey'}, {value: 'NM', htmlStr: 'New Mexico'}, {value: 'NY', htmlStr: 'New York'}, {value: 'ND', htmlStr: 'North Carolina'}, {value: 'NC', htmlStr: 'North Dakota'}, {value: 'OH', htmlStr: 'Ohio'}, {value: 'OK', htmlStr: 'Oklahoma'}, {value: 'OR', htmlStr: 'Oregon'}, {value: 'PA', htmlStr: 'Pennsylvania'}, {value: 'RI', htmlStr: 'Rhode Island'}, {value: 'SC', htmlStr: 'South Carolina'}, {value: 'SD', htmlStr: 'South Dakota'}, {value: 'TN', htmlStr: 'Tennessee'}, {value: 'TX', htmlStr: 'Texas'}, {value: 'UT', htmlStr: 'Utah'}, {value: 'VT', htmlStr: 'Vermont'}, {value: 'VA', htmlStr: 'Virginia'}, {value: 'WA', htmlStr: 'Washington'}, {value: 'DC', htmlStr: 'Washington DC'}, {value: 'WV', htmlStr: 'West Virginia'}, {value: 'WI', htmlStr: 'Wisconsin'}, {value: 'WY', htmlStr: 'Wyoming'}]
                        }
                    }},
                    {view_city: {
                        element: {
                            tagName: 'select',
                            attributes: {id: 'view_city'},
                            placeholder: 'City',
                            optionVals: [{value: '', htmlStr: 'Choose'}]
                        }
                    }},
                    {view_installer: {
                        element: {
                            tagName: 'select',
                            attributes: {id: 'view_installer'},
                            placeholder: 'Installer',
                            optionVals: [{value: '', htmlStr: 'Choose'}]
                        }
                    }},
            ]
        }
}, {setSelects: true});

dP.page.ajaxURLs.addSearch = '../../../intranet/php/ajax/sections/business-listings/internal-wi-listings.php';



/*var internalWIListingsPage = new DataPage('internalWIListings', 'internal-wi-listings', 'business-listings/internal-wi-listings');

dP.page.children = new Map([['internalWIListingsPage', internalWIListingsPage]]);
internalWIListingsPage.page.parents = new Map([['dP', dP]]);*/


/*internalWIListingsPage.page.objects = dP.page.objects;
internalWIListingsPage.page.dP = dP.page.dP;
internalWIListingsPage.page.containers = dP.page.containers;

dP.page.children.set('internalWIListings', internalWIListingsPage);*/

/*internalWIListingsPage.setup(
{
    partOf: ['window-installers'],
    isChildPage: true,
    needsParentParts: ['objects']
});

var pages = new Map([['internalWIListingsPage', internalWIListingsPage]]);
*/






/*windowInstallers.forms.functions.customizeRows = function(options)
{
    var proc = options.proc;
    var rows = options.rows;

    //reload the installers list to update any changes made to business name
    if (proc === 'delete' || proc === 'add' || proc == 'update') {
        var emptyContainer = (proc === 'delete' || proc === 'add') ? true : false;

        var nextSelectValEl = getByID(windowInstallers.containers.fetch).find('form [name="company_name"]');

        getSelectViewPagesList({page: windowInstallers,
                                btn: $('#view_city'),
                                nextSelect: 'view_installer',
                                options: {fetchFilter: 'InstallersList',
                                          nextSelectValEl: nextSelectValEl,
                                          params: {'state': 'view_state'},
                                          currSelectParamName: 'city',
                                          emptyContainer: emptyContainer}
                                });
    }

    var formID = Object.keys(rows)[0];
    var isAddForm = formID.indexOf('add_');
    if (isAddForm === -1) {

        windowInstallers.functions.createWebLinks('web_link');

        var form = getByID(formID);
        var citiesArr = form.find('[name="service_cities"]').val();
            citiesArr = citiesArr.split(',');

        var serviceZipsEl =  form.find('[name="service_zip_codes"]');

        windowInstallers.objects.zipLocations.createCitiesPopover(serviceZipsEl, citiesArr);
    }
};*/

/*logDebug.log('windowInstallers obj - ');
logDebug.log(windowInstallers);*/
